import React, { Component } from "react"
import { StyleSheet, View, Text, Picker, TextInput, Button, Modal } from "react-native"

export default class Users extends Component {
    state = {
        users: [],
        newUser: {},
        selectedUser: null,
        visibleModal: true
    }

    componentDidMount = () => {
        fetch("https://pure-meadow-62546.herokuapp.com/user")
        .then(response => {
            // console.log(response)
            return response.json()
        })
        .then(users => {
            // console.log(users)
            this.setState({
                users: users.users
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    postUser = () => {
        let postedUser = this.state.newUser
        fetch("https://pure-meadow-62546.herokuapp.com/user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postedUser)
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
    }

    deleteUser = (id) => {
        fetch("https://pure-meadow-62546.herokuapp.com/user" + '/' + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
    }

    updateUser = value => {
        this.setState({
            newUser: {
                userName: value,
                recipes: '',
                other: ''
            }
        })
    }

    ShowModalFunction(visible) {
        this.setState({
            visibleModal: visible
        })
    }

    render() {
        let yourUser = null

        if(this.state.selectedUser !== null) {
            yourUser = (
                <Modal
                    visible={this.state.visibleModal}
                    animationType={'slide'}>
                    <View style={{marginTop: 22}}>
                        <Text>{this.state.selectedUser.userName}</Text>
                    <Button
                        title = "Send a Picture"
                        onPress = {() => {this.props.navigation.navigate('UserCamera', {currentUser: this.state.selectedUser}), this.setState({visibleModal: false})} } />
                    <Button
                        title = "Go to Existing Recipes"
                        onPress = { () => {this.props.navigation.navigate('SavedRecipes', {currentUser: this.state.selectedUser}), this.setState({visibleModal: false})} } />
                    <Button
                        style={{color: 'red'}}
                        title = "Cancel"
                        onPress = { () => { this.setState({visibleModal: false})} } />
                    </View>
                </Modal>
            )
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text>Enter New User</Text>
                    <TextInput
                        style = {{borderColor: "black", borderWidth: 1}}
                        placeHolder = "Add User"
                        value={this.state.newUser}
                        onChangeText={this.updateUser}
                    />
                    <Button
                        title = "Add User"
                        onPress = {this.postUser}
                    />
                </View>
                <View>
                        {yourUser}
                    <Text>Choose Existing User</Text>
                    <Picker
                        style={{borderWidth: 1, borderColor: "black"}}
                        selectedValue={this.state.users}
                        onValueChange={(user) => this.setState({selectedUser: user, visibleModal: true})}>
                        {this.state.users
                            .map(user =>
                        <Picker.Item key={user} label= {user.userName} value={user} />)}
                    </Picker>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#94E1F2"
    }
})