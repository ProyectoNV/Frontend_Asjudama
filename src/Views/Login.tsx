import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const Alerta = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alerta('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://192.168.209.37:4000/ingresar', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const result = await response.json();

      if (result.success) {
        const datausuario = JSON.stringify(result.usuario);
        await AsyncStorage.setItem('pruebasesion', datausuario);
        Alerta('Éxito', 'Inicio de sesión exitoso');

        setTimeout(() => {
          if (result.usuario.rol === 1) {
            navigation.navigate('MainTabsAdmi');
          } else if (result.usuario.rol === 2) {
            navigation.navigate('MainTabsVende');
          }
        }, 1500);
      } else {
        Alerta('Error', 'Usuario no encontrado, verifique los datos');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alerta('Error', 'Hubo un problema con el servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ingreso</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fdf3ec',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#85C1E9',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
