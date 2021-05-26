import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    // using the spread operator takes this styles.card and adds props.style, overwriting any of the same properties
    // into the one style object
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

// not every card might want to center its content or specify width, so set it elsewhere
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
});

export default Card;