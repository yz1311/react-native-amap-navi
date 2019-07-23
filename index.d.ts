declare module 'react-native-amap-navi' {
  export interface Poi {
    name: string,
    latitude: number,
    longitude: number,
    POIId?: string
  }
  
  export enum AmapNaviType {
    DRIVER,
    WALK,
    RIDE
  }
  
  export default class Navi{
    static showRouteActivity: (points:Poi[], navType:AmapNaviType) => Promise<void>;
  }
}
