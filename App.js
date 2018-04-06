import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ImagePicker from "react-native-image-picker"
import { RNS3 } from "react-native-aws3"
// import { aws } from "./keys"

export default class App extends React.Component {
  takePic = () => {
    console.log("touched")
    ImagePicker.showImagePicker({}, response => {
      console.log(response)
      const file = {
        uri: response.uri,
        name: response.filename,
        type: "image/png"
      }
      const config = {
        keyPrefix: "fridgely/",
        bucket: "fridgely",
        region: "us-west-2",
        accessKey: "",
        secretKey: "",
        successActionStatus: 201
      }
      RNS3.put(file, config)
      .then(res => {
        console.log(res.body.postResponse.location)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.takePic}>
          <Text>Take Pic</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
