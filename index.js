
import { NativeModules } from 'react-native';

const { RNReactNativeAmapNavi } = NativeModules;
import AMapNaviView1 from './js/AMapNaviView';

export const AmapNaviType = {
    DRIVER: 0,
    WALK: 1,
    RIDE: 2
}

export const AmapNaviMode = {
    GPS: 1,
    EMULATOR: 2,
    CRUISE: 3
}

export const AmapMapType = {
    //普通地图
    MAP_TYPE_NORMAL: 1,
    //卫星地图
    MAP_TYPE_SATELLITE: 2,
    //黑夜地图
    MAP_TYPE_NIGHT: 3,
    //导航模式
    MAP_TYPE_NAVI: 4,
    //公交模式
    MAP_TYPE_BUS: 5,
}

export const AMapNaviViewShowMode = {
    //普通状态
    SHOWMODE_DEFAULT: 3,
    //全览状态
    SHOWMODE_DISPLAYOVERVIEW	: 2,
    //锁车状态
    SHOWMODE_LOCKCAR	: 1,
}

export const AMapNaviDrivingStrategy = {
    AMapNaviDrivingStrategySingleDefault: 0,                               ///< 0 单路径: 默认,速度优先(常规最快)
    AMapNaviDrivingStrategySingleAvoidCost: 1,                             ///< 1 单路径: 避免收费
    AMapNaviDrivingStrategySinglePrioritiseDistance: 2,                    ///< 2 单路径: 距离优先
    AMapNaviDrivingStrategySingleAvoidExpressway: 3,                       ///< 3 单路径: 不走快速路
    AMapNaviDrivingStrategySingleAvoidCongestion: 4,                       ///< 4 单路径: 躲避拥堵
    AMapNaviDrivingStrategySinglePrioritiseSpeedCostDistance: 5,           ///< 5 单路径: 速度优先 & 费用优先 & 距离优先
    AMapNaviDrivingStrategySingleAvoidHighway: 6,                          ///< 6 单路径: 不走高速
    AMapNaviDrivingStrategySingleAvoidHighwayAndCost: 7,                   ///< 7 单路径: 不走高速 & 避免收费
    AMapNaviDrivingStrategySingleAvoidCostAndCongestion: 8,                ///< 8 单路径: 避免收费 & 躲避拥堵
    AMapNaviDrivingStrategySingleAvoidHighwayAndCostAndCongestion: 9,      ///< 9 单路径: 不走高速 & 避免收费 & 躲避拥堵

    AMapNaviDrivingStrategyMultipleDefault: 10,                            ///< 10 多路径: 默认,速度优先(常规最快)
    AMapNaviDrivingStrategyMultipleShortestTimeDistance: 11,               ///< 11 多路径: 时间最短 & 距离最短
    AMapNaviDrivingStrategyMultipleAvoidCongestion: 12,                    ///< 12 多路径: 躲避拥堵
    AMapNaviDrivingStrategyMultipleAvoidHighway: 13,                       ///< 13 多路径: 不走高速
    AMapNaviDrivingStrategyMultipleAvoidCost: 14,                          ///< 14 多路径: 避免收费
    AMapNaviDrivingStrategyMultipleAvoidHighwayAndCongestion: 15,          ///< 15 多路径: 不走高速 & 躲避拥堵
    AMapNaviDrivingStrategyMultipleAvoidHighwayAndCost: 16,                ///< 16 多路径: 不走高速 & 避免收费
    AMapNaviDrivingStrategyMultipleAvoidCostAndCongestion: 17,             ///< 17 多路径: 避免收费 & 躲避拥堵
    AMapNaviDrivingStrategyMultipleAvoidHighwayAndCostAndCongestion: 18,   ///< 18 多路径: 不走高速 & 避免收费 & 躲避拥堵
    AMapNaviDrivingStrategyMultiplePrioritiseHighway: 19,                  ///< 19 多路径: 高速优先
    AMapNaviDrivingStrategyMultiplePrioritiseHighwayAvoidCongestion: 20,   ///< 20 多路径: 高速优先 & 躲避拥堵
}

export const AMapNaviRingType = {
    //无
    RING_NULL: 0,
    //偏航重算的提示音
    RING_REROUTE: 1,
    //即将到达转向路口时的提示音
    RING_TURN: 100,
    //导航状态下通过测速电子眼的提示音
    RING_CAMERA: 101,
    //巡航状态下通过电子眼（所有类型）的提示音
    RING_EDOG: 102,
}

export const AMapNaviView = AMapNaviView1;

export default {
    showRouteActivity (points,navType) {
        return RNReactNativeAmapNavi.showRouteActivity(points,navType);
    },
    calculateDriveRoute (points,navType) {
        return RNReactNativeAmapNavi.calculateDriveRoute(points,navType);
    },
    stopNavi () {
        return RNReactNativeAmapNavi.stopNavi();
    },
    destoryNavi () {
        return RNReactNativeAmapNavi.destoryNavi();
    },
};
