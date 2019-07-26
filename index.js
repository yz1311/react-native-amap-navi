
import { NativeModules } from 'react-native';

const { RNReactNativeAmapNavi } = NativeModules;

export const AmapNaviType = {
    DRIVER: 0,
    WALK: 1,
    RIDE: 2
}

export default {
    showRouteActivity (points,navType) {
        return RNReactNativeAmapNavi.showRouteActivity(points,navType);
    },
};
