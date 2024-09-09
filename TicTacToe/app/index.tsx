import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';

const SIZE = 3; // Board size

const App = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(SIZE * SIZE).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      Alert.alert(`${winner} Wins!`, 'Play Again?', [
        { text: 'OK', onPress: () => resetBoard() },
      ]);
    } else if (!newBoard.includes(null)) {
      Alert.alert('Draw!', 'Play Again?', [
        { text: 'OK', onPress: () => resetBoard() },
      ]);
    }
  };

  const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(SIZE * SIZE).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity
      key={index} // Unique key for each square
      style={styles.square}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('./images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Tic-Tac-Toe</Text>
        <View style={styles.board}>
          {Array.from({ length: SIZE }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: SIZE }).map((_, colIndex) => {
                const index = rowIndex * SIZE + colIndex;
                return renderSquare(index);
              })}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
          <Text style={styles.resetText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' based on your preference
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', // Ensure text is visible on the background
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for squares
  },
  squareText: {
    fontSize: 36,
    color: '#000',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
