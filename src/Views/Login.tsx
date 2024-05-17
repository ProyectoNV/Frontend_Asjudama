import React, { useState, useEffect} from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';


import { StackScreenProps } from "@react-navigation/stack";


export const LoginScreen = () => {
  const [nombreActividad, setNombreActividad] = useState('');
  const [foto, setFoto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const idActividad = 3;

  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.titlle_agre}>Iniciar sesión</Text>
      <View style={styles.form}>

        <TextInput
          style={styles.input_agre}
          placeholder="Correo Usuario"
          onChangeText={text => setNombreActividad(text)}
          value={nombreActividad}
        />
        <TextInput
          style={[styles.input_agre, styles.text_area]}
          placeholder="Contraseña Usuario"
          multiline
          numberOfLines={4}
          onChangeText={text => setDescripcion(text)}
          value={descripcion}
        />
        <View style={{ marginTop: 30 }}>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  form: {
    width: '80%',
    height: '65%',
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 7,
    padding: 15,
  },
  titlle_agre: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 20,
  },
  titlle_second: {
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#fcb900',
  },
  input_agre: {
    height: 40,
    borderColor: '#fcb900',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    margin: 10,
  },
  select_agre: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fcb900',
    paddingHorizontal: 10,
    margin: 10,
  },
  text_area: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#8b0fff',
    borderRadius: 5,
    color: '#fff',
  }
});