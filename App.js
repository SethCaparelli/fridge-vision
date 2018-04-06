import React from "react"
import { StyleSheet, Text, View, Button, Image } from "react-native"
import Users from "./components/Users"
// import UserCamera from "./components/UserCamera"
import { StackNavigator } from 'react-navigation'
import { Fonts } from "./src/utils/Fonts"
class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30,}}>Welcome To</Text>
        <Image style={{height: 239, width: 230, marginLeft: 66}} source={require("./assets/icons/fridgely-icon.png")}/>
        <Button
          title="Get Started"
          onPress={() => this.props.navigation.navigate('Users')}
          style={{fontSize: 30}}
        />
      </View>
    );
  }
}

export default StackNavigator ({
  Home: {
    screen: App,
  },
  // UserCamera: {
  //   screen: UserCamera,
  // }
  Users: {
    screen: Users
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#85E4FF',
    alignItems: "center",
    justifyContent: "space-around",
  },
});