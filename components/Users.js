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
                    <View style={styles.modal}>
                        <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <Image style={styles.icon} source={require("../assets/icons/fridgely-icon.png")}/>
                            <Text style={{fontSize: 30}}>{this.state.selectedUser.userName}</Text>
                        </View>
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
                <View style={{flexDirection: "column", alignItems: "center"}}>
                    <Image style={{height: 60, width: 60}} source={require("../assets/icons/user-icon.png")}/>
                    <Text style={{fontSize: 30, fontWeight: "700"}}>SIGN IN</Text>
                </View>
                <View>
                        {yourUser}
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <Text style={styles.label}>Existing User</Text>
                        <Picker
                            style={{borderWidth: 1, borderColor: "black", width: 200}}
                            selectedValue={this.state.users}
                            onValueChange={(user) => this.setState({selectedUser: user, visibleModal: true})}>
                            {this.state.users
                                .map(user =>
                            <Picker.Item key={user} label= {user.userName} value={user} />)}
                        </Picker>
                    </View>
                </View>
                <View style={{flex: 0.7}}>
                    <View style={styles.newUser}>
                        <Text style={styles.label}>New User</Text>
                        <TextInput
                            style = {{ borderColor: "black", borderWidth: 1, width: 200}}
                            placeHolder = "Add User"
                            value={this.state.newUser}
                            onChangeText={this.updateUser}
                        />
                    </View>
                    <Button
                        title = "Add User"
                        onPress = {this.postUser}
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