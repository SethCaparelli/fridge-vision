import React, { Component } from "react"
import { StyleSheet, View, Text, Picker, TextInput, Button } from "react-native"

export default  class Users extends Component {
    state = {
        users: [],
        newUser: ""
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
            <View style={styles.container}>
                <TextInput
                    style = {{borderColor: "black", borderWidth: 1}}
                    placeHolder = "Add User"
                    />
                <Button
                    title = "Submit"
                    onPress = {this.postUser}
                    />
                <Picker style={{borderWidth: 1, borderColor: "black"}} selectedValue={this.state.users}>
                    {this.state.users.map(user => <Picker.Item key={user} label= {user.userName} />)}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    }
})