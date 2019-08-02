
import { NativeModules } from 'react-native';

const { RNReactNativeAmapNavi } = NativeModules;
import AMapNaviView1 from './js/AMapNaviView';

export const AmapNaviType = {
    DRIVER: 0,
    WALK: 1,
    RIDE: 2
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
