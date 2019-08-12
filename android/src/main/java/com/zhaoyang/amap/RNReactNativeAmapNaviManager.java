package com.zhaoyang.amap;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import com.amap.api.maps.AMap;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Poi;
import com.amap.api.navi.AMapNavi;
import com.amap.api.navi.AMapNaviListener;
import com.amap.api.navi.AMapNaviView;
import com.amap.api.navi.AMapNaviViewListener;
import com.amap.api.navi.AMapNaviViewOptions;
import com.amap.api.navi.enums.NaviType;
import com.amap.api.navi.model.AMapCalcRouteResult;
import com.amap.api.navi.model.AMapExitDirectionInfo;
import com.amap.api.navi.model.AMapLaneInfo;
import com.amap.api.navi.model.AMapModelCross;
import com.amap.api.navi.model.AMapNaviCameraInfo;
import com.amap.api.navi.model.AMapNaviCross;
import com.amap.api.navi.model.AMapNaviInfo;
import com.amap.api.navi.model.AMapNaviLocation;
import com.amap.api.navi.model.AMapNaviPath;
import com.amap.api.navi.model.AMapNaviRouteNotifyData;
import com.amap.api.navi.model.AMapNaviTrafficFacilityInfo;
import com.amap.api.navi.model.AMapServiceAreaInfo;
import com.amap.api.navi.model.AimLessModeCongestionInfo;
import com.amap.api.navi.model.AimLessModeStat;
import com.amap.api.navi.model.NaviInfo;
import com.amap.api.navi.model.NaviLatLng;
import com.amap.api.navi.view.OverviewButtonView;
import com.amap.api.navi.view.RouteOverLay;
import com.autonavi.tbt.TrafficFacilityInfo;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNReactNativeAmapNaviManager extends SimpleViewManager<ViewGroup> implements AMapNaviViewListener,AMapNaviListener,LifecycleEventListener{
    private ViewGroup mViewGroup = null;
    private AMapNaviView mAMapNaviView = null;
    private ThemedReactContext mReactContext;
    private AMapNavi mAMapNavi = null;
    List<NaviLatLng> pointList1 = null;
    List<NaviLatLng> pointList2 = null;
    List<NaviLatLng> pointList3 = null;
    @Nonnull
    @Override
    public String getName() {
        return "AMapNaviView";
    }


    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "topChange",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onChange")))
                .build();
    }

    @Nonnull
    @Override
    protected ViewGroup createViewInstance(@Nonnull ThemedReactContext reactContext) {
        mReactContext=reactContext;
        LayoutInflater inflater = reactContext.getCurrentActivity().getLayoutInflater();
        mViewGroup = (ViewGroup) inflater.inflate(R.layout.navi_view,null,false);
        mAMapNaviView = (AMapNaviView)mViewGroup.findViewById(R.id.navi_view);
        mAMapNaviView.onCreate(null);
        mAMapNaviView.setAMapNaviViewListener(this);
        mAMapNaviView.recoverLockMode();
        reactContext.addLifecycleEventListener(this);

        mAMapNavi = AMapNavi.getInstance(this.mReactContext.getCurrentActivity().getApplicationContext());
        mAMapNavi.setUseInnerVoice(true);
        mAMapNavi.addAMapNaviListener(this);
        return mViewGroup;
    }

    @ReactProp(name = "points")
    public void setPoints(ViewGroup viewGroup,ReadableArray points) {
        Log.i("test","1~"+points.size());
        //驾车路径规划计算,计算单条路径
        if(points==null || points.size() <1) {
            return;
        }
        Log.i("test","2");
        NaviLatLng start = null, end = null;
        List<NaviLatLng> wayList = new ArrayList();//途径点目前最多支持3个。
        //默认当前作为作为起点，该点作为结束位置
        for (int i=0;i<points.size();i++) {
            ReadableMap map = points.getMap(i);
            NaviLatLng poi = new NaviLatLng(map.getDouble("latitude"),map.getDouble("longitude"));
            if(i == 0)
            {
                if(points.size() == 1) {
                    end = poi;
                } else {
                    start = poi;
                }
            } else if(i == points.size()-1) {
                end = poi;
            } else {
                wayList.add(poi);
            }
        }
        List<NaviLatLng> startList = new ArrayList<NaviLatLng>();
        List<NaviLatLng> endList = new ArrayList<NaviLatLng>();
        if(start !=null) {
            startList.add(start);
        }
        if(end !=null) {
            endList.add(end);
        }
        int strategyFlag = 0;
        Log.i("test","3");
        pointList1 = startList;
        pointList2 = wayList;
        pointList3 = endList;
    }

    @ReactProp(name = "lockMode")
    public void lockMode(ViewGroup viewGroup,boolean lockMode) {
        Log.i("test","recoverLockMode"+lockMode);
        if(lockMode){
            mAMapNaviView.recoverLockMode();
        }
    }

    @ReactProp(name = "overview")
    public void overview(ViewGroup viewGroup,boolean overview) {
        Log.i("test","displayOverview"+overview);
        if(overview){
            mAMapNaviView.displayOverview();
        }
    }

    @ReactProp(name = "settingMenuEnabled")
    public void settingMenuEnabled(ViewGroup viewGroup,boolean settingMenuEnabled) {
        AMapNaviViewOptions options = mAMapNaviView.getViewOptions();
        options.setSettingMenuEnabled(settingMenuEnabled);
        mAMapNaviView.setViewOptions(options);
    }

    @ReactProp(name = "trafficBarEnabled")
    public void trafficBarEnabled(ViewGroup viewGroup,boolean trafficBarEnabled) {
        AMapNaviViewOptions options = mAMapNaviView.getViewOptions();
        options.setTrafficBarEnabled(trafficBarEnabled);
        mAMapNaviView.setViewOptions(options);
    }

    @ReactProp(name = "modeType")
    public void modeType(ViewGroup viewGroup,int modeType) {
        AMapNaviViewOptions options = mAMapNaviView.getViewOptions();
        options.setAutoNaviViewNightMode(false);
        switch (modeType)
        {
            //白天模式
            case 0:
                options.setNaviNight(false);
                break;
            //夜间模式
            case 1:
                options.setNaviNight(true);
                break;
            //自动切换
            case 2:
                options.setAutoNaviViewNightMode(true);
                break;
        }
        mAMapNaviView.setViewOptions(options);
    }

    @Override
    public void onNaviSetting() {
        sendEvent(mViewGroup,"onNaviSetting",null);
    }

    @Override
    public void onNaviCancel() {
        sendEvent(mViewGroup,"onNaviCancel",null);
    }

    @Override
    public boolean onNaviBackClick() {
        sendEvent(mViewGroup,"onNaviBackClick",null);
        return false;
    }

    @Override
    public void onNaviMapMode(int i) {
        WritableMap map = Arguments.createMap();
        map.putInt("mode",i);
        sendEvent(mViewGroup,"onNaviMapMode",map);
    }

    @Override
    public void onNaviTurnClick() {
        sendEvent(mViewGroup,"onNaviTurnClick",null);
    }

    @Override
    public void onNextRoadClick() {
        sendEvent(mViewGroup,"onNextRoadClick",null);
    }

    @Override
    public void onScanViewButtonClick() {
        sendEvent(mViewGroup,"onScanViewButtonClick",null);
    }

    @Override
    public void onLockMap(boolean b) {
        sendEvent(mViewGroup,"onLockMap",b);
    }

    @Override
    public void onNaviViewLoaded() {
        sendEvent(mViewGroup,"onNaviViewLoaded",null);
    }

    @Override
    public void onMapTypeChanged(int i) {
        sendEvent(mViewGroup,"onMapTypeChanged",i);
    }

    @Override
    public void onNaviViewShowMode(int i) {
        sendEvent(mViewGroup,"onNaviViewShowMode",i);
    }

    @Override
    public void onHostResume() {
        Log.i("test","onHostResume");
        if(mAMapNaviView !=null) {
            mAMapNaviView.onResume();
        }
    }

    @Override
    public void onHostPause() {
        Log.i("test","onHostPause");
        if(mAMapNaviView !=null) {
            mAMapNaviView.onPause();
        }
    }

    @Override
    public void onHostDestroy() {
        Log.i("test","onHostDestroy");
        if(mAMapNaviView !=null) {
            mAMapNaviView.onDestroy();
        }
        mAMapNavi.destroy();
    }

    /**
     *
     * @param eventName
     * @param params
     */
    private void sendEvent(ViewGroup surfaceView, String eventName, @Nullable Object params) {
        WritableMap event = Arguments.createMap();
        if(params == null) {

        } else if(params instanceof WritableMap) {
            event.putMap("params", (WritableMap) params);
        } else if(params instanceof Integer) {
            event.putInt("params", (int)params);
        } else if(params instanceof String) {
            event.putString("params", (String) params);
        } else if(params instanceof Boolean) {
            event.putBoolean("params", (Boolean) params);
        }
        event.putString("type", eventName);
        Log.i("test",eventName);
        mReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                surfaceView.getId(),
                "topChange",
                event);

    }

    @Override
    public void onInitNaviFailure() {
        sendEvent(mViewGroup,"onInitNaviFailure",null);
    }

    @Override
    public void onInitNaviSuccess() {
        int strategyFlag = 0;
        try {
            strategyFlag = mAMapNavi.strategyConvert(true, false, false, false, false);
        } catch (Exception e) {
            e.printStackTrace();
        }
        mAMapNavi.calculateDriveRoute(pointList1,pointList3,pointList2,strategyFlag);
        sendEvent(mViewGroup,"onInitNaviSuccess",null);
    }

    @Override
    public void onStartNavi(int i) {
        sendEvent(mViewGroup,"onStartNavi",i);
    }

    @Override
    public void onTrafficStatusUpdate() {
        sendEvent(mViewGroup,"onTrafficStatusUpdate",null);
    }

    @Override
    public void onLocationChange(AMapNaviLocation aMapNaviLocation) {

    }

    @Override
    public void onGetNavigationText(int i, String s) {
        //已过时
    }

    @Override
    public void onGetNavigationText(String s) {
        sendEvent(mViewGroup,"onGetNavigationText",s);
    }

    @Override
    public void onEndEmulatorNavi() {

    }

    @Override
    public void onArriveDestination() {
        sendEvent(mViewGroup,"onArriveDestination",null);
    }

    @Override
    public void onCalculateRouteFailure(int i) {
        //已过时
    }

    @Override
    public void onReCalculateRouteForYaw() {

    }

    @Override
    public void onReCalculateRouteForTrafficJam() {

    }

    @Override
    public void onArrivedWayPoint(int i) {
        sendEvent(mViewGroup,"onArrivedWayPoint",i);
    }

    @Override
    public void onGpsOpenStatus(boolean b) {
        sendEvent(mViewGroup,"onGpsOpenStatus",b);
    }

    private WritableMap getNaviInfoMap(NaviInfo naviInfo) {
        WritableMap map = Arguments.createMap();
        map.putInt("currentSpeed",naviInfo.getCurrentSpeed());
        map.putInt("curLink",naviInfo.getCurLink());
        map.putInt("curPoint",naviInfo.getCurPoint());
        map.putInt("curStep",naviInfo.getCurStep());
        map.putInt("curStepRetainDistance",naviInfo.getCurStepRetainDistance());
        map.putInt("curStepRetainTime",naviInfo.getCurStepRetainTime());
        map.putInt("iconType",naviInfo.getIconType());
        map.putInt("naviType",naviInfo.getNaviType());
        map.putInt("pathRetainDistance",naviInfo.getPathRetainDistance());
        map.putInt("pathRetainTime",naviInfo.getPathRetainTime());
        map.putString("currentRoadName",naviInfo.getCurrentRoadName());
        map.putString("nextRoadName",naviInfo.getNextRoadName());
        return map;
    }

    @Override
    public void onNaviInfoUpdate(NaviInfo naviInfo) {
        WritableMap map = this.getNaviInfoMap(naviInfo);
        if(naviInfo.getExitDirectionInfo()!=null){
            AMapExitDirectionInfo directionInfo = naviInfo.getExitDirectionInfo();
            WritableMap directionMap = Arguments.createMap();
            if(directionInfo.getDirectionInfo()!=null&&directionInfo.getDirectionInfo().length>0) {
                String[] directionInfos = directionInfo.getDirectionInfo();
                StringBuilder result = new StringBuilder();
                for(int i = 0;i<directionInfos.length;i++) {
                    result.append(directionInfos[i]+(i==directionInfos.length-1?",":","));
                }
                directionMap.putString("directionInfo",result.toString());
            }
            if(directionInfo.getExitNameInfo()!=null&&directionInfo.getExitNameInfo().length>0) {
                String[] exitNameInfos = directionInfo.getExitNameInfo();
                StringBuilder result = new StringBuilder();
                for(int i = 0;i<exitNameInfos.length;i++) {
                    result.append(exitNameInfos[i]+(i==exitNameInfos.length-1?",":","));
                }
                directionMap.putString("exitNameInfo",result.toString());
            }
            map.putMap("exitDirectionInfo",directionMap);
        }
        sendEvent(mViewGroup,"onNaviInfoUpdate",map);
    }

    @Override
    public void onNaviInfoUpdated(AMapNaviInfo aMapNaviInfo) {
        //已过时
    }

    @Override
    public void updateCameraInfo(AMapNaviCameraInfo[] aMapNaviCameraInfos) {

    }

    @Override
    public void updateIntervalCameraInfo(AMapNaviCameraInfo aMapNaviCameraInfo, AMapNaviCameraInfo aMapNaviCameraInfo1, int i) {

    }

    @Override
    public void onServiceAreaUpdate(AMapServiceAreaInfo[] aMapServiceAreaInfos) {

    }

    @Override
    public void showCross(AMapNaviCross aMapNaviCross) {

    }

    @Override
    public void hideCross() {

    }

    @Override
    public void showModeCross(AMapModelCross aMapModelCross) {

    }

    @Override
    public void hideModeCross() {

    }

    @Override
    public void showLaneInfo(AMapLaneInfo[] aMapLaneInfos, byte[] bytes, byte[] bytes1) {

    }

    @Override
    public void showLaneInfo(AMapLaneInfo aMapLaneInfo) {

    }

    @Override
    public void hideLaneInfo() {

    }

    //路径规划成功后开始导航
    @Override
    public void onCalculateRouteSuccess(int[] ints) {

    }

    @Override
    public void notifyParallelRoad(int i) {

    }

    @Override
    public void OnUpdateTrafficFacility(AMapNaviTrafficFacilityInfo aMapNaviTrafficFacilityInfo) {

    }

    @Override
    public void OnUpdateTrafficFacility(AMapNaviTrafficFacilityInfo[] aMapNaviTrafficFacilityInfos) {

    }

    @Override
    public void OnUpdateTrafficFacility(TrafficFacilityInfo trafficFacilityInfo) {

    }

    @Override
    public void updateAimlessModeStatistics(AimLessModeStat aimLessModeStat) {

    }

    @Override
    public void updateAimlessModeCongestionInfo(AimLessModeCongestionInfo aimLessModeCongestionInfo) {

    }

    @Override
    public void onPlayRing(int i) {

    }

    @Override
    public void onCalculateRouteSuccess(AMapCalcRouteResult aMapCalcRouteResult) {
//        AMap aMap = mAMapNaviView.getMap();
//        int[] routIds = aMapCalcRouteResult.getRouteid();
//        int routeId=routIds[0];
//        AMapNaviPath aMapNaviPath=mAMapNavi.getNaviPaths().get(routeId);
//        //然后就可以创建RouteOverLay了
//        RouteOverLay routeOverLay = new RouteOverLay(aMap, aMapNaviPath, this.mReactContext);
//        //添加到AMapNaviView上。
//        routeOverLay.addToMap();
        mAMapNavi.startNavi(NaviType.EMULATOR);
        WritableMap map = Arguments.createMap();
        map.putInt("errorCode",aMapCalcRouteResult.getErrorCode());
        map.putInt("calcRouteType",aMapCalcRouteResult.getCalcRouteType());
        map.putString("errorDetail",aMapCalcRouteResult.getErrorDetail());
        sendEvent(mViewGroup,"onCalculateRouteSuccess",map);
    }

    @Override
    public void onCalculateRouteFailure(AMapCalcRouteResult aMapCalcRouteResult) {
        WritableMap map = Arguments.createMap();
        map.putInt("errorCode",aMapCalcRouteResult.getErrorCode());
        map.putInt("calcRouteType",aMapCalcRouteResult.getCalcRouteType());
        map.putString("errorDetail",aMapCalcRouteResult.getErrorDetail());
        sendEvent(mViewGroup,"onCalculateRouteFailure",map);
    }

    @Override
    public void onNaviRouteNotify(AMapNaviRouteNotifyData aMapNaviRouteNotifyData) {

    }
}
