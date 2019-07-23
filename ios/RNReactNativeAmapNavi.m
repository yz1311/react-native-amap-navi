#import "RNReactNativeAmapNavi.h"
//#import <AMapNaviKit/AMapNaviKit.h>
@implementation RNReactNativeAmapNavi

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

//RCT_EXPORT_METHOD(showRouteActivity:(NSString *)name:(NSString *)useros) {
//    //导航组件配置类 since 5.2.0
//    AMapNaviCompositeUserConfig *config = [[AMapNaviCompositeUserConfig alloc] init];
//    //传入终点坐标
//    [config setRoutePlanPOIType:AMapNaviRoutePlanPOITypeEnd location:[AMapNaviPoint locationWithLatitude:39.918058 longitude:116.397026] name:@"故宫" POIId:nil];
//    //启动
//    AMapNaviCompositeManager * _compositeManager = [[AMapNaviCompositeManager alloc] init];
//    [_compositeManager presentRoutePlanViewControllerWithOptions:config];
////    [self.compositeManager presentRoutePlanViewControllerWithOptions:config];
//}
@end
  
