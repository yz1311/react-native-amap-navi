#import "RNReactNativeAmapNavi.h"
#import <AMapNaviKit/AMapNaviKit.h>
@implementation RNReactNativeAmapNavi

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showRouteActivity:(NSArray *)points
                  navType:(NSNumber * _Nonnull)navType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    if([points count] <1) {
        reject(@"-1",@"POI数量不能少于1",nil);
        return;
    }
    //导航组件配置类 since 5.2.0
    AMapNaviCompositeUserConfig *config = [[AMapNaviCompositeUserConfig alloc] init];
    if([points count] == 1) {
        NSDictionary* dict = [points objectAtIndex:0];
        NSString *endLatitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"latitude"]];
        NSString *endLongitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"longitude"]];
        CGFloat fEndLatitude = [endLatitude floatValue];
        CGFloat fEndLongitude = [endLongitude floatValue];
        [config setRoutePlanPOIType:AMapNaviRoutePlanPOITypeEnd location:[AMapNaviPoint locationWithLatitude:fEndLatitude longitude:fEndLongitude] name:[dict objectForKey:@"name"] POIId:[dict objectForKey:@"POIId"]];
    } else {
        for(NSInteger i = 0;i < [points count]; i++) {
            if(i == 0) {
                NSDictionary* dict = [points objectAtIndex:i];
                NSString *startLatitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"latitude"]];
                NSString *startLongitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"longitude"]];
                CGFloat fStartLatitude = [startLatitude floatValue];
                CGFloat fStartLongitude = [startLongitude floatValue];
                [config setRoutePlanPOIType:AMapNaviRoutePlanPOITypeStart location:[AMapNaviPoint locationWithLatitude:fStartLatitude longitude:fStartLongitude] name:[dict objectForKey:@"name"] POIId:[dict objectForKey:@"POIId"]];
            } else if(i == [points count] -1) {
                NSDictionary* dict = [points objectAtIndex:i];
                NSString *endLatitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"latitude"]];
                NSString *endLongitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"longitude"]];
                CGFloat fEndLatitude = [endLatitude floatValue];
                CGFloat fEndLongitude = [endLongitude floatValue];
                [config setRoutePlanPOIType:AMapNaviRoutePlanPOITypeEnd location:[AMapNaviPoint locationWithLatitude:fEndLatitude longitude:fEndLongitude] name:[dict objectForKey:@"name"] POIId:[dict objectForKey:@"POIId"]];
            } else {
                NSDictionary* dict = [points objectAtIndex:i];
                NSString *middleLatitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"latitude"]];
                NSString *middleLongitude = [NSString stringWithFormat:@"%@",[dict objectForKey:@"longitude"]];
                CGFloat fMiddleLatitude = [middleLatitude floatValue];
                CGFloat fMiddleLongitude = [middleLongitude floatValue];
                [config setRoutePlanPOIType:AMapNaviRoutePlanPOITypeWay location:[AMapNaviPoint locationWithLatitude:fMiddleLatitude longitude:fMiddleLongitude] name:[dict objectForKey:@"name"] POIId:[dict objectForKey:@"POIId"]];
            }
        }
    }

    //启动
    AMapNaviCompositeManager * _compositeManager = [[AMapNaviCompositeManager alloc] init];
    [_compositeManager presentRoutePlanViewControllerWithOptions:config];
    resolve(@"");
}

RCT_EXPORT_METHOD(stopNavi) {
    [[AMapNaviDriveManager sharedInstance] stopNavi];
}

RCT_EXPORT_METHOD(destoryNavi) {
    [AMapNaviDriveManager destroyInstance];
}
@end
  
