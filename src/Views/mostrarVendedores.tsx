import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import axios from 'axios';

interface Vendedor {
    id_usuario: number;
    Nombres: string;
    Apellidos: string;
    pkfk_tdoc: string;
    numero_id: string;
    correo: string;
    celular: string;
}

const MostrarVendedores = () => {
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [vendedorAEditar, setVendedorAEditar] = useState<Vendedor | null>(null);

    const obtenerVendedores = async () => {
        try {
            const response = await axios.get('http://192.168.209.37:4000/admin/Vendedores');
            setVendedores(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerVendedores();
    }, []);

    const editarVendedor = (vendedor: Vendedor) => {
        setVendedorAEditar(vendedor);
        setModalVisible(true);
    };

    const eliminarVendedor = async(vendedor: Vendedor) => {
        try {
            const response = await axios.put(`http://192.168.209.37:4000/admin/ElimiVendedor/${vendedor.id_usuario}`);
            console.log(response.data);
            obtenerVendedores();  // Actualizar la lista de vendedores después de la eliminación
        } catch (error) {
            console.error('Error al eliminar el vendedor:', error);
        }
    };

    const handleEditarVendedor = async() => {
        if (!vendedorAEditar) return;

        try {
            const response = await axios.put(`http://192.168.209.37:4000/admin/ActuVendedores/${vendedorAEditar.id_usuario}`, vendedorAEditar);
            console.log(response.data);
            setModalVisible(false);
            obtenerVendedores();  // Actualizar la lista de vendedores después de la edición
        } catch (error) {
            console.error('Error al actualizar el vendedor:', error);
        }
    };

    const handleCambioValor = (propiedad: string, valor: string) => {
        if (vendedorAEditar) {
            setVendedorAEditar({ ...vendedorAEditar, [propiedad]: valor });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Vendedores</Text>
            <FlatList
                data={vendedores}
                keyExtractor={(item) => item.id_usuario.toString()}
                renderItem={({ item }) => (
                    <View style={styles.vendedorContainer}>
                        <Text style={styles.vendedorText}>Tipo de Documento: {item.pkfk_tdoc}</Text>
                        <Text style={styles.vendedorText}>Número de Documento: {item.numero_id}</Text>
                        <Text style={styles.vendedorText}>Nombre Completo: {item.Nombres} {item.Apellidos}</Text>
                        <Text style={styles.vendedorText}>Correo: {item.correo}</Text>
                        <Text style={styles.vendedorText}>Celular: {item.celular}</Text>
                        <View style={styles.actionContainer}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => editarVendedor(item)}
                            >
                                <Text style={styles.actionButtonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.eliminarButton]}
                                onPress={() => eliminarVendedor(item)}
                            >
                                <Text style={styles.actionButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal visible={modalVisible} animationType="slide">
                <TouchableOpacity style={styles.viewButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.viewButtonText}>Ver Zonas</Text>
                </TouchableOpacity>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Editar Vendedor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={vendedorAEditar?.Nombres}
                        onChangeText={(text) => handleCambioValor('Nombres', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        value={vendedorAEditar?.Apellidos}
                        onChangeText={(text) => handleCambioValor('Apellidos', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de Documento"
                        value={vendedorAEditar?.pkfk_tdoc}
                        onChangeText={(text) => handleCambioValor('pkfk_tdoc', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número de Documento"
                        value={vendedorAEditar?.numero_id}
                        onChangeText={(text) => handleCambioValor('numero_id', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        value={vendedorAEditar?.correo}
                        onChangeText={(text) => handleCambioValor('correo', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Celular"
                        value={vendedorAEditar?.celular}
                        onChangeText={(text) => handleCambioValor('celular', text)}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleEditarVendedor}>
                        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    vendedorContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
    },
    vendedorText: {
        fontSize: 16,
        marginBottom: 5,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#05bcc1',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 5,
    },
    eliminarButton: {
        backgroundColor: '#ff4d4d',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    saveButton: {
        backgroundColor: '#05bcc1',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
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

export default MostrarVendedores;