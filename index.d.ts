
declare module 'react-native-amap-navi' {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  export interface Poi {
    name: string,
    latitude: number,
    longitude: number,
    POIId?: string
  }

  //导航模式
  export enum AmapNaviMode {
    //巡航模式
    CRUISE = 3,
    //模拟导航
    EMULATOR = 2,
    //GPS导航
    GPS = 1,
    //未开始导航
    NONE = -1
  }

  export enum AmapNaviType {
    DRIVER,
    WALK,
    RIDE
  }

  //导航界面中的地图样式类型，默认值为0
  export enum AMapNaviModeType {
    //白天模式
    AMapNaviViewMapModeTypeDay = 0,
    //黑夜模式
    AMapNaviViewMapModeTypeNight = 1,
    //根据日出日落时间自动切换白天黑夜
    AMapNaviViewMapModeTypeDayNightAuto = 2,
    //自定义地图样式(当前不支持)
    AMapNaviViewMapModeTypeCustom = 3
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
    //语音播报开关(默认:开)
    speechEnabled?: boolean,
    overview?: boolean,
    //导航模式，默认是GPS导航，该值改变不会立即触发重新导航，只会下次导航后才会生效
    naviMode: AmapNaviMode,
    //默认为白天模式
    modeType: AMapNaviModeType,
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
    onStartNavi?: (naviType:AmapNaviMode) => void,
    onGetNavigationText?: (text:String) => void,
    //路线规划成功回调
    onCalculateRouteSuccess?: (result:AMapCalcRouteResult) => void,
    //驾车路径导航到达某个途经点的回调函数。
    //wayID - 到达途径点的编号，标号从0开始，依次累加。
    onArrivedWayPoint?: (wayID:number) => void,
    onArriveDestination?: () => void,
    //用户手机GPS设置是否开启的回调函数。
    onGpsOpenStatus?: (enabled:boolean) => void,
    onLocationChange: (location:AMapNaviLocation) => void
  }

  export class AMapNaviView extends Component<IAMapNaviViewProps,any>{

  }

  export default class Navi{
    static showRouteActivity: (points:Poi[], navType:AmapNaviType) => Promise<void>;
    static stopNavi: () => void;
    static destoryNavi: () => void;
  }
}
