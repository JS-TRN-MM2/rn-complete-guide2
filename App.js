import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
//expo-font: package that includes font utilities
import AppLoading from 'expo-app-loading';
// a special component that prolongs the app loading until chosen tasks are complete

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
  //.loadAsync returns a promise, which means that returning it will take a bit longer
  // also, this function is outside of the App because it does not need to run
  // each time the App function renders
}

export default function App() { 
  const [userNumber, setUserNumber] = useState();
  // need to keep track of how many rounds of guesses thater have been
  // if guessRounds is 0, we know that the game has not started
  // or it is running
  // if it is greater than 0, then the gameOverHandler executes
  // we want to show the GameOverScreen, if the guessRounds is greater than 0
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log(err)}
      />
    );
    // startAsync must call a function that returns a promise.  It will listen and 
    // when the promise resolves, it will do the instructions in onFinish.
    // must call a function
    // Typically, you use the AppLoading component to load assets that should be 
    // there when the app loads
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds >0) {
    content = <GameOverScreen roundsCount={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guess a Number" />
        {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
