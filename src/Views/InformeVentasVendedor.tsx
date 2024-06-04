import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

interface Vendedor {
  nombre: string;
  correo: string;
  celular: string;
}

interface Venta {
  numero_factura_venta: number;
  fecha_factura: string;
  total_factura: number;
}

const InformeVentasVendedor = () => {
  const [numeroDocumento, setNumeroDocumento] = useState<string>('');
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [ventas, setVentas] = useState<Venta[]>([]);

  const handleBuscar = async () => {
    if (!numeroDocumento) {
      Alert.alert('Error', 'Por favor ingrese el número de documento.');
      return;
    }

    try {
      // Hacer la solicitud al backend
      const response = await axios.get(`http://192.168.209.37:4000/admin/informeVendedor/${numeroDocumento}`);
      const data = response.data;

      if (data) {
        setVendedor({
          nombre: `${data.infoVendedor.Nombres} ${data.infoVendedor.Apellidos}`,
          correo: data.infoVendedor.correo,
          celular: data.infoVendedor.celular,
        });
        setTotalVentas(data.totalVentas);
        setVentas(data.datosFacturas);
      } else {
        Alert.alert("Error", "No se encontró el cliente.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el cliente.");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informe de Ventas por Vendedor</Text>

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

      {vendedor && (
        <View>
          <Text style={styles.label}>Nombre: {vendedor.nombre}</Text>
          <Text style={styles.label}>Correo: {vendedor.correo}</Text>
          <Text style={styles.label}>Celular: {vendedor.celular}</Text>
          <Text style={styles.label}>Total Ventas: {totalVentas} pesos colombianos</Text>
          
          <Text style={styles.facturaHeader}>Ventas:</Text>
          {ventas.map((venta) => (
            <View key={venta.numero_factura_venta} style={styles.facturaContainer}>
              <Text style={styles.facturaText}>Venta ID: {venta.numero_factura_venta}</Text>
              <Text style={styles.facturaText}>Fecha: {formatDate(venta.fecha_factura)}</Text>
              <Text style={styles.facturaText}>Monto: ${venta.total_factura}</Text>
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
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FF6347',
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

export default InformeVentasVendedor;
