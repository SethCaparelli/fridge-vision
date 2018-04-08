import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import ImagePicker from "react-native-image-picker"
import { StackNavigator } from 'react-navigation'

export default class UserCamera extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Camera',
  }

  goToRecipes = () => {
    return this.props.navigation.navigate('Recipes')
  }

  takePic = () => {
    // this.props.navigation.navigate('Recipes')
    ImagePicker.showImagePicker({}, response => {
      uploadImageAsync(response.uri)
    })


    async function uploadImageAsync(uri) {
      let apiUrl = 'https://pure-meadow-62546.herokuapp.com/upload'
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1]
      let formData = new FormData()
      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      })
      let options = {
        method: 'POST',
        body: formData,
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return fetch(apiUrl, options)
      .then(response => console.log(response))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={require("../assets/icons/camera-icon.png")}/>
        <TouchableOpacity
          style={styles.picButton}
          onPress={this.takePic}
          >
          <Text>Take Pic</Text>
        </TouchableOpacity>
        <Button
        title= "Get Recipes"
        onPress={() => {this.props.navigation.navigate('Recipes', {navigation: this.props.navigation}, {currentUser: this.props.currentUser})}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85E4FF',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    height: 60,
    width: 60,
  },
  pickButton: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "red",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
