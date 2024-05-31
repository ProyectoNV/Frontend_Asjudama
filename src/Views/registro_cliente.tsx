import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


const RegisterForm: React.FC = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tdoc, setTdoc] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    
    if (!username || !email || !password || !tdoc || !identificacion || !apellidos || !celular || !direccion) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    if (username.trim().split(/\s+/).length < 1 || apellidos.trim().split(/\s+/).length < 2) {
      Alert.alert('Caracteres insuficientes', 'Por favor, ingresa los nombres completos.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username) || !/^[a-zA-Z\s]+$/.test(apellidos)) {
      Alert.alert('Error', 'Los campos de nombre y apellidos deben contener solo letras y espacios.');
      return;
    }

    if (!/^\d+$/.test(identificacion) || !/^\d+$/.test(celular)) {
      Alert.alert('Error', 'Los campos de número de documento y número de celular deben contener solo números.');
      return;
    }
    
    if (!/@/.test(email)) {
      Alert.alert('Error', 'El campo de correo electrónico debe contener un @.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.209.37:4000/vendedor/registarClientes', {
        pkfk_tdoc: tdoc,
        numero_id: identificacion,
        Nombres: username,
        Apellidos: apellidos,
        correo: email,
        celular,
        contrasena: password,
        direccion,
      });

      if (response.status === 200) {
        Alert.alert('¡Éxito!', '¡Cliente registrado correctamente!');
        console.log('Registrarse:', { username, email, password, tdoc, identificacion, apellidos, celular, direccion });
        // Limpiar los campos después del registro exitoso
        clearFields();
      } else {
        Alert.alert('Error', 'Hubo un problema al registrar el cliente.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
    }
  };

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setTdoc('');
    setIdentificacion('');
    setApellidos('');
    setCelular('');
    setDireccion('');
  };

  const handleNumericInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (/^\d*$/.test(text)) {
      setter(text);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          onChangeText={text => setApellidos(text)}
          value={apellidos}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <View style={styles.input}>
          <Picker
            selectedValue={tdoc}
            onValueChange={(itemValue) => setTdoc(itemValue)}
          >
            <Picker.Item label="Tipo de documento" value="" />
            <Picker.Item label="CC" value="CC" />
            <Picker.Item label="RC" value="RC" />
            <Picker.Item label="PP" value="PP" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          onChangeText={text => handleNumericInput(text, setIdentificacion)}
          value={identificacion}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Número de celular"
          onChangeText={text => handleNumericInput(text, setCelular)}
          value={celular}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          onChangeText={text => setDireccion(text)}
          value={direccion}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewCustomersButton} >
        <Text style={styles.buttonText} onPress={() => navigation.navigate('ClienteInformacion', { estado: true })}>Ver Clientes</Text>
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
    marginBottom: 10,
  },
  viewCustomersButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default RegisterForm;