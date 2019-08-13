import React, { Component } from "react";
import { requireNativeComponent, findNodeHandle, UIManager } from "react-native";


export default class AMapNaviView extends Component{
  static defaultProps = {
    settingMenuEnabled: true,
    trafficBarEnabled: true,
    speechEnabled: true
  };

  _onChange=(event)=> {
    if (typeof this.props[event.nativeEvent.type] === 'function') {
      this.props[event.nativeEvent.type](event.nativeEvent.params);
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
