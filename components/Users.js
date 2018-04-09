import React, { Component } from "react"
import {
    StyleSheet,
    View,
    Text,
    Picker,
    TextInput,
    Modal,
    Image,
    TouchableOpacity
} from "react-native"
import { StackNavigator } from 'react-navigation'
import { Button } from "react-native-elements"
import {YellowBox} from 'react-native'
console.disableYellowBox = true

export default class Users extends Component {
    state = {
        users: [],
        newUser: {},
        selectedUser: null,
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

    postUser = (user) => {
        this.setState({
            selectedUser: user,
            visibleModal: true
        })
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
        }).then(fetch("https://pure-meadow-62546.herokuapp.com/user")
        .then(response => {
            return response.json()
        })
        .then(users => {
            this.setState({
                users: users.users
            })
        })
        .catch(error => {
            console.log(error)
        }))
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

    pickerChangeHandler = (user) => {
        this.setState({selectedUser: user})
    }



    render() {
        let yourUser = null
        if(this.state.selectedUser){
            yourUser = (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.props.navigation.navigate('NavigationTree', {currentUser: this.state.selectedUser})} >
                    <Text style={{color: "white", fontSize: 15, fontWeight: "600"}}>{this.state.selectedUser.userName}</Text>
                  </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 0.5}}>
                    <Image style={{height: 60, width: 60}} source={require("../assets/icons/user-icon.png")}/>
                    <Text style={{fontSize: 25, fontWeight: "700"}}>SIGN IN</Text>
                </View>
                <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                    <Text style={styles.label}>Existing User</Text>
                    <Picker
                        style={{borderWidth: 1, borderColor: "black", width: 200}}
                        selectedValue={this.state.users}
                        onValueChange={this.pickerChangeHandler}>
                        {this.state.users
                            .map(user =>
                        <Picker.Item key={user} label= {user.userName} value={user} />)}
                    </Picker>
                    {yourUser}
                </View>
                <View style={styles.newUser}>
                    <Text style={styles.label}>New User</Text>
                    <TextInput
                        style = {{ borderColor: "black", borderWidth: 1, width: 200, marginBottom: 10}}
                        placeHolder = "Add User"
                        value={this.state.newUser}
                        onChangeText={this.updateUser}
                    />
                    <Button
                        title = "Add User"
                        onPress = {this.postUser}
                        buttonStyle={{
                            backgroundColor: "#2B83DA",
                            width: 100,
                            height: 50,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                     />
                </View>
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
        flex: 0.75,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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
    },
    buttonStyle: {
        backgroundColor: "#9B489B",
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 40,
        borderColor: "transparent",
        color: 'white',
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 10
    }
})