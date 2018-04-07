import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import ImagePicker from "react-native-image-picker"
import { StackNavigator } from 'react-navigation'

export default class UserCamera extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  }
  takePic = () => {
    this.props.navigation.navigate('UserCamera')
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
        <TouchableOpacity
          onPress={this.takePic}>
          <Text>Take Pic</Text>
        </TouchableOpacity>
        <Button
        title= "Get Recipes"
        onPress={() => {this.props.navigation.navigate('Recipes')}}
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
    justifyContent: 'center',
  },
})
