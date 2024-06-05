import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Define the Product type
type Product = {
    id_producto: number;
    nombre_producto: string;
    // Add other properties if needed
};

const Facturas = () => {
    const [numeroDocumentoCliente, setNumeroDocumentoCliente] = useState('');
    const [productos, setProductos] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [cantidadProducto, setCantidadProducto] = useState<string>('');
    const [productosSeleccionados, setProductosSeleccionados] = useState<(Product & { cantidad: number })[]>([]);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://192.168.209.37:4000/admin/ver_productos');
            const data: Product[] = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const agregarProducto = () => {
        if (selectedProduct && parseInt(cantidadProducto) > 0) {
            const producto = productos.find(prod => prod.id_producto === parseInt(selectedProduct));
            if (producto) {
                setProductosSeleccionados([...productosSeleccionados, { ...producto, cantidad: parseInt(cantidadProducto) }]);
                setSelectedProduct('');
                setCantidadProducto('');
            }
        }
    };

    const handleRegistrarFactura = async () => {
        try {
            const facturaData = {
                numero_documento_cliente: numeroDocumentoCliente,
                vendedor_id: '2',
                productos: productosSeleccionados.map(p => ({ id: p.id_producto, cantidad: p.cantidad })),
            };

            const response = await fetch('http://192.168.209.37:4000/vendedor/regisFactura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(facturaData)
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                Alert.alert('¡Éxito!', 'Factura registrada exitosamente');
            }
        } catch (error) {
            console.error('Error al registrar factura:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Ver Facturas</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Registro de Factura</Text>
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Documento del Cliente:</Text>
                    <TextInput
                        style={styles.input}
                        value={numeroDocumentoCliente}
                        onChangeText={setNumeroDocumentoCliente}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Producto:</Text>
                    <Picker
                        style={[styles.input, styles.picker]}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
                    >
                        {productos.map(producto => (
                            <Picker.Item key={producto.id_producto} label={producto.nombre_producto} value={producto.id_producto.toString()} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={cantidadProducto}
                        onChangeText={setCantidadProducto}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={agregarProducto}>
                    <Text style={styles.addButtonText}>Agregar Producto</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegistrarFactura}>
                <Text style={styles.buttonText}>Registrar Factura</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flex: 1,
    },
    picker: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#05bcc1',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

export default Facturas;
