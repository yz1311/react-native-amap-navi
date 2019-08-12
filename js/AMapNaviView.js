import React, { Component } from "react";
import { requireNativeComponent } from "react-native";


export default class AMapNaviView extends Component{
  static defaultProps = {
    settingMenuEnabled: true,
    trafficBarEnabled: true,
    speechEnabled: true,
    //默认是gps导航
    naviMode: 1,
    //默认为白天模式
    modeType: 0,
  };

  _onChange=(event)=> {
    if (typeof this.props[event.nativeEvent.type] === 'function') {
      this.props[event.nativeEvent.type](event.nativeEvent.params);
    }
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
