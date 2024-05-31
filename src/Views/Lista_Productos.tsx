import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const Productos_Lista = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [listUpdated, setListUpdated] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productosi, setProductosi] = useState([]);
    
    useEffect(() => {
        const listProducts = async () => {
            try {
                const getproducts = await fetch('http://192.168.209.37:4000/admin/ver_productos');
                const dataproducts = await getproducts.json();
                setProductos(dataproducts);
            } catch (error) {
                console.log(error);
            }
        };
        const listProductsi = async () => {
            try {
                const getproductsi = await fetch('http://192.168.209.37:4000/admin/ver_productos_I');
                const dataproductsi = await getproductsi.json();
                setProductosi(dataproductsi);
            } catch (error) {
                console.log(error);
            }
        };
        listProducts();
        listProductsi();
        setListUpdated(false);
    }, [listUpdated]);

    const CambiarEstadoP = async (id_producto: number) => {
        try {
            const response = await fetch(`http://192.168.209.37:4000/admin/estado_producto/${id_producto}`, {
                method: 'PUT',
            });

            if (response.ok) {
                console.log('El producto se actualizó exitosamente');
            }
        } catch (error) {
            console.error('Error al actualizar el producto', error);
        }
        setListUpdated(true);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Productos Activos</Text>
                <View>
                    {productos.map((product: { id_producto: number; nombre_producto: string; descripcion_producto: string; valor_unitario: number; estado_producto: number }) => (
                        <View key={product.id_producto} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Nombre: {product.nombre_producto}</Text>
                            <Text style={styles.zoneText}>Valor: {product.valor_unitario}</Text>
                            <Text style={styles.zoneText}>Descripción: {product.descripcion_producto}</Text>
                            <Text style={styles.zoneText}>Estado: {product.estado_producto}</Text>
                            <TouchableOpacity onPress={() => CambiarEstadoP(product.id_producto)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Cambiar Estado</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ActualizarProduct', { id_producto: product.id_producto })} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Actualizar</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <Text style={styles.title}>Productos Inactivos</Text>
                <View>
                    {productosi.map((producti: { id_producto: number; nombre_producto: string; descripcion_producto: string; valor_unitario: number; estado_producto: number }) => (
                        <View key={producti.id_producto} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Nombre: {producti.nombre_producto}</Text>
                            <Text style={styles.zoneText}>Valor: {producti.valor_unitario}</Text>
                            <Text style={styles.zoneText}>Descripción: {producti.descripcion_producto}</Text>
                            <Text style={styles.zoneText}>Estado: {producti.estado_producto}</Text>
                            <TouchableOpacity onPress={() => CambiarEstadoP(producti.id_producto)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Cambiar Estado</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#85C1E9',
    },
    zoneContainer: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
    },
    zoneText: {
        fontSize: 18,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Productos_Lista;
