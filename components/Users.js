import React, { Component } from "react"
import { View, Text, Picker, TextInput, Button } from "react-native"

export default  class Users extends Component {
    state = {
        user: [],
        newUser: ""
    }

    componentDidMount = () => {
        fetch("https://pure-meadow-62546.herokuapp.com/user")
        .then(response => {
            console.log(response)
            // return response.json()
        })
        .then(users => {
            this.setState({
                users: users.users
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    updateUser = (selectedUser) => {
        this.setState({
            selectedUser
        })
    }

    postUser = () => {
        const newUser = this.state.newUser
        console.log(newUser)
        fetch("https://pure-meadow-62546.herokuapp.com/user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({newUser})
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                    {this.state.user.map(user => <Picker.Item label= {user.userName} />)}
                </Picker>
                <TextInput
                    style = {{borderColor: "black", borderWidth: 1}}
                    placeHolder = "Add User"
                    onChange = {this.updateUser}
                    />
                <Button
                    title = "Submit"
                    onPress = {this.postUser}
                    />
            </View>
        )
    }
}