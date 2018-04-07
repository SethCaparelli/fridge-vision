import React from "react"
import { StyleSheet, Text, View, Button, Image } from "react-native"
import Users from "./components/Users"
import UserCamera from "./components/UserCamera"
import Recipes from './components/Recipes'
import { StackNavigator } from 'react-navigation'
class App extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Get Started"
          onPress={() => this.props.navigation.navigate('Users')}
          style={{fontSize: 30}}
        />
        <Text style={{fontSize: 30,}}>Welcome To</Text>
        <Image style={{height: 239, width: 230, marginLeft: 66}} source={require("./assets/icons/fridgely-icon.png")}/>
      </View>
    );
  }
}

export default StackNavigator ({
  Home: {
    screen: App,
  },
  Users: {
    screen: Users
  },
  UserCamera: {
    screen: UserCamera
  },
  Recipes: {
    screen: Recipes
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
})