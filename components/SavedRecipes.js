import React, { Component } from "react"
import { StyleSheet, View, Text, Picker, TextInput, Button, Modal } from "react-native"

export default class SavedRecipes extends Component {
    render(){
        return(
            <View>
                <Text>{this.props.navigation.state.params.currentUser.userName}</Text>
            </View>
        )
    }
}