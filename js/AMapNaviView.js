import React, { Component } from "react";
import { requireNativeComponent } from "react-native";


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
