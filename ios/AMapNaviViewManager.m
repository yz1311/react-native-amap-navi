//
//  AMapNaviViewManager.m
//  RNReactNativeAmapNavi
//
//  Created by Zhao Yang on 2019/8/7.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AMapNaviKit/AMapNaviKit.h>
#import <React/RCTViewManager.h>
#import "RNTAMapDriveView.m"
#import "SpeechSynthesizer.h"


@interface AMapNaviViewManager : RCTViewManager<AMapNaviDriveManagerDelegate,AMapNaviDriveDataRepresentable, AMapNaviDriveViewDelegate>
{
    
}
@property (nonatomic, retain) RNTAMapDriveView* driveView;
@property (nonatomic, strong) AMapNaviPoint *startPoint;
@property (nonatomic, strong) AMapNaviPoint *endPoint;
@property (nonatomic, strong) NSMutableArray<AMapNaviPoint *> *wayPoints;
@property (nonatomic) BOOL speechEnabled;
@property (nonatomic) NSInteger *navMode;
@property (nonatomic) BOOL noData;

@end

@implementation AMapNaviViewManager

RCT_EXPORT_MODULE(AMapNaviView)

- (UIView *)view
{
    self.driveView =  [RNTAMapDriveView new];
    self.driveView.delegate = self;
    [self.driveView setShowMode:AMapNaviDriveViewShowModeOverview];
    [[AMapNaviDriveManager sharedInstance] setDelegate:self];
    //设置后才会显示导航线路
    [[AMapNaviDriveManager sharedInstance] addDataRepresentative:self.driveView];
    //将当前VC添加为导航数据的Representative，使其可以接收到导航诱导数据
    //设置后才有数据回调
    [[AMapNaviDriveManager sharedInstance] addDataRepresentative:self];
    [[AMapNaviDriveManager sharedInstance] setAllowsBackgroundLocationUpdates:YES];
    [[AMapNaviDriveManager sharedInstance] setPausesLocationUpdatesAutomatically:NO];
    return self.driveView;
}

RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(calculateRoute:(nonnull NSNumber *)reactTag
                  points:(nonnull NSArray *) points
                  strategy:(NSInteger) strategy
                  ) {
    if(strategy == 0)
    {
        strategy = AMapNaviDrivingStrategySingleDefault;
    }
    if(points != nil && [points count] >= 2) {
        self.wayPoints = [[NSMutableArray alloc] init];
        for (NSInteger i = 0; i < [points count]; i++) {
            NSDictionary* dict = [points objectAtIndex:i];
            CGFloat latitude = [[dict objectForKey:@"latitude"] floatValue];
            CGFloat longitude = [[dict objectForKey:@"longitude"] floatValue];
            if(i == 0) {
                self.startPoint = [AMapNaviPoint locationWithLatitude:latitude longitude:longitude];
            } else if(i == [points count]-1) {
                self.endPoint = [AMapNaviPoint locationWithLatitude:latitude longitude:longitude];
            } else {
                [self.wayPoints addObject:[AMapNaviPoint locationWithLatitude:latitude longitude:longitude]];
            }
        }
    }
    [[AMapNaviDriveManager sharedInstance] calculateDriveRouteWithStartPoints:@[self.startPoint]
                                                                    endPoints:@[self.endPoint]
                                                                    wayPoints:self.wayPoints
                                                              drivingStrategy:strategy];
}

