import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

interface Cliente {
  id_usuario: number;
  pkfk_tdoc: string;
  numero_id: string;
  id_rol: number;
  Nombres: string;
  Apellidos: string;
  correo: string;
  celular: string;
  contrasena: string;
  estado: number;
}

interface Factura {
  numero_factura_venta: number;
  fecha_factura: string;
  total_factura: number;
}

const InformeClientes = () => {
  const [numeroDocumento, setNumeroDocumento] = useState<string>('');
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [compras, setCompras] = useState<number>(0);
  const [facturas, setFacturas] = useState<Factura[]>([]);

  const handleBuscar = async () => {
    if (!numeroDocumento) {
      Alert.alert("Error", "Por favor ingrese el número de documento.");
      return;
    }

    try {
      // Hacer la solicitud al backend
      const response = await axios.get(`http://192.168.209.37:4000/admin/informeCliente/${numeroDocumento}`);
      const data = response.data;

      if (data) {
        setCliente(data.infoCliente);
        setCompras(data.totalFactura);
        setFacturas(data.compras);
      } else {
        Alert.alert("Error", "No se encontró el cliente.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el cliente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reportes del Clientes</Text>

      <Text style={styles.label}>Número de Documento</Text>
      <TextInput
        style={styles.input}
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleBuscar}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {cliente && (
        <View>
          <Text style={styles.label}>Nombre: {cliente.Nombres} {cliente.Apellidos}</Text>
          <Text style={styles.label}>Correo: {cliente.correo}</Text>
          <Text style={styles.label}>Celular: {cliente.celular}</Text>
          <Text style={styles.label}>Total Compras: {compras}</Text>
          
          <Text style={styles.facturaHeader}>Facturas:</Text>
          {facturas.map((factura) => (
            <View key={factura.numero_factura_venta} style={styles.facturaContainer}>
              <Text style={styles.facturaText}>Factura #{factura.numero_factura_venta}</Text>
              <Text style={styles.facturaText}>Fecha: {factura.fecha_factura}</Text>
              <Text style={styles.facturaText}>Total factura: {factura.total_factura}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
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
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#05bcc1',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  facturaHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  facturaContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  facturaText: {
    fontSize: 16,
    color: '#333',
  },
});

export default InformeClientes;
