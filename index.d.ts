
declare module 'react-native-amap-navi' {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  export interface Poi {
    name: string,
    latitude: number,
    longitude: number,
    POIId?: string
  }

  enum AmapNaviMode {
    GPS = 1,
    EMULATOR = 2,
    CRUISE = 3
  }

  export enum AmapNaviType {
    DRIVER,
    WALK,
    RIDE
  }

  export enum AmapMapType {
    //普通地图
    MAP_TYPE_NORMAL = 1,
    //卫星地图
    MAP_TYPE_SATELLITE = 2,
    //黑夜地图
    MAP_TYPE_NIGHT = 3,
    //导航模式
    MAP_TYPE_NAVI = 4,
    //公交模式
    MAP_TYPE_BUS = 5,
  }

  export enum AMapNaviViewShowMode {
    //普通状态
    SHOWMODE_DEFAULT = 3,
    //全览状态
    SHOWMODE_DISPLAYOVERVIEW	 = 2,
    //锁车状态
    SHOWMODE_LOCKCAR	 = 1,
  }

  export enum AMapNaviDrivingStrategy {
    AMapNaviDrivingStrategySingleDefault = 0,                               ///< 0 单路径: 默认,速度优先(常规最快)
    AMapNaviDrivingStrategySingleAvoidCost = 1,                             ///< 1 单路径: 避免收费
    AMapNaviDrivingStrategySinglePrioritiseDistance = 2,                    ///< 2 单路径: 距离优先
    AMapNaviDrivingStrategySingleAvoidExpressway = 3,                       ///< 3 单路径: 不走快速路
    AMapNaviDrivingStrategySingleAvoidCongestion = 4,                       ///< 4 单路径: 躲避拥堵
    AMapNaviDrivingStrategySinglePrioritiseSpeedCostDistance = 5,           ///< 5 单路径: 速度优先 & 费用优先 & 距离优先
    AMapNaviDrivingStrategySingleAvoidHighway = 6,                          ///< 6 单路径: 不走高速
    AMapNaviDrivingStrategySingleAvoidHighwayAndCost = 7,                   ///< 7 单路径: 不走高速 & 避免收费
    AMapNaviDrivingStrategySingleAvoidCostAndCongestion = 8,                ///< 8 单路径: 避免收费 & 躲避拥堵
    AMapNaviDrivingStrategySingleAvoidHighwayAndCostAndCongestion = 9,      ///< 9 单路径: 不走高速 & 避免收费 & 躲避拥堵

    AMapNaviDrivingStrategyMultipleDefault = 10,                            ///< 10 多路径: 默认,速度优先(常规最快)
    AMapNaviDrivingStrategyMultipleShortestTimeDistance = 11,               ///< 11 多路径: 时间最短 & 距离最短
    AMapNaviDrivingStrategyMultipleAvoidCongestion = 12,                    ///< 12 多路径: 躲避拥堵
    AMapNaviDrivingStrategyMultipleAvoidHighway = 13,                       ///< 13 多路径: 不走高速
    AMapNaviDrivingStrategyMultipleAvoidCost = 14,                          ///< 14 多路径: 避免收费
    AMapNaviDrivingStrategyMultipleAvoidHighwayAndCongestion = 15,          ///< 15 多路径: 不走高速 & 躲避拥堵
    AMapNaviDrivingStrategyMultipleAvoidHighwayAndCost = 16,                ///< 16 多路径: 不走高速 & 避免收费
    AMapNaviDrivingStrategyMultipleAvoidCostAndCongestion = 17,             ///< 17 多路径: 避免收费 & 躲避拥堵
    AMapNaviDrivingStrategyMultipleAvoidHighwayAndCostAndCongestion = 18,   ///< 18 多路径: 不走高速 & 避免收费 & 躲避拥堵
    AMapNaviDrivingStrategyMultiplePrioritiseHighway = 19,                  ///< 19 多路径: 高速优先
    AMapNaviDrivingStrategyMultiplePrioritiseHighwayAvoidCongestion = 20,   ///< 20 多路径: 高速优先 & 躲避拥堵
  }

  export interface NaviInfo {
    currentSpeed: number,
    curLink: number,
    curPoint: number,
    curStep: number,
    curStepRetainDistance: number,
    curStepRetainTime: number,
    iconType: number,
    naviType: number,
    pathRetainDistance: number,
    pathRetainTime: number,
    currentRoadName: string,
    nextRoadName: string,
    exitDirectionInfo: {
      directionInfo: string,
      exitNameInfo: string,
    }
  }

  interface AMapCalcRouteResult {
    errorCode: number,
    calcRouteType: AmapNaviType,
    errorDetail: string,
  }

  interface AMapNaviLocation {
    accuracy: number,
    altitude: number,
    bearing: number,
    speed: number,
    time: number,
    latitude: number,
    longitude: number,
    curStepIndex?: number,
    curLinkIndex?: number,
    curPointIndex?: number,
  }

  interface IAMapNaviViewProps extends ViewStyle{
    style?: any,
    points: Array<any>,
    onNaviInfoUpdate: (naviInfo: NaviInfo) => void,
    onLockMap: (isLockMap:boolean) => void,
    lockMode?: boolean,
    speechEnabled?: boolean,
    overview?: boolean,
    settingMenuEnabled?: boolean,
    trafficBarEnabled?: boolean,
    //锁车模式下是否为了预见下一导航动作自动缩放地图,默认为false
    autoChangeZoom?: boolean,
    //当显示模式为非锁车模式时，是否在6秒后自动设置为锁车模式，默认为false
    autoLockCar?: boolean,
    onInitNaviFailure?: () => void,
    onInitNaviSuccess?: () => void,
    onNaviSetting?: () => void,
    onNaviCancel?: () => void,
    onNaviBackClick?: () => void,
    onNaviTurnClick?: () => void,
    onNextRoadClick?: () => void,
    onScanViewButtonClick?: () => void,
    onNaviViewLoaded?: () => void,
    onTrafficStatusUpdate?: () => void,
    onNaviMapMode?: (naviType:AmapNaviType) => void,
    onMapTypeChanged?: (mapType:AmapMapType) => void,
    onNaviViewShowMode?: (shoMode:AMapNaviViewShowMode) => void,
    onStartNavi?: (naviType:AmapNaviType) => void,
    onGetNavigationText?: (text:String) => void,
    //路线规划成功回调
    onCalculateRouteSuccess?: (result:AMapCalcRouteResult) => void,
    onCalculateRouteFailure?: (result:AMapCalcRouteResult) => void,
    //驾车路径导航到达某个途经点的回调函数。
    //wayID - 到达途径点的编号，标号从0开始，依次累加。
    onArrivedWayPoint?: (wayID:number) => void,
    onArriveDestination?: () => void,
    //用户手机GPS设置是否开启的回调函数。
    onGpsOpenStatus?: (enabled:boolean) => void,
    onLocationChange: (location:AMapNaviLocation) => void
  }

  export class AMapNaviView extends Component<IAMapNaviViewProps,any>{
    calculateRoute: (points?:Array<Poi>, strategy?:AMapNaviDrivingStrategy)=>void,
    startNavi: (naviMode:AmapNaviMode)=>void
  }

  export default class Navi{
    static showRouteActivity: (points:Poi[], navType:AmapNaviType) => Promise<void>;
    static stopNavi: () => void;
    static destoryNavi: () => void;
  }
}
