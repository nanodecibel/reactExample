import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../database/FirebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

type Data = {
  LoginScreen: undefined;
  MyKeyboard: undefined;
  ClickerGame:undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<Data, 'LoginScreen'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number>(0); // Estado para la edad

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleCreateAccount = () => {
    if (!age) {
      Alert.alert('Ingrese su edad');
      return;
    }

    console.log('Edad:', age);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        console.log('Datos del usuario:', user);

        addDoc(collection(db, 'users'), {
          userId: userId,
          email: email,
          age: age,
        })
          .then(() => {
            console.log('Datos del usuario guardados en Firestore');
            navigation.navigate('ClickerGame');
          })
          .catch((error: any) => {
            console.error('Error al guardar los datos del usuario:', error);
            Alert.alert('Error al guardar los datos del usuario');
          });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate('ClickerGame');
        console.log('¡Inicio de sesión exitoso!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={age.toString()}
        onChangeText={(text) => setAge(parseInt(text))}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
