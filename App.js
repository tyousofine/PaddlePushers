import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import physics from './physics';
import { GameEngine } from 'react-native-game-engine';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import entities from './entities/index';
import Constants from './Constants';
import Images from './Images';

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);

  const [running, setRunning] = useState(false);
  const [enemyScore, setEnemyScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);

  const [collisionOccurred, setCollisionOccurred] = useState(false);
  const [gameOver, setGameOver] = useState(false);


  const handlePlayerScore = () => {
    if (!collisionOccurred) {
      setCollisionOccurred(true);
      setTimeout(() => setCollisionOccurred(false), setPlayerScore(playerScore + 1));
    }
  };

  const handleEnemyScore = () => {
    if (!collisionOccurred) {
      setCollisionOccurred(true);
      setTimeout(() => setCollisionOccurred(false), setEnemyScore(enemyScore + 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[physics]}
        entities={entities()}
        style={styles.gameContainer}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'player-score':
              handlePlayerScore();
              break;
            case 'enemy-score':
              handleEnemyScore();
              break;
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              setGameOver(true);
              break;
          }
        }}>
        <StatusBar style="auto" hidden={true} />

      </GameEngine>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>P2 {enemyScore}</Text>
        {/* <Text style={styles.net}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text> */}
        <Text style={styles.scoreText}>P1 {playerScore}</Text>

      </View>


      {!running ? (
        <View style={styles.welcomeScreenContainer}>
          <Image
            source={Images.pingpong}
            style={styles.titleImg}
            resizeMode="stretch"
          />

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setRunning(true);
            }}>
            <Text style={styles.startButtonText}>START GAME</Text>
          </TouchableOpacity>


        </View>
      ) : null}

      {gameOver ? (
        <View style={styles.welcomeScreenContainer}>

          <TouchableOpacity
            style={styles.gameButton}
            onPress={() => {
              setRunning(false);
              setGameOver(false);
              setPlayerScore(0);
              setEnemyScore(0);
            }}>
            <Text style={styles.gameovertButtonText}>GAME OVER!!</Text>
          </TouchableOpacity>

          <View style={styles.finalScoreContainer}>
            <Text style={styles.finalScore}>Player 1 score: {playerScore} | Player 2 score: {enemyScore}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46A07E',

  },

  titleImg: {
    position: 'absolute',
    width: Constants.SCREEN_WIDTH / 1.5,
    height: Constants.SCREEN_HEIGHT / 4,
    alignItems: 'center',
    marginTop: 70
  },

  gameContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '46A07E',
  },

  welcomeScreenContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'black',
  },


  startButton: {
    left: 0,
    top: 350,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderRadius: 20 / 2,
    borderColor: 'white',
    padding: 25,
    alignItems: 'center',

  },

  startButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  gameButton: {
    left: 0,
    top: Constants.WINDOW_WIDTH / 1.5,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderRadius: 20 / 2,
    borderColor: 'white',
    padding: 30,
    alignItems: 'center',

  },

  gameovertButtonText: {
    color: 'white',
    fontSize: 20,
  },

  finalScoreContainer: {
    display: 'flex',
    alignItems: 'center',

  },

  finalScore: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },

  scoreContainer: {

    width: '100%',
    paddingHorizontal: 10
  },

  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  // net: {
  //   fontSize: 20,
  //   color: 'white'

  // },




});
