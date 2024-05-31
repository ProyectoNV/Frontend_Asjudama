import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

interface Zona {
  nombre_zona: string;
  descripcion_zona: string;
  ubicacion_zona: string;
  tipo_zona: string;
}

const Registrofor = () => {
  const [nombreZona, setNombreZona] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipoZona, setTipoZona] = useState('residencial');
  const [zonas, setZonas] = useState<Zona[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!nombreZona || !descripcion || !ubicacion) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      const zonaNueva: Zona = {
        nombre_zona: nombreZona,
        descripcion_zona: descripcion,
        ubicacion_zona: ubicacion,
        tipo_zona: tipoZona,
      };

      const response = await fetch('http://192.168.209.37:4000/admin/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zonaNueva),
      });

      if (response.ok) {
        const result = await response.json();
        setZonas([...zonas, zonaNueva]);
        setNombreZona('');
        setDescripcion('');
        setUbicacion('');
        setTipoZona('residencial');
        Alert.alert('¡Éxito!', '¡Zona registrada correctamente!');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Hubo un error registrando la zona.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error registrando la zona.');
    }
  };

  const handleViewZones = () => {
    navigation.navigate('lista_Zona', { estado: true });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('lista_Zona', { estado: true })}>
        <Text style={styles.viewButtonText}>Ver Zonas</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Registro de Zonas</Text>
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre de la Zona:</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Nombre de la Zona"
            onChangeText={text => setNombreZona(text)}
            value={nombreZona}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Descripción"
            onChangeText={text => setDescripcion(text)}
            value={descripcion}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ubicación:</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Ubicación"
            onChangeText={text => setUbicacion(text)}
            value={ubicacion}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo de Zona:</Text>
          <Picker
            selectedValue={tipoZona}
            style={[styles.input, { flex: 1 }]}
            onValueChange={(itemValue) => setTipoZona(itemValue)}
          >
            <Picker.Item label="Residencial" value="residencial" />
            <Picker.Item label="Comercial" value="comercial" />
            <Picker.Item label="Mixta" value="mixta" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar Zona</Text>
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
  viewButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  viewButtonText: {
    color: '#05bcc1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#05bcc1',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: '40%',
    fontSize: 18,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 20,
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
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Registrofor;
