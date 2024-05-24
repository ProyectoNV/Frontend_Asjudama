import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

interface Vendedor {
  nombre: string;
  correo: string;
  celular: string;
}

interface Venta {
  id: number;
  fecha: string;
  monto: number;
  producto: string;
}

const InformeVentasVendedor: React.FC = () => {
  const [numeroDocumento, setNumeroDocumento] = useState<string>('');
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [ventas, setVentas] = useState<Venta[]>([]);

  const handleBuscar = () => {
    if (!numeroDocumento) {
      Alert.alert("Error", "Por favor ingrese el número de documento.");
      return;
    }

    // Simulamos la búsqueda de datos del vendedor, total de ventas y ventas.
    // En una aplicación real, aquí se haría una solicitud a una API.
    const vendedorMock: Vendedor = {
      nombre: "Carlos Martínez",
      correo: "carlos.martinez@example.com",
      celular: "0987654321",
    };
    const totalVentasMock = 15000; // Total de ventas
    const ventasMock: Venta[] = [
      { id: 1, fecha: "2024-05-01", monto: 3000, producto: "Producto A" },
      { id: 2, fecha: "2024-05-10", monto: 5000, producto: "Producto B" },
      { id: 3, fecha: "2024-05-20", monto: 7000, producto: "Producto C" },
    ];

    setVendedor(vendedorMock);
    setTotalVentas(totalVentasMock);
    setVentas(ventasMock);
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
        style={[styles.button, { backgroundColor: 'red' }]} 
        onPress={handleBuscar}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {vendedor && (
        <View style={styles.vendedorContainer}>
          <Text style={styles.subTitle}>Datos del Vendedor</Text>
          <Text>Nombre: {vendedor.nombre}</Text>
          <Text>Correo: {vendedor.correo}</Text>
          <Text>Celular: {vendedor.celular}</Text>
        </View>
      )}

      {totalVentas > 0 && (
        <View style={styles.totalVentasContainer}>
          <Text style={styles.subTitle}>Total de Ventas</Text>
          <Text>{totalVentas} pesos colombianos</Text>
        </View>
      )}

      {ventas.length > 0 && (
        <View style={styles.ventasContainer}>
          <Text style={styles.subTitle}>Detalle de Ventas</Text>
          {ventas.map((venta) => (
            <View key={venta.id} style={styles.venta}>
              <Text>Venta ID: {venta.id}</Text>
              <Text>Fecha: {venta.fecha}</Text>
              <Text>Producto: {venta.producto}</Text>
              <Text>Monto: ${venta.monto}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#05bcc1",
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
  vendedorContainer: {
    marginTop: 20,
  },
  totalVentasContainer: {
    marginTop: 20,
  },
  ventasContainer: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  venta: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default InformeVentasVendedor;
