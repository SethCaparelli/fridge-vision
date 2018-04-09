import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation'

export default class Picture extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Picture',
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Image style={{flex: 0.5}} source={require(this.props.uri)}/>
      </View>
    )
  }
}
