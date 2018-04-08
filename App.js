import React from "react"
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, Modal } from "react-native"
import { Icon } from 'react-native-elements'
import Users from "./components/Users"
import UserCamera from "./components/UserCamera"
import Recipes from './components/Recipes'
import SavedRecipes from './components/SavedRecipes'
import NavigationTree from './components/NavigationTree'


import { StackNavigator } from 'react-navigation'

class App extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  state = {
    visibleModal: false
  }

  render() {
    let modalContent = (
      <Modal 
      visible={this.state.visibleModal}
      animationType={'slide'}>>
          <View>
              <Text
              style={{marginTop: 22}}
              >Fridgely is an image recognition app that allows you to take a picture of your fridge or pantry's contents and suggests recipes based on ingredients you already have!</Text>
              <Button 
              title = "Cancel"
              onPress = { () => { this.setState({visibleModal: false})} } />
          </View>
      </Modal>
  )

    return (
      <View style={styles.container}>
        <Image style={{height: 239, width: 230, marginLeft: 66, marginTop: 30, marginBottom: 80}} source={require("./assets/icons/fridgely-icon.png")}/>
        <Button
          title="Get Started"
          onPress={() => this.props.navigation.navigate('Users')}
          style={{fontSize: 30}}
        />
        <TouchableHighlight
        onPress={() => this.setState({visibleModal: true})}>
        <Text>Info</Text>
        </TouchableHighlight>
        {modalContent}
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
  SavedRecipes: {
    screen: SavedRecipes
  },
  Recipes: {
    screen: Recipes
  },
  NavigationTree: {
    screen: NavigationTree
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