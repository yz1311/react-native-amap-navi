
# react-native-amap-navi
高德地图导航库,react-native双平台,支持一键api调用和自定义view调用
## Getting started

`$ npm install react-native-amap-navi --save`

### Mostly automatic installation

`$ react-native link react-native-amap-navi`

### Manual installation


#### iOS(注意，请仔细观看)
由于前面pod集成，一直报头文件找不到，现在需要手动安装(如果有擅长ios的，请提下pull request)

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-amap-navi` and add `RNReactNativeAmapNavi.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeAmapNavi.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Open `target` ➜ `Capabilities` ➜ `Background Modes`,check `Location updates`
4. Run your project (`Cmd+R`)< 

另外，需要按照官网教程添加权限和依赖,下面是详细步骤

https://lbs.amap.com/api/ios-navi-sdk/guide/create-project/manual-configuration

##### 1.下载
`基础 SDK`: AMapFoundationKit.framework
`导航 SDK`: AMapNaviKit.framework
`3D 地图 SDK`: MAMapKit.framework

3个Framework已经依赖在库中，但是由于文件过大，https://pan.baidu.com/s/1S_ENanStzHKILL3HO9ZPEg ，提供网盘下载(官方下的是最新版，可能存在api不兼容的情况),下载完成解压将3个framework文件放在./node_modules/react-native-amap-navi/ios/下面

##### 2.引入资源文件

需要引入的资源文件包括：AMapNavi.bundle 和 AMap.bundle，其中：AMapNavi.bundle 位于 AMapNaviKit.framework 中，AMap.bundle 在 MAMapKit.framework 的 Resources文件夹下。

在 TARGETS->Build Phases->Copy Bundle Resources 中点击“+”，弹出添加列表后，点击 “Add Other…”，添加 AMapNaviKit.framework 的 AMapNavi.bundle 到工程中，如下图所示：
![](https://a.amap.com/lbs/static/img/ios_navi_bundle.png)
用同样的方法添加 AMap.bundle。

##### 3.引入资源文件
定位权限

由于导航依赖定位，因此需在项目的 `Info.plist` 添加 `NSLocationWhenInUseUsageDescription` 或 `NSLocationAlwaysUsageDescription` 字段，根据您的业务需求，任选其一即可。

其中：

> `NSLocationWhenInUseUsageDescription` 表示应用在前台的时候可以搜到更新的位置信息。
> `NSLocationAlwaysUsageDescription` 表示应用在前台和后台
（suspend 或 terminated）都可以获取到更新的位置数据。

![](https://a.amap.com/lbs/static/img/ios_location_sdk_permission.png)

ATS设置

![](https://a.amap.com/lbs/static/img/ios_location_sdk_ats.png)



#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeAmapNaviPackage;` to the imports at the top of the file
  - Add `new RNReactNativeAmapNaviPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-amap-navi'
  	project(':react-native-amap-navi').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-amap-navi/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-amap-navi')
  	```


注意:  
如果同时使用了react-native-amap3d库，需要将该库中的sdk排除掉,否则编译会报错
```
implementation (project(':react-native-amap3d')) {
        exclude group:'com.amap.api',module:'3dmap'
    }
```


## Usage

#### 1.api调用方式
高德导航sdk集成了一套默认的导航界面，包括路径规划和导航，无法定制UI，如无特殊需求，可以直接调用该api进行导航

具体介绍:

https://lbs.amap.com/api/android-navi-sdk/guide/navi-component/use-navi-component

```javascript
import AmapNavi, { AmapNaviType, AMapNaviView } from "react-native-amap-navi";

//points数组分下面两个情况:
//1.只有一个元素，表示终点，起点会默认为当前定位位置
//2.大于等于两个元素，头尾分别为起点和终点，中间的为经过的点，经过点最多3个

AmapNavi.showRouteActivity([{
                        name: '北京站',
                        latitude: 0.0,
                        longitude: 0.0
                      }],AmapNaviType.DRIVER);
```

#### 2.自定义view

如果需要在导航界面上面自定义RN组件，可以使用导出的组件,具体的属性，查看[index.d.ts](https://github.com/yz1311/react-native-amap-navi/blob/master/index.d.ts)


```javascript
import AmapNavi, { AmapNaviType, AMapNaviView, NaviInfo, AmapNaviMode, AMapNaviDrivingStrategy } from "react-native-amap-navi";

...
//points跟api调用不一样，必须最少传递2个元素，所以如果需要当前位置，需要自己手动获取
...

componentDidMount() {
    //延迟一段时间导航，防止出现组件未初始化
    setTimeout(()=>{
      //开始路径规划,默认速度优先,points最少两个元素(前后分别是起点和终点，中间的为途经点),否则不会有任何回调
      this.mapNaviView.calculateRoute(this.props.points||[],AMapNaviDrivingStrategy.AMapNaviDrivingStrategySingleDefault);
    },500);
  }

<AMapNaviView
          style={{flex:1}}
          ref={ref=>this.mapNaviView = ref}
          autoLockCar={true}
          onCalculateRouteSuccess={result=>{
            //路径规划成功后，开始导航
            this.mapNaviView.startNavi(AmapNaviMode.EMULATOR);
          }}
        />
```
  
![ios](https://github.com/yz1311/react-native-amap-navi/blob/master/screenshots/ios-1.png)

![android](https://github.com/yz1311/react-native-amap-navi/blob/master/screenshots/android-1.png)