
import { NativeModules } from 'react-native';

const { RNReactNativeAmapNavi } = NativeModules;

export default {
    showRouteActivity (points,navType) {
        return RNReactNativeAmapNavi.showRouteActivity(points,navType);
    },
    AmapNaviType: {
        DRIVER: 0,
        WALK: 1,
        RIDE: 2
    }
};
