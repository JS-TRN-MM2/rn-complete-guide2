import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/defaultStyles';

// useRef:  hook that you create an object you can bind to an input to get access to them
// useRef:  also allows you to assign a value that survives re-renders
// here we want to lock in a minimum and maximum that we can change but which is not re-rendered just
// because the component is rendered again.  If your item just concerns the logic, no need to rerender the 
// screen;  useRef

// generateRandomNumber generates a random numer between 2 numbers and excludes some numbers including the actual number.
// creating a function outside of GameScreen because it is not using any 
// data from within GameScreen and does not rely on any props or state.  
// Doesn't need to be re-rendered everytime GameScreen is rerendered
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min); // makes sure it is an integer, rounded up
    max = Math.floor(max); // same as above but rounded down
    const rndNum = Math.floor(Math.random() * (max - min)) + min; // random function generates random number between 0 and 1
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    //computer needs to make a guess when screen first loads
    // whenever the user presses 'this is too low' or 'this is too high'
    //t hen, we want to generate a new number
    // should be a random number
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice));
    // the useState(generate...) will only be used for the initialState when there is no initial state.

    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // destructure the props
    const { userChoice, onGameOver} = props;

    useEffect(() => {
        // this will run after everytime the GameScreen function has been rendered
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver])
    // within array above you add any values (dependencies) that are coming from outside the useEffect function



    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)
        ){
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                {text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess; // useRefs have a property of 'current'
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>

        </View>
    )


};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 200,
        maxWidth: '80%'
    }
});

export default GameScreen;