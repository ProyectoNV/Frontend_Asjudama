import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Asegúrate de importar correctamente

const RegisterProduct = () => {
  const [nameproduct, setNameproduct] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripción, setDireccion] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = () => {
    if (!nameproduct || !precio || !descripción) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nameproduct)) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido (solo letras).');
      return;
    }

    const numDocRegex = /^[0-9]+$/;
    if (!numDocRegex.test(precio)) {
      Alert.alert('Error', 'Por favor ingresa un precio válido (solo números).');
      return;
    }

    // Lógica de registro
    Alert.alert('¡Éxito!', '¡Cliente registrado correctamente!');
    console.log('Registrarse:', { nameproduct, precio, descripción });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Regístra un producto</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={text => setNameproduct(text)}
          value={nameproduct}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor del producto"
          onChangeText={text => setPrecio(text)}
          value={precio}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          onChangeText={text => setDireccion(text)}
          value={descripción}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
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
  },
});

export default RegisterProduct;
