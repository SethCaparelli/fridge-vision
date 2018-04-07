import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ImagePicker from "react-native-image-picker"

export default class UserCamera extends React.Component {
  takePic = () => {
    console.log("touched")
    ImagePicker.showImagePicker({}, response => {
      console.log(response)
      uploadImageAsync(response.uri)
    })

    async function uploadImageAsync(uri) {
      console.log(uri)
      let apiUrl = 'https://pure-meadow-62546.herokuapp.com/upload'
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1]
      let formData = new FormData()
      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      })
      console.log(formData)
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
          <Text>}Take Pic</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#789AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
