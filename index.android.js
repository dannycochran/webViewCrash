/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Text,
  View,
  WebView,
  TouchableHighlight
} from 'react-native';

class webViewCrash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webViewResponse: 'nothing yet received'
    };
  }
  
  onExecuteWebViewCode() {
    this.webview.postMessage(JSON.stringify({
      type: 'executeUserCode',
      code: `while (true) { console.log('this will crash the app!'); }`
    }));
  }
 
  onWebViewMessage(event) {
    this.setState({ webViewResponse: JSON.parse(event.nativeEvent.data).response });
  }

  render() {
    return (
      <View style={{flex: 1, margin: 20}}>
      	<View style={{flex: 1 }}>
          <Text>{this.state.webViewResponse}</Text>
          <WebView onMessage={this.onWebViewMessage.bind(this)}
            ref={webview => { this.webview = webview; } }
            javaScriptEnabled={true}
            startInLoadingState={true}
            source={{html: htmlSource}} />
          <TouchableHighlight style={{backgroundColor: 'orange', height: 50, alignItems: 'center', justifyContent: 'center'}}
          	onPress={this.onExecuteWebViewCode.bind(this)}>
              <Text style={{color: 'white'}}>Tap to Execute Infinite Loop in WebView</Text>
          </TouchableHighlight>
				</View>
      </View>
    );
  }
};

AppRegistry.registerComponent('webViewCrash', () => webViewCrash);