RCT_EXPORT_METHOD(startNavi:(nonnull NSNumber *)reactTag
                  naviMode:(NSInteger) naviMode
                  ) {
    //需要放在主线程中执行
    switch (naviMode) {
        case 1:
            dispatch_async(dispatch_get_main_queue(), ^{
                [[AMapNaviDriveManager sharedInstance] startGPSNavi];
            });
            break;
        case 2:
            dispatch_async(dispatch_get_main_queue(), ^{
                // 在这里执行长时间的操作 ...
                // 你可以在任何线程/队列中执行回调函数
                [[AMapNaviDriveManager sharedInstance] startEmulatorNavi];
            });
            break;
        default:
            break;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(noData,BOOL,AMapNaviDriveView)
{
    self.noData = [RCTConvert BOOL:json];
}

RCT_CUSTOM_VIEW_PROPERTY(speechEnabled,BOOL,AMapNaviDriveView)
{
    self.speechEnabled = [RCTConvert BOOL:json];
    if([[SpeechSynthesizer sharedSpeechSynthesizer] isSpeaking])
    {
        //停止播报
        [[SpeechSynthesizer sharedSpeechSynthesizer] stopSpeak];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(points,NSArray,AMapNaviDriveView)
{
    NSArray* points = [RCTConvert NSArray:json];
    if(points == nil || [points count] < 2) {
        NSLog(@"points点的数量不能小于2");
        return;
    }
    self.wayPoints = [[NSMutableArray alloc] init];
    for (NSInteger i = 0; i < [points count]; i++) {
        NSDictionary* dict = [points objectAtIndex:i];
        CGFloat latitude = [[dict objectForKey:@"latitude"] floatValue];
        CGFloat longitude = [[dict objectForKey:@"longitude"] floatValue];
        if(i == 0) {
            self.startPoint = [AMapNaviPoint locationWithLatitude:latitude longitude:longitude];
        } else if(i == [points count]-1) {
            self.endPoint = [AMapNaviPoint locationWithLatitude:latitude longitude:longitude];
        } else {
            [self.wayPoints addObject:[AMapNaviPoint locationWithLatitude:latitude longitude:longitude]];
        }
    }
}

RCT_CUSTOM_VIEW_PROPERTY(modeType, NSInteger, AMapNaviDriveView)
{
    switch ([RCTConvert NSInteger:json]) {
        //白天模式
        case 0:
            [self.driveView setAutoSwitchDayNightType:false];
            self.driveView.showStandardNightType = false;
            break;
        //夜间模式
        case 1:
            [self.driveView setAutoSwitchDayNightType:false];
            self.driveView.showStandardNightType = true;
            break;
        //自动切换
        case 2:
            [self.driveView setAutoSwitchDayNightType:true];
            break;
        default:
            break;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(autoChangeZoom, BOOL, AMapNaviDriveView)
{
    [self.driveView setAutoZoomMapLevel:[RCTConvert BOOL:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(autoLockCar, BOOL, AMapNaviDriveView)
{
    [self.driveView setAutoSwitchShowModeToCarPositionLocked:[RCTConvert BOOL:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(lockMode, BOOL, AMapNaviDriveView)
{
    if([RCTConvert BOOL:json])
    {
        [self.driveView setShowMode:AMapNaviDriveViewShowModeCarPositionLocked];
    }
    else
    {
        [self.driveView setShowMode:AMapNaviDriveViewShowModeNormal];
    }
}

#pragma mark - AMapNaviDriveDataRepresentable

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateNaviMode:(AMapNaviMode)naviMode
{
    NSLog(@"updateNaviMode:%ld", (long)naviMode);
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateNaviRouteID:(NSInteger)naviRouteID
{
    NSLog(@"updateNaviRouteID:%ld", (long)naviRouteID);
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateNaviRoute:(nullable AMapNaviRoute *)naviRoute
{
    NSLog(@"updateNaviRoute");
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateNaviInfo:(nullable AMapNaviInfo *)naviInfo
{
    if(naviInfo == nil)
    {
        [self sendEvent:self.driveView params:@{@"type":@"onNaviInfoUpdate",@"params":@{
                                                        
                                                        }}];
    }
    else
    {
        [self sendEvent:self.driveView params:@{@"type":@"onNaviInfoUpdate",@"params":@{
                                                        @"curLink":@(naviInfo.currentLinkIndex),
                                                        @"curPoint":@(naviInfo.currentPointIndex),
                                                        @"curStep":@(naviInfo.currentSegmentIndex),
                                                        @"curStepRetainDistance":@(naviInfo.segmentRemainDistance),
                                                        @"curStepRetainTime":@(naviInfo.segmentRemainTime),
                                                        @"iconType":@(naviInfo.iconType),
                                                        @"currentRoadName":naviInfo.currentRoadName,
                                                        @"nextRoadName":naviInfo.nextRoadName,
                                                        @"pathRetainDistance":@(naviInfo.routeRemainDistance),
                                                        @"pathRetainTime":@(naviInfo.routeRemainTime)
                                                        }}];
    }
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateNaviLocation:(nullable AMapNaviLocation *)naviLocation
{
    NSLog(@"updateNaviLocation");
    [self sendEvent:self.driveView params:@{@"type":@"onLocationChange",@"params":@{
                                                    @"accuracy":@(naviLocation.accuracy),
                                                    @"altitude":@(naviLocation.altitude),
                                                    @"bearing":@(naviLocation.heading),
                                                    @"speed":@(naviLocation.speed),
                                                    @"time":[NSNumber numberWithDouble:[naviLocation.timestamp timeIntervalSinceReferenceDate]],
                                                    @"latitude":@(naviLocation.coordinate.latitude),
                                                    @"longitude":@(naviLocation.coordinate.longitude),
                                                    //@"curStepIndex":@(naviLocation.currentSegmentIndex),
//                                                    @"curLinkIndex":@(naviLocation.currentLinkIndex),
//                                                    @"currentPointIndex":@(naviLocation.currentPointIndex)
                                                    }}];
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager showCrossImage:(UIImage *)crossImage
{
    NSLog(@"showCrossImage");
    NSString* imgData;
    if(!self.noData)
    {
        NSData *data = UIImageJPEGRepresentation(crossImage, 1.0f);
        imgData = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    }
    [self sendEvent:self.driveView params:@{@"type":@"showCross",@"params":imgData}];
}

- (void)driveManagerHideCrossImage:(AMapNaviDriveManager *)driveManager
{
    NSLog(@"hideCrossImage");
    [self sendEvent:self.driveView params:@{@"type":@"hideCross",@"params":@{}}];
    
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager showLaneBackInfo:(NSString *)laneBackInfo laneSelectInfo:(NSString *)laneSelectInfo
{
    NSLog(@"showLaneInfo");
    NSString* imgData;
    if(!self.noData)
    {
        NSData *data = UIImageJPEGRepresentation(crossImage, 1.0f);
        imgData = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    }
    laneSelectInfo.
    [self sendEvent:self.driveView params:@{@"type":@"showLaneBackInfo",@"params":@{
                                                    
                                                    }}];
}

- (void)driveManagerHideLaneInfo:(AMapNaviDriveManager *)driveManager
{
    NSLog(@"hideLaneInfo");
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateTrafficStatus:(nullable NSArray<AMapNaviTrafficStatus *> *)trafficStatus
{
    NSLog(@"updateTrafficStatus");
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateCameraInfos:(nullable NSArray<AMapNaviCameraInfo *> *)cameraInfos
{
    NSLog(@"updateCameraInfos");
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager updateServiceAreaInfos:(nullable NSArray<AMapNaviServiceAreaInfo *> *)serviceAreaInfos
{
    NSLog(@"updateServiceAreaInfos");
}

#pragma mark - AMapNaviDriveManager Delegate

- (void)driveManager:(AMapNaviDriveManager *)driveManager error:(NSError *)error
{
    NSLog(@"error:{%ld - %@}", (long)error.code, error.localizedDescription);
}

- (void)driveManagerOnCalculateRouteSuccess:(AMapNaviDriveManager *)driveManager
{
   
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager onCalculateRouteSuccessWithType:(AMapNaviRoutePlanType)type
{
     NSLog(@"onCalculateRouteSuccess");
    [self sendEvent:self.driveView params:@{@"type":@"onCalculateRouteSuccess",@"params":@{
                                                    @"calcRouteType":@(type)
                                                    }}];
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager onCalculateRouteFailure:(NSError *)error
{
    NSLog(@"onCalculateRouteFailure:{%ld - %@}", (long)error.code, error.localizedDescription);
    [self sendEvent:self.driveView params:@{@"type":@"onCalculateRouteFailure",@"params":@{
                                                    @"errorCode":@(error.code),
                                                    @"errorDetail":error.domain
                                                    }}];
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager didStartNavi:(AMapNaviMode)naviMode
{
    NSLog(@"didStartNavi");
    [self sendEvent:self.driveView params:@{@"type":@"onStartNavi",@"params":@{}}];
}

- (void)driveManagerNeedRecalculateRouteForYaw:(AMapNaviDriveManager *)driveManager
{
    NSLog(@"needRecalculateRouteForYaw");
}

- (void)driveManagerNeedRecalculateRouteForTrafficJam:(AMapNaviDriveManager *)driveManager
{
    NSLog(@"needRecalculateRouteForTrafficJam");
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager onArrivedWayPoint:(int)wayPointIndex
{
    NSLog(@"onArrivedWayPoint:%d", wayPointIndex);
    [self sendEvent:self.driveView params:@{@"type":@"onArrivedWayPoint",@"params":@(wayPointIndex)}];
}

- (BOOL)driveManagerIsNaviSoundPlaying:(AMapNaviDriveManager *)driveManager
{
    if(self.speechEnabled)
    {
        return [[SpeechSynthesizer sharedSpeechSynthesizer] isSpeaking];
    }
    else
    {
        return NO;
    }
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager playNaviSoundString:(NSString *)soundString soundStringType:(AMapNaviSoundType)soundStringType
{
    NSLog(@"playNaviSoundString:{%ld:%@}", (long)soundStringType, soundString);
    if(self.speechEnabled)
    {
        [[SpeechSynthesizer sharedSpeechSynthesizer] speakString:soundString];
    }
}

- (void)driveManagerDidEndEmulatorNavi:(AMapNaviDriveManager *)driveManager
{
    NSLog(@"didEndEmulatorNavi");
    [self sendEvent:self.driveView params:@{@"type":@"onEndEmulatorNavi",@"params":@{}}];
}

- (void)driveManagerOnArrivedDestination:(AMapNaviDriveManager *)driveManager
{
    NSLog(@"onArrivedDestination");
    [self sendEvent:self.driveView params:@{@"type":@"onArriveDestination",@"params":@{}}];
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager onNaviPlayRing:(AMapNaviRingType)ringType
{
    [self sendEvent:self.driveView params:@{@"type":@"onPlayRing",@"params":@(ringType)}];
}

- (void)driveManager:(AMapNaviDriveManager *)driveManager postRouteNotification:(AMapNaviRouteNotifyData *)notifyData
{
    [self sendEvent:self.driveView params:@{@"type":@"onNaviRouteNotify",@"params":@{
                                                    @"distance":@(notifyData.distance),
                                                    @"latitude":@(notifyData.coordinate!=nil?notifyData.coordinate.latitude:0),
                                                    @"longitude":@(notifyData.coordinate!=nil?notifyData.coordinate.longitude:0),
                                                    @"notifyType":@(notifyData.type),
                                                    @"reason":notifyData.reason,
                                                    @"roadName":notifyData.roadName,
                                                    @"subTitle":notifyData.subTitle,
                                                    @"isSuccess":@(notifyData.success),
                                                    }}];
}

#pragma mark - AMapNaviDriveViewDelegate

- (void)driveViewCloseButtonClicked:(AMapNaviDriveView *)driveView
{
    
}

- (void)driveViewMoreButtonClicked:(AMapNaviDriveView *)driveView
{
    
}

- (void)driveViewTrunIndicatorViewTapped:(AMapNaviDriveView *)driveView
{
    NSLog(@"TrunIndicatorViewTapped");
}

- (void)driveView:(AMapNaviDriveView *)driveView didChangeShowMode:(AMapNaviDriveViewShowMode)showMode
{
    NSLog(@"didChangeShowMode:%ld", (long)showMode);
    [self sendEvent:self.driveView params:@{@"type":@"onLockMap",@"params":@(showMode==AMapNaviDriveViewShowModeCarPositionLocked)}];
}

- (void)driveView:(AMapNaviDriveView *)driveView didChangeDayNightType:(BOOL)showStandardNightType {
    NSLog(@"didChangeDayNightType:%ld", (long)showStandardNightType);
}

-(void)sendEvent:(RNTAMapDriveView *) aMapView params:(NSObject *) params {
    if (!aMapView.onChange) {
        return;
    }
    aMapView.onChange(params);
}

@end

