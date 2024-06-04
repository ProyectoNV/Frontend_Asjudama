import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Asegúrate de importar correctamente

const RegisterProduct = () => {
  const [nameproduct, setNameproduct] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!nameproduct || !precio || !descripcion) {
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

    try {
      const response = await fetch('http://192.168.209.37:4000/admin/registro_producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_producto: nameproduct,
          valor_unitario: precio,
          descripcion_producto: descripcion,
          estado_producto: '1' 
        })
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('¡Éxito!', '¡Producto registrado correctamente!');
        console.log('Registrado:', result);
      } else {
        const error = await response.json();
        Alert.alert('Error', 'Hubo un problema al registrar el producto.');
        console.error('Error:', error);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error('Error:', error);
    }
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
          keyboardType="numeric"
          onChangeText={text => setPrecio(text)}
          value={precio}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          onChangeText={text => setDescripcion(text)}
          value={descripcion}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Productos_Lista', { estado: true })}>
        <Text style={styles.buttonText}>Ver Productos</Text>
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
    color: '#05bcc1',
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default RegisterProduct;
