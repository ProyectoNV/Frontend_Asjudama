import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import axios from 'axios';

interface Cliente {
    id_usuario: number;
    Nombres: string;
    Apellidos: string;
    pkfk_tdoc: string;
    numero_id: string;
    correo: string;
    celular: string;
}

const MostrarClientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [clienteAEditar, setClienteAEditar] = useState<Cliente | null>(null);

    const obtenerClientes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/Clientes');
            setClientes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    const editarCliente = (cliente: Cliente) => {
        setClienteAEditar(cliente);
        setModalVisible(true);
    };

    const eliminarCliente = async(cliente:Cliente) => {
        try {
            const response = await axios.put(`http://localhost:4000/admin/ElimiCliente/${cliente.id_usuario}`);
            console.log(response.data);
            obtenerClientes();  // Actualizar la lista de vendedores después de la eliminación
        } catch (error) {
            console.error('Error al eliminar el vendedor:', error);
        }
    };

    const handleEditarVendedor = async() => {
        if (!clienteAEditar) return;

        try {
            const response = await axios.put(`http://localhost:4000/admin/ActuClientes/${clienteAEditar.id_usuario}`, clienteAEditar);
            console.log(response.data);
            setModalVisible(false);
            obtenerClientes();  // Actualizar la lista de vendedores después de la edición
        } catch (error) {
            console.error('Error al actualizar el vendedor:', error);
        }
    };

    const handleCambioValor = (propiedad: string, valor: string) => {
        if (clienteAEditar) {
            setClienteAEditar({ ...clienteAEditar, [propiedad]: valor });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Clientes</Text>
            <FlatList
                data={clientes}
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
                                onPress={() => editarCliente(item)}
                            >
                                <Text style={styles.actionButtonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.eliminarButton]}
                                onPress={() => eliminarCliente(item)}
                            >
                                <Text style={styles.actionButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Editar Cliente</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={clienteAEditar?.Nombres}
                        onChangeText={(text) => handleCambioValor('Nombres', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        value={clienteAEditar?.Apellidos}
                        onChangeText={(text) => handleCambioValor('Apellidos', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de Documento"
                        value={clienteAEditar?.pkfk_tdoc}
                        onChangeText={(text) => handleCambioValor('pkfk_tdoc', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número de Documento"
                        value={clienteAEditar?.numero_id}
                        onChangeText={(text) => handleCambioValor('numero_id', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        value={clienteAEditar?.correo}
                        onChangeText={(text) => handleCambioValor('correo', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Celular"
                        value={clienteAEditar?.celular}
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
});

export default MostrarClientes;