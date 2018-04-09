import React, { Component } from "react"
import { StyleSheet, View, Text, Picker, TextInput, Button, Modal, Image, ScrollView, TouchableHighlight, Linking } from "react-native"
import { Card, ListItem } from 'react-native-elements'

export default class SavedRecipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userSavedRecipes: ""
        }
    }

    componentDidMount() {
        let id = this.props.navigation.state.params.currentUser.id
        console.log(id)
        fetch("https://pure-meadow-62546.herokuapp.com/user/" + id)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(user => {
            console.log(user.users.recipe)
            this.setState({
                userSavedRecipes: user.users.recipes
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        function breakUpUrl(rawRecipe){
            var finalRecipeArray = []
            for (var i = 0; i < rawRecipe.split(',').length-1; i++) {
              var halfCookedRecipe = rawRecipe.split(',')[i]
              var doneRecipe = halfCookedRecipe.split('$')
              var secureImage = 'https' + doneRecipe[1].slice('4')
              var nameArray = doneRecipe[3].split('_')
              var newString = ''
              for (let i=0;i<nameArray.length;i++) {
                    newString = newString + " " + nameArray[i]
              }
              var eachRecipeObject = {
                "id": doneRecipe[0],
                "image": secureImage,
                "url": doneRecipe[2],
                "title": newString
              }
              finalRecipeArray.push(eachRecipeObject)
            }
            console.log(finalRecipeArray)
            return finalRecipeArray
          }
        return(
            <ScrollView>
            {breakUpUrl(this.state.userSavedRecipes).map((current, index) => {
                let url = current.url
                return (
                    <Card
                    title={current.title}>
                        <View key={index} >
                        <TouchableHighlight
                        style={{justifyContent: "center", alignItems: "center"}}
                        onPress={() => Linking.openURL(url)}>
                        <Image
                            source={{uri: current.image}}
                            style={{height: 250, width: 250, borderRadius: 75}}
                        />
                        </TouchableHighlight>
                        </View>
                    </Card>
                )
            })}
        </ScrollView>
        )
    }
}