
# react-native-amap-navi
高德地图导航库
## Getting started

`$ npm install react-native-amap-navi --save`

### Mostly automatic installation

`$ react-native link react-native-amap-navi`

### Manual installation


#### iOS

1.进入ios文件夹，运行`pod install`即可

注意:
需要多编译几次才会成功，由于是ios小白，暂时找不到办法

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
  