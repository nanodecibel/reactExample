import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ClickerGame = () => {
  const [count, setCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResult(true);
    }
  }, [secondsLeft]);

  const handleClick = () => {
    setCount(count + 1);
    setBackgroundColor(getRandomColor()); // Cambiar aleatoriamente el color de fondo
  };

  const handleRestart = () => {
    setCount(0);
    setSecondsLeft(10);
    setShowResult(false);
    setBackgroundColor(getRandomColor()); // Cambiar el color de fondo al reiniciar
  };

  const resultMessage = `Tu velocidad fue: ${count / 10} clics por segundo`;

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {showResult ? (
        <>
          <Text style={styles.resultText}>{resultMessage}</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'lightblue' }]} onPress={handleRestart}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.timerText}>Tiempo restante: {secondsLeft} segundos</Text>
          <Text style={styles.text}>Contador: {count}</Text>
          <TouchableOpacity style={styles.button} onPress={handleClick} disabled={showResult}>
            <Text style={styles.buttonText}>Click aquí</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ClickerGame;
