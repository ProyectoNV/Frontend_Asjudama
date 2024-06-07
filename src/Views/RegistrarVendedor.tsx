import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const RegistrarVendedor = () => {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validarFormulario = () => {
    if (!tipoDocumento || !numeroDocumento || !nombres || !apellido || !correo || !celular || !fechaContratacion) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return false;
    }

    const numeroDocumentoRegex = /^[0-9]+$/;
    if (!numeroDocumentoRegex.test(numeroDocumento)) {
      Alert.alert("Error", "El número de documento solo puede contener números.");
      return false;
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fechaContratacion)) {
      Alert.alert("Error", "La fecha de contratación debe tener el formato AAAA-MM-DD.");
      return false;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      Alert.alert("Error", "El correo no es válido.");
      return false;
    }

    const celularRegex = /^[0-9]+$/;
    if (!celularRegex.test(celular)) {
      Alert.alert("Error", "El número de celular solo puede contener números.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validarFormulario()) {
      const vendedor = {
        tipoDocumento,
        numeroDocumento,
        nombres,
        apellido,
        correo,
        celular,
        fechaContratacion,
      };
      console.log(vendedor);
      try {
        const respuesta = await axios.post('http://192.168.209.37:4000/admin/registrarvendedor', vendedor);
        console.log(respuesta.data);
        if (respuesta.data.success==true) {
          Alert.alert("Éxito", respuesta.data.message);

          setTipoDocumento('');
          setNumeroDocumento('');
          setNombres('');
          setApellido('');
          setCorreo('');
          setCelular('');
          setFechaContratacion('');
        } else {
          Alert.alert("Error", respuesta.data.message);
        }
      } catch (error) {
        console.log("Error al registrar: ", error);
        Alert.alert("Error", "Se produjo un error al registrar el vendedor.");
      }
    } else {
      console.log("Sigue un error");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('MostrarVendedores', { estado: true })}>
        <Text style={styles.viewButtonText}>Ver Zonas</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Registro de vendedor</Text>
      
      <Text style={styles.label}>Tipo Documento</Text>
      <Picker
        selectedValue={tipoDocumento}
        onValueChange={(itemValue) => setTipoDocumento(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Permiso especial" value="PE" />
        <Picker.Item label="CC" value="CC" />
        <Picker.Item label="CE" value="CE" />
        <Picker.Item label="Pasaporte" value="Pasaporte" />
      </Picker>

      <Text style={styles.label}>Numero Documento</Text>
      <TextInput
        style={styles.input}
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nombres</Text>
      <TextInput
        style={styles.input}
        value={nombres}
        onChangeText={setNombres}
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Celular</Text>
      <TextInput
        style={styles.input}
        value={celular}
        onChangeText={setCelular}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Fecha Contratación</Text>
      <TextInput
        style={styles.input}
        value={fechaContratacion}
        onChangeText={setFechaContratacion}
        placeholder="AAAA-MM-DD"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdf3ec',
  },
  title: {
    fontSize: 24,
    color: "#05bcc1",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  viewButtonText: {
    color: '#05bcc1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrarVendedor;
