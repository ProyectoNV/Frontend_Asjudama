import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

interface Cliente {
  nombre: string;
  correo: string;
  celular: string;
}

interface Factura {
  id: number;
  fecha: string;
  monto: number;
}

const InformeClientes: React.FC = () => {
  const [numeroDocumento, setNumeroDocumento] = useState<string>('');
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [compras, setCompras] = useState<number>(0);
  const [facturas, setFacturas] = useState<Factura[]>([]);

  const handleBuscar = () => {
    if (!numeroDocumento) {
      Alert.alert("Error", "Por favor ingrese el número de documento.");
      return;
    }

    // Simulamos la búsqueda de datos del cliente, compras y facturas.
    // En una aplicación real, aquí se haría una solicitud a una API.
    const clienteMock: Cliente = {
      nombre: "Juan Pérez",
      correo: "juan.perez@example.com",
      celular: "1234567890",
    };
    const comprasMock = 5000; // Total de compras
    const facturasMock: Factura[] = [
      { id: 1, fecha: "2024-05-01", monto: 1500 },
      { id: 2, fecha: "2024-05-15", monto: 2000 },
      { id: 3, fecha: "2024-05-20", monto: 1500 },
    ];

    setCliente(clienteMock);
    setCompras(comprasMock);
    setFacturas(facturasMock);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar Reportes del Cliente</Text>

      <Text style={styles.label}>Número de Documento</Text>
      <TextInput
        style={styles.input}
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: 'red' }]} 
        onPress={handleBuscar}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {/* El resto de tu código sigue igual */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    backgroundColor: 'red',
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
});

export default InformeClientes;
