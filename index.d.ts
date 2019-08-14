import { Component } from "react";
import { ViewStyle } from "react-native";

export interface Poi {
  name: string,
  latitude: number,
  longitude: number,
  POIId?: string
}

export declare enum AmapNaviMode {
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

export enum AMapNaviRingType {
  //无
  RING_NULL = 0,
  //偏航重算的提示音
  RING_REROUTE = 1,
  //即将到达转向路口时的提示音
  RING_TURN = 100,
  //导航状态下通过测速电子眼的提示音
  RING_CAMERA = 101,
  //巡航状态下通过电子眼（所有类型）的提示音
  RING_EDOG = 102,
}

export enum ReCalculateRouteType {
  //直接算路
  ROUTE_TYPE_COMMON,
  //偏航重算
  ROUTE_TYPE_YAW,
  //拥堵重算
  ROUTE_TYPE_TMC,
  //更改算路策略
  ROUTE_TYPE_CHANGE_STRATEGE,
  //平行路切换引起的重算
  ROUTE_TYPE_PARALLEL_ROAD,
  //道路限行引起的重算(车牌限行)
  ROUTE_TYPE_LIMIT_LINE = 6,
  //道路关闭引起的重算
  ROUTE_TYPE_DAMAGED_ROAD,
  //行程点改变引起的重算
  ROUTE_TYPE_CHANGE_JNYPNT = 9,
  //城市数据更新引起的重算
  ROUTE_TYPE_UPDATE_CITY_DATA,
  //限时禁行引起的重算
  ROUTE_TYPE_LIMIT_FOR_BID,
  //主动刷新引起的重算
  ROUTE_TYPE_MANUAL_REFRESH,
  //导航中请求多备选路线
  ROUTE_TYPE_MUTIROUTE_REQUEST = 14,
  //交警调度请求路线, ios only
  ROUTE_TYPE_DISPATCH = 16,
  //外部Push路线算路
  ROUTE_TYPE_PUSH_DATE = 200,

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
  onNaviInfoUpdate: (naviInfo: NaviInfo) => void,
  onLockMap: (isLockMap:boolean) => void,
  lockMode?: boolean,
  //If true, disables the base64 data field from being generated (greatly improves performance on large photos)
  noData?: boolean,
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
  //路线规划成功回调,包含路径规划类型
  onCalculateRouteSuccess?: (result:AMapCalcRouteResult) => void,
  onCalculateRouteFailure?: (result:AMapCalcRouteResult) => void,
  onPlayRing?: (result:AMapNaviRingType) => void,
  //显示路口放大图回调(实景图)
  showCross?:(imgData:string) => void;
  //关闭路口放大图回调(实景图)
  hideCross?:() => void;
  //驾车路径导航到达某个途经点的回调函数。
  //wayID - 到达途径点的编号，标号从0开始，依次累加。
  onArrivedWayPoint?: (wayID:number) => void,
  onArriveDestination?: () => void,
  //用户手机GPS设置是否开启的回调函数。
  onGpsOpenStatus?: (enabled:boolean) => void,
  onLocationChange: (location:AMapNaviLocation) => void
}

export class AMapNaviView extends Component<IAMapNaviViewProps,any>{
  calculateRoute: (points?:Array<Poi>, strategy?:AMapNaviDrivingStrategy)=>void;
  startNavi: (naviMode:AmapNaviMode)=>void;
}

export default class Navi{
  static showRouteActivity: (points:Poi[], navType:AmapNaviType) => Promise<void>;
  static stopNavi: () => void;
  static destoryNavi: () => void;
}
