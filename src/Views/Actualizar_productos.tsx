import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const ActualizarProduct = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ActualizarProduct'>>();
  const { id_producto } = route.params; // Obtén el id_producto de los parámetros de la ruta
  const [nameproduct, setNameproduct] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [listUpdated, setListUpdated] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const actuaproduct = async () => {
        try{
            const getActualizar = await fetch(`http://192.168.209.37:4000/admin/Buscar_producto/${id_producto}`);
            const dataActualizar= await getActualizar.json();
            if (getActualizar.status === 200) {
                setNameproduct(dataActualizar[0].nombre_producto || '');
                setPrecio(dataActualizar[0].valor_unitario || '');
                setDescripcion(dataActualizar[0].descripcion_producto || '');
            }
        }catch(error){
            console.log(error);
        }
    }
    actuaproduct();
    setListUpdated(false);
}, [id_producto, listUpdated]);

  const handleActualizar = async () => {
    if (!nameproduct || !precio || !descripcion) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nameproduct)) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido (solo letras).');
      return;
    }

    const numDocRegex = /^\d+(\.\d{1,2})?$/;
    if (!numDocRegex.test(precio)) {
      Alert.alert('Error', 'Por favor ingresa un precio válido (solo números).');
      return;
    }

    try {
      const response = await fetch(`http://192.168.209.37:4000/admin/actualizar_producto/${id_producto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_producto: nameproduct,
          valor_unitario: precio,
          descripcion_producto: descripcion,
        })
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('¡Éxito!', '¡Producto actualizado correctamente!');
        console.log('Registrado:', result);
      } else {
        const error = await response.json();
        Alert.alert('Error', 'Hubo un problema al actualizar el producto.');
        console.error('Error:', error);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualiza un producto</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleActualizar}>
        <Text style={styles.buttonText}>Actualizar</Text>
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

export default ActualizarProduct;
