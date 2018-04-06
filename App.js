import React from "react"
import { StyleSheet, Text, View, Button, Image } from "react-native"
// import Users from "./components/Users"
import UserCamera from "./components/UserCamera"
import { StackNavigator } from 'react-navigation'



class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome To</Text>
        {/* <Image style={{flex: 0.7, height: "100%", width: "75%"}} source={require("./fridgely-icon.png")}/> */}
        <Button
          title="Get Started"
          onPress={() => this.props.navigation.navigate('UserCamera')}
        />
      </View>
    );
  }
}

export default StackNavigator ({
  Home: {
    screen: App,
  },
  UserCamera: {
    screen: UserCamera,
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});