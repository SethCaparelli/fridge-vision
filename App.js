import React from "react"
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal } from "react-native"
import Users from "./components/Users"
import UserCamera from "./components/UserCamera"
import Recipes from './components/Recipes'
import SavedRecipes from './components/SavedRecipes'
import NavigationTree from './components/NavigationTree'
import { Button } from 'react-native-elements'
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
      animationType={'slide'}>
          <View style={styles.modal}>
              <Text style={{margin: 50, fontSize: 30}}>
                Fridgely is an image recognition app that allows you
                to take a picture of your fridge or pantry's contents
                and suggests recipes based on ingredients you already have!
                </Text>
              <Button
              buttonStyle={{
                backgroundColor: "#2B83DA",
                width: 60,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
                title = "Ok"
                onPress = { () => { this.setState({visibleModal: false})} } />
          </View>
      </Modal>
  )

    return (
      <View style={styles.container}>
        <Image style={{height: 240, width: 238, marginLeft: 0, marginTop: 120, marginBottom: 80}} source={require("./assets/icons/fridge-vision-icon.png")}/>
       <Button
          onPress={() => this.props.navigation.navigate('Users')}
          title='Get Started'
          buttonStyle={{
            backgroundColor: "#2B83DA",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
        />
        <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-start", width: "100%"}}>
          <TouchableHighlight
            onPress={() => this.setState({visibleModal: true})}>
            <Image style={{height: 30, width: 30, margin: 5}} source={require("./assets/icons/info-icon.png")}/>
          </TouchableHighlight>
        </View>
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
  modal: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: '#94E1F2'
  }
})