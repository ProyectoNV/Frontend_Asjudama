import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from "react-native";
import axios from "axios";

interface Historial {
    pkfk_tdoc: string;
    numero_id: string;
    Nombres: string;
    Apellidos: string;
    correo: string;
    celular: string;
    estado: string | number;
}

const HistorialUser: React.FC = () => {

    const [Historial, setHistorial] = useState<Historial>({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        correo: '',
        celular: '',
        estado: '',
    });

    const handleChange = (value: string, name: keyof Historial) => {
        let newValue = value;
        if (name === 'Nombres' || name === 'Apellidos') {
            newValue = value.replace(/[^a-zA-Z\s]/g, ''); // Permitir solo letras y espacios
        } else if (name === 'celular') {
            newValue = value.replace(/\D/g, ''); // Permitir solo números
        }

        setHistorial({ ...Historial, [name]: newValue });
    };

    const handleSubmit = async () => {
        if (!Historial.Nombres || !Historial.Apellidos || !Historial.correo || !Historial.celular || !Historial.numero_id ) {
            showAlert("Campos requeridos", "Por favor, completa todos los campos.");
            return;
        }
        if (Historial.Nombres.trim().split(/\s+/).length < 1 || Historial.Apellidos.trim().split(/\s+/).length < 2) {
            showAlert("Caracteres insuficientes", "Por favor, ingresa los nombres completos.");
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(Historial.Nombres) || !/^[a-zA-Z\s]+$/.test(Historial.Apellidos)) {
            showAlert("Error", "Los campos de nombre y apellidos deben contener solo letras y espacios.");
            return;
        }
        if (!/^\d+$/.test(Historial.numero_id) || !/^\d+$/.test(Historial.celular)) {
            showAlert("Error", "Los campos de número de documento y número de celular deben contener solo números.");
            return;
        }
        if (!/@/.test(Historial.correo)) {
            showAlert("Error", "El campo de correo electrónico debe contener un @.");
            return;
        }

        try {
            const respuesta = await axios.put(`http://192.168.1.59:4000/vendedor/actualizarClientes`, Historial);
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
        const nuevoEstado = Historial.estado === '1' ? '0' : '1'; // Cambia el estado actual
        try {
            const respuesta = await axios.put(`http://192.168.1.59:4000/vendedor/actualizarEstado/${Historial.numero_id}`, { estado: nuevoEstado });
            if (respuesta.status === 200) {
                setHistorial({
                    pkfk_tdoc: '',
                    numero_id: '',
                    Nombres: '',
                    Apellidos: '',
                    correo: '',
                    celular: '',
                    estado: '', // Limpiar el formulario
                });
                showAlert("Actualización exitosa", "¡Estado del cliente actualizado correctamente!", "success");
            }
        } catch (error) {
            showAlert("Error", "Error al actualizar el estado del cliente");
            console.error(`Error al actualizar el estado del cliente, ${error}`);
        }
    };
    

    const handleBuscar = async () => {
        try {
            const respuesta = await axios.get(`http://192.168.1.59:4000/vendedor/consultar_id/${Historial.numero_id}`);
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

    const showAlert = (title: string, message: string, type: string = "error") => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };

    return (
        <ScrollView style={[styles.infoText, { marginTop: 100 }]}>
            <Text style={styles.title}>Actualizar clientes</Text>
            <View style={styles.buscar}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleChange(value, 'numero_id')}
                    value={Historial.numero_id}
                    placeholder="Ingrese número de documento del cliente"
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
                        onChangeText={(value) => handleChange(value, 'Apellidos')}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf3ec', // Fondo rosa
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
        flex: 1,
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
