import React, { Component } from "react"
import { StyleSheet, View, Text, Picker, TextInput, Button, Modal, Image } from "react-native"
import { Card, ListItem } from 'react-native-elements'

export default class SavedRecipes extends Component {
    
    render(){
        let userSavedRecipes = this.props.navigation.state.params.currentUser.recipes
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
            <Card title="recipe">
            {
                breakUpUrl(userSavedRecipes).map((current, index) => {
                    return (
                        <View key={index} >
                        <Image
                            
                        />
                        <Text>{current.title}</Text>
                        </View>
                    )
                })
            }
            </Card>
        )
    }
}