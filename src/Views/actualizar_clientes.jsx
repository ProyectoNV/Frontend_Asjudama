import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Button, Alert } from "react-native";
import axios from "axios";

export const HistorialUser = () => {

    const [Historial, setHistorial] = useState({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        correo: '',
        celular: '',
        estado: '',
    });

    const handleChange = (value, name) => {
        if (name === 'numero_id' || name === 'celular') {
            if (value !== '' && !/^\d+$/.test(value)) {
                return;
            }
        }

        setHistorial({ ...Historial, [name]: value });
    };

    const handleSubmit = async () => {
        if (Historial.Nombres.trim().split(/\s+/).length < 1 || Historial.Apellidos.trim().split(/\s+/).length < 2) {
            showAlert("Caracteres insuficientes", "Por favor, ingresa los nombres completos.");
            return;
        }
        if (!Historial.Nombres || !Historial.Apellidos || !Historial.correo || !Historial.celular ) {
            showAlert("Campos requeridos", "Por favor, completa todos los campos.");
            return;
        }
        if (Historial.numero_id.length < 7) {
            showAlert("Número de identificación inválido", "El número de identificación debe tener al menos 7 caracteres.");
            return;
        }

        try {
            const respuesta = await axios.put(`http://192.168.209.37:4000/vendedor/actualizarClientes`, Historial);
            if (respuesta.status === 200) {
                setHistorial({
                    pkfk_tdoc: '',
                    numero_id: '',
                    Nombres: '',
                    Apellidos: '',
                    correo: '',
                    celular: '',
                    estado: '',
                });
                showAlert("Actualización exitosa", "", "success");
            }
        } catch (error) {
            showAlert("Error", "Error al actualizar cliente");
            console.error(`Error al actualizar cliente, ${error}`);
        }
    };

    const handleEstado = async () => {
        try {
            const respuesta = await axios.put(`http://192.168.209.37:4000/vendedor/actualizarEstado/${Historial.numero_id}`, { estado: (Historial.estado) === 0 ? 1 : 0 });
            if (respuesta.status === 200) {
                setHistorial({
                    pkfk_tdoc: '',
                    numero_id: '',
                    Nombres: '',
                    Apellidos: '',
                    correo: '',
                    celular: '',
                    estado: '',
                });
                showAlert("Actualización exitosa", "¡Cliente actualizado correctamente!", "success");
            }
        } catch (error) {
            showAlert("Error", "Error al actualizar cliente");
            console.error(`Error al actualizar cliente, ${error}`);
        }
    };

    const handleBuscar = async () => {
        try {
            const respuesta = await axios.get(`http://192.168.209.37:4000/vendedor/consultar_id/${Historial.numero_id}`);
            if (respuesta.status === 200) {
                setHistorial(respuesta.data);
            } else {
                showAlert("Error", "No se encontraron datos para el cliente");
            }
        } catch (error) {
            showAlert("Error", "Ingrese un numero de identificacion valido");
            console.error(`Error al obtener datos del cliente, ${error}`);
        }
    };

    const showAlert = (title, message, type = "error") => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };


    return (
        <ScrollView style={[styles.infoText, { marginTop: 100 }]}>
            <Text style={styles.title}>Historial de Usuario</Text>
            <View style={styles.buscar}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleChange(value, 'numero_id')} // Cambiado
                    value={Historial.numero_id}
                    placeholder="Ingrese número de documento del cliente"
                    required
                />
                <TouchableOpacity style={styles.buscarIcon} onPress={handleBuscar}>
                    <Image source={require('../../imagenes/Buscar.png')} style={styles.buscarImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.contInfo}>
                <Text style={styles.infoTitle}>Actualizar cliente</Text>
                <View style={styles.infoForm}>
                    <Text>Nombres</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, 'Nombres')}
                        value={Historial.Nombres}
                    />
                    <Text>Apellidos</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange( value, 'Apellidos')}
                        value={Historial.Apellidos}
                    />
                    <Text>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, 'correo')}
                        value={Historial.correo}
                        keyboardType="email-address"
                    />
                    <Text>Número de Celular</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, 'celular')}
                        value={Historial.celular}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
            <View style={styles.botones}>
                <TouchableOpacity style={styles.buttonFormu} onPress={handleSubmit}>
                    <Text>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFormu} onPress={handleEstado}>
                    <Text>Cambiar Estado</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf3ec', 
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#05bcc1', // Azul
        textAlign: 'center',
    },
    buscar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buscarIcon: {
        marginLeft: 10,
        padding: 10,
    },
    buscarImage: {
        width: 20,
        height: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    infoText: {
        paddingHorizontal: 20,
    },
    contInfo: {
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoForm: {
        marginBottom: 20,
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    buttonFormu: {
        backgroundColor: '#FF6347', // Azul
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonFormuText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});    

export default HistorialUser;
