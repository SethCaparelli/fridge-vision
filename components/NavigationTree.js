import React, { Component } from "react"
import {
    StyleSheet,
    View,
    Text,
    Picker,
    TextInput,
    Button,
    Modal,
    Image,
    TouchableOpacity,
} from "react-native"
import ImagePicker from "react-native-image-picker"
import { StackNavigator } from 'react-navigation'

export default class NavigationTree extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
        }
    }

    takePic = () => {
        ImagePicker.showImagePicker({}, response => {
            this.uploadImageAsync(response.uri)
            .then((response) => {
                console.log(response)
                return this.props.navigation.navigate('Recipes', {currentUser: this.props.navigation.state.params.currentUser, recipes: response})
            })
        })
    }

    uploadImageAsync = (uri) => {
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
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
    }

    deleteUser = (id) => {
        fetch("https://pure-meadow-62546.herokuapp.com/user" + '/' + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
    }


    render() {
        let currentUser = this.props.navigation.state.params.currentUser
        let userId = this.props.navigation.state.params.currentUser.id
        return (
        <View style={styles.container}>
            <View style={{flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Image style={styles.icon} source={require("../assets/icons/fridge-vision-icon-small.png")}/>
                <Text
                    style={{fontSize: 40}}
                >{currentUser.userName}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{
                        height: 130,
                        justifyContent: "center",
                        alignItems: "center",
                        width: 130,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        backgroundColor: "#8AC926"
                    }}
                    onPress={this.takePic}>
                    <Text style={styles.text}>Send Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = { () => {this.props.navigation.navigate('SavedRecipes', {currentUser: currentUser})} }
                    style={{
                        height: 130,
                        justifyContent: "center",
                        alignItems: "center",
                        width: 130,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        backgroundColor: "#2B83DA"
                    }}>
                    <Text style={styles.text}>Saved Recipes</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Button
                    title = "Delete User"
                    onPress = { () => this.deleteUser(userId)} />
            </View>
        </View>
        )
    }

    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#94E1F2"
        },
        newUser: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            marginTop: "auto"
        },
        icon: {
            height: 72,
            width: 70,
        },
        buttonContainer: {
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%"
        },
        text: {
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
            justifyContent: "center",
            color: "white"
        },
    })