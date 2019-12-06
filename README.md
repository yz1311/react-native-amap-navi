
# react-native-amap-navi
[![npm version](http://img.shields.io/npm/v/react-native-amap-navi.svg?style=flat-square)](https://npmjs.org/package/react-native-amap-navi "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/react-native-amap-navi.svg?style=flat-square)](https://npmjs.org/package/react-native-amap-navi "View this project on npm")
高德地图导航库,react-native双平台,支持一键api调用和自定义view调用
## Getting started

`$ npm install react-native-amap-navi --save`

### Mostly automatic installation

`$ react-native link react-native-amap-navi`

### Manual installation


#### iOS
需要使用CocoaPods,在Podfile文件中加入(正常情况下，执行上面的link是会自动加入的)

```
pod 'react-native-amap-navi', path: '../node_modules/react-native-amap-navi'
```

然后运行:(由于依赖的库比较多，比较慢)

```
pod install
```

注意:如果同时安装了`react-native-amap3d`库，`pod install`的时候可能会报下面的错
![](https://tva1.sinaimg.cn/large/006tNbRwgy1g9n43ndfgvj30nt04a3yv.jpg)

需要找到`react-native-amap3d`中的`react-native-amap3d.podspec`文件，

```
s.dependency 'AMap3DMap', "~> 6.7.0"  //该处的版本从6.6.0改为6.7.0
```

详细可以直接按照官网教程:

https://lbs.amap.com/api/ios-navi-sdk/guide/create-project/cocoapods

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

ios:

![ios](https://tva1.sinaimg.cn/large/006tNbRwgy1g9n474kyuyj30bi0l2tel.jpg)

android:

![android](https://tva1.sinaimg.cn/large/006tNbRwgy1g9n478bbqvj30u01hc7r4.jpg)