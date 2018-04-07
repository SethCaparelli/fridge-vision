import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const IngredientItem = (props) => (
    <TouchableOpacity >
            <Text>{props.ingredientName}</Text>
    </TouchableOpacity>
)

export default IngredientItem