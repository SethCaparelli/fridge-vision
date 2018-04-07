import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import IngredientItem from './IngredientItem';

class Ingredients extends Component {
    state = {
        ingredients: ['Lettuce', 'Chicken', 'Strawberries', 'Dick']
    }

    render() {
        return (
            <FlatList
            data={this.state.ingredients}
            renderItem={(info) => (
                <IngredientItem
                ingredientName={info.item.ingredients}
                />
            )}
            >
            </FlatList>
        )
    }
}

export default Ingredients