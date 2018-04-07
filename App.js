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
        <Image style={{height: 239, width: 230, marginLeft: 66, marginTop: 30, marginBottom: 80}} source={require("./assets/icons/fridgely-icon.png")}/>
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
    backgroundColor: '#94E1F2',
    alignItems: "center",
    justifyContent: "center",
  },
})