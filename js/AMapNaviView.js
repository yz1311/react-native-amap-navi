import React, { Component } from "react";
import { requireNativeComponent, findNodeHandle, UIManager, Platform } from "react-native";


export default class AMapNaviView extends Component{
  static defaultProps = {
    settingMenuEnabled: true,
    trafficBarEnabled: true,
    speechEnabled: true
  };

  _onChange=(event)=> {
    if (typeof this.props[event.nativeEvent.type] === 'function') {
      switch (event.nativeEvent.type) {
        case 'onCalculateRouteSuccess':
          //ios跟android的枚举值不一致,以android为准
          if(Platform.OS === 'ios')
          {
            switch (event.nativeEvent.params.calcRouteType) {
              case 1:
                this.props[event.nativeEvent.type]({
                  ...event.nativeEvent.params,
                  calcRouteType: 0
                });
                break;
              case 2:
                this.props[event.nativeEvent.type]({
                  ...event.nativeEvent.params,
                  calcRouteType: 1
                });
                break;
              case 5:
                this.props[event.nativeEvent.type]({
                  ...event.nativeEvent.params,
                  calcRouteType: 2
                });
                break;
              default:
                this.props[event.nativeEvent.type](event.nativeEvent.params);
                break;
            }
          }
          else
          {
            this.props[event.nativeEvent.type](event.nativeEvent.params);
          }
          break;
        default:
          this.props[event.nativeEvent.type](event.nativeEvent.params);
          break;
      }
    }
  }

  _sendCommand(command: string, params?: []) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.AMapNaviView.Commands[command],
      params,
    )
  }

  calculateRoute = (points=[],strategy=0)=>{
    this._sendCommand('calculateRoute',[
      points,strategy
    ]);
  }

  startNavi = (naviMode = 0)=>{
    this._sendCommand('startNavi',[naviMode]);
  }

  render () {
    return (
      <AMapNaviViewNative
        {...this.props}
        onChange={this._onChange}
        />
    );
  }
}


const AMapNaviViewNative = requireNativeComponent('AMapNaviView', AMapNaviView , {
  nativeOnly: {onChange: true}
});
