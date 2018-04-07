
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: "pink"}]}>
        <Text>{this.props.title}</Text>
        <Image
        style={{height: 250, width: 250, borderRadius: 75}}
        source={{uri: "https" + this.props.image_url.slice("4")}}/>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No More Recipes!</Text>
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
      }]
    }
  }

  componentDidMount() {
    fetch("https://pure-meadow-62546.herokuapp.com/recipe")
    .then(response => {
      return response.json()
    })
    .then(recipes => {
      this.setState({
        cards: recipes
      })
    })
    .catch(error => console.log(error))
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
      />
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