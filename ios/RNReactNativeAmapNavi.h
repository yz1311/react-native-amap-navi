
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
#import <AMapNaviKit/AMapNaviKit.h>
@interface RNReactNativeAmapNavi : NSObject <RCTBridgeModule>
@property(nonatomic, strong)AMapNaviCompositeManager *compositeManager;
@end
  
