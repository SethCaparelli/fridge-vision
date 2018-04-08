import React, { Component } from "react"
import {
    StyleSheet,
    View,
    Text,
    Picker,
    TextInput,
    Button,
    Modal,
    Image
} from "react-native"
import { StackNavigator } from 'react-navigation'

export default class NavigationTree extends Component {

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
    <View style={styles.modal}>
        <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Image style={styles.icon} source={require("../assets/icons/fridgely-icon.png")}/>
        </View>
        <Button
            title = "Send a Picture"
            onPress = {() => {this.props.navigation.navigate('UserCamera', {currentUser: currentUser})} } />
        <Button
            title = "Go to Existing Recipes"
            onPress = { () => {this.props.navigation.navigate('SavedRecipes', {currentUser: currentUser})} } />
        <Button
            style={{color: 'red'}}
            title = "Delete User"
            onPress = { () => this.deleteUser(userId)} />
    </View>
    )
}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#94E1F2"
    },
    newUser: {
        flex: 0.3,
        flexDirection: "column",
        alignItems: "center",
        marginTop: "auto"
    },
    icon: {
        height: 72,
        width: 70,
      },
    modal: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#94E1F2",
        marginTop: 22
    },
    label: {
        fontSize: 20,
        fontWeight: "600"
    }
})