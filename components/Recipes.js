
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native'
import { StackNavigator } from "react-navigation"
import SwipeCards from 'react-native-swipe-cards'
import SavedRecipes from "./SavedRecipes"
import { Button } from "react-native-elements"

class Card extends React.Component {

  render() {
    return (
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <View style={{width: 250, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontWeight: "600", fontSize: 20}}>{this.props.title.replace(/&amp;/g, 'and')}</Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL(this.props.source_url)}>
          <Image
          style={{height: 250, width: 250, borderRadius: 10}}
          source={{uri: "https" + this.props.image_url.slice("4")}}/>
        </TouchableOpacity>
      </View>
    )
  }
}
// ==============================================BREAK===========================================================

class NoMoreCards extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.noMoreCardsText}>No More Recipes</Text>
      </View>
    )
  }
}
// ==============================================BREAK===========================================================
export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.navigation.state.params.recipes,
      currentUser: this.props.navigation.state.params.currentUser
    }
  }

  handleYup = (card) => {
    var newRecipe = ""
    var cookingRecipeName = []
    var recipeName = ""
    var recipeID = card.recipe_id
    cookingRecipeName = card.title.split(' ')
    for (let i=0;i<cookingRecipeName.length;i++){
      if (i===0) {
        recipeName = cookingRecipeName[i]
      } else  recipeName = recipeName + "_" + cookingRecipeName[i]
    }
    var recipePic = card.image_url
    var recipeURL = ""
    if (card.source_url.slice('4')[0] !== "s") {
      recipeURL = "https" + card.source_url.slice('4')
    }
    newRecipe =  card.recipe_id + "$" + recipePic + "$" + recipeURL + "$" + recipeName + ","
    let currentUser = this.props.navigation.state.params.currentUser
    console.log(currentUser)
    fetch("https://pure-meadow-62546.herokuapp.com/user/" + currentUser.id, {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentUser.id,
        userName: currentUser.userName,
        recipes: newRecipe + currentUser.recipes,
        created_at: null,
        updated_at: null,
        other: ''
      })
    })
    .then(res => {
      return res.json()
    })
    .then(data => console.log(data))
    .catch(err => {
        console.log(err)
    })
  }

  render() {
    if(this.state.cards) {
      return (
        <View style={{flex: 1, backgroundColor: "#85E4FF", justifyContent: "space-around", alignItems: "center"}}>
          <View>
            <Image style={{marginTop: 20, height: 72, width: 70}} source={require("../assets/icons/fridgely-icon.png")}/>
          </View>
          <SwipeCards
            currentUser={this.state.currentUser}
            cards={this.state.cards}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards currentUser={this.props.currentUser} navigation={this.props.navigation} />}
            handleYup={this.handleYup}
          />
          <View>
            <Button
              onPress={() => this.props.navigation.navigate('NavigationTree', {currentUser: this.props.navigation.state.params.currentUser})}
              title='Go To Profile'
              buttonStyle={{
                backgroundColor: "#2B83DA",
                width: 200,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                marginBottom: 10
              }}
            />
          </View>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: "#85E4FF", justifyContent: "space-around", alignItems: "center"}}>
          <Text style={styles.noMoreCardsText}>Loading...</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
    color: "red"
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