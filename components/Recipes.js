
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native'
import { StackNavigator } from "react-navigation"
import SwipeCards from 'react-native-swipe-cards'
import SavedRecipes from "./SavedRecipes"

class Card extends React.Component {

  render() {
    return (
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <View style={{width: 250, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontWeight: "600", fontSize: 20}}>{this.props.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL(this.props.source_url)}>
          <Image
          style={{height: 250, width: 250, borderRadius: 75}}
          source={{uri: "https" + this.props.image_url.slice("4")}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {this.props.navigation.navigate('SavedRecipes', {currentUser: this.props.currentUser})} }>
          <Text style={styles.noMoreCardsText}>See Your Recipes!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [{
        text: "Fridgely",
        image_url: ""
      }],
      currentUser: this.props.navigation.state.params.currentUser
    }
  }

  componentDidMount() {
    fetch("https://pure-meadow-62546.herokuapp.com/recipe")
    .then(response => {
      return response.json()
    })
    .then(recipes => {
      console.log(recipes)
      this.setState({
        cards: recipes
      })
    })
    .catch(error => console.log(error))
  }
  
  handleYup (card) {
    
    putRecipe = (newCard) => {
      console.log(newCard)
      let currentUser = this.props.navigation.state.params.currentUser
      console.log(currentUser.recipes)
      // let swipedRecipe = makeTheNewRecipe(newCard)
      console.log(currentUser.id)
      fetch("https://pure-meadow-62546.herokuapp.com/user/" + currentUser.id, {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
        body: JSON.stringify({
          id: currentUser.id,
          userName: currentUser.userName,
          recipes: currentUser.recipes + newCard,
          other: ''
        }).then(res => {
          console.log(res.json())
        })
          .catch(err => {
            console.log(err)
          })
      })
    }

    function makeTheNewRecipe(card) {
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
      newRecipe = "," + card.recipe_id + "$" + recipePic + "$" + recipeURL + "$" + recipeName
      return putRecipe(newRecipe)
    }
    
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }

  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#85E4FF", justifyContent: "space-around", alignItems: "center"}}>
        <View>
          <Image style={{ height: 72, width: 70}} source={require("../assets/icons/fridgely-icon.png")}/>
        </View>
        <SwipeCards
          currentUser={this.state.currentUser}
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards currentUser={this.props.currentUser} navigation={this.props.navigation} />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          handleMaybe={this.handleMaybe}
        />
      </View>
    )
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
  }
})