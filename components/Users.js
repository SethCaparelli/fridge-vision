import React, { Component } from "react"
import { View, Text, Picker, TextInput, Button } from "react-native"

export default  class Users extends Component {
    state = {
        users: [],
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

    updateUser = () => {
        const newUser = this.name.value
        this.setState({
            newUser
        })
    }

    postUser = () => {
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
        console.log(this.state.users)
        return (
            <View>
                <Picker style={{borderWidth: 1, borderColor: "red"}} selectedValue={this.state.users} onValueChange={this.updateUser}>
                    {this.state.users.map(user => <Picker.Item label= {user.userName} />)}
                </Picker>
                <TextInput
                    style = {{borderColor: "black", borderWidth: 1}}
                    placeHolder = "Add User"
                    onChange = {(e) => this.updateUser(e)}
                    />
                <Button
                    title = "Submit"
                    onPress = {this.postUser}
                    />
            </View>
        )
    }
}