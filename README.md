
# react-native-amap-navi
高德地图导航库
## Getting started

`$ npm install react-native-amap-navi --save`

### Mostly automatic installation

`$ react-native link react-native-amap-navi`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-amap-navi` and add `RNReactNativeAmapNavi.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeAmapNavi.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Open `target` ➜ `Capabilities` ➜ `Background Modes`,check `Location updates`
4. Run your project (`Cmd+R`)< 

另外，需要按照官网教程添加权限和依赖(3个Framework已经包含在库中，不用手动下载添加)
https://lbs.amap.com/api/ios-navi-sdk/guide/create-project/manual-configuration


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
```javascript
import AmapNavi, { AmapNaviType } from "react-native-amap-navi";

//points数组分下面两个情况:
//1.只有一个元素，表示终点，起点会默认为当前定位位置
//2.大于等于两个元素，头尾分别为起点和终点，中间的为经过的点，经过点最多3个

AmapNavi.showRouteActivity([{
                        name: '北京站',
                        latitude: 0.0,
                        longitude: 0.0
                      }],AmapNaviType.DRIVER);
```
  