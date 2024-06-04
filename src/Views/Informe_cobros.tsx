import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from "react-native";
import axios from "axios";

interface Abono {
    id_abono: string;
    valor_abono: number;
    fecha_abono: string;
    numero_factura: string;
}

interface InformeCobros {
    numero_id: string;
    total_cobrado: number;
    fecha: string;
    nombres_vendedor: string;
    apellidos_vendedor: string;
    numero_identificacion: string;
    abonos: Abono[];
}

const InformeCobros: React.FC = () => {
    const [informeDiario, setInformeDiario] = useState<InformeCobros>({
        numero_id: '',
        total_cobrado: 0,
        fecha: '',
        nombres_vendedor: '',
        apellidos_vendedor: '',
        numero_identificacion: '',
        abonos: [],
    });

    const [informeMensual, setInformeMensual] = useState<InformeCobros>({
        numero_id: '',
        total_cobrado: 0,
        fecha: '',
        nombres_vendedor: '',
        apellidos_vendedor: '',
        numero_identificacion: '',
        abonos: [],
    });

    const [loading, setLoading] = useState(false);
    const [isMensual, setIsMensual] = useState(false); // Estado para manejar el tipo de informe

    const handleChange = (value: string, name: keyof InformeCobros) => {
        if (isMensual) {
            setInformeMensual({ ...informeMensual, [name]: value });
        } else {
            setInformeDiario({ ...informeDiario, [name]: value });
        }
    };

    const handleBuscar = async () => {
        setLoading(true);
        try {
            const fechaActual = new Date().toISOString(); // Obtener la fecha actual en formato ISO 8601
            const numero_id = isMensual ? informeMensual.numero_id : informeDiario.numero_id;
            const endpoint = isMensual ? 'informemensual' : 'informediario';
            const respuesta = await axios.get(`http://192.168.1.59:4000/vendedor/${endpoint}/${numero_id}`, {
                params: {
                    fechaActual: fechaActual
                }
            });
            if (respuesta.status === 200) {
                const data = respuesta.data[0];
                const informe = {
                    ...data,
                    abonos: data.abonos || []
                };
                if (isMensual) {
                    setInformeMensual(informe);
                } else {
                    setInformeDiario(informe);
                }
                console.log("Datos recibidos: ", data); // Mensaje de depuración
            } else {
                showAlert("Error", "No se pudo obtener el informe de cobros");
            }
        } catch (error) {
            showAlert("Error", "Ocurrió un error al obtener el informe de cobros");
            console.error(`Error al obtener informe de cobros: ${error}`);
        } finally {
            setLoading(false);
        }
    };
    

    const showAlert = (title: string, message: string) => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };

    const formatFecha = (fecha: string) => {
        const date = new Date(fecha);
        return isNaN(date.getTime()) ? "Fecha no válida" : date.toLocaleDateString();
    };

    const informe = isMensual ? informeMensual : informeDiario;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Informe de Cobros</Text>
            <View style={styles.buscar}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleChange(value, 'numero_id')}
                    value={informe.numero_id}
                    placeholder="Ingrese número de identificación del vendedor"
                />
                <TouchableOpacity style={styles.buscarIcon} onPress={handleBuscar}>
                    <Image source={require('../../imagenes/Buscar.png')} style={styles.buscarImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, !isMensual && styles.activeButton]}
                    onPress={() => setIsMensual(false)}
                >
                    <Text style={styles.toggleText}>Diario</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, isMensual && styles.activeButton]}
                    onPress={() => setIsMensual(true)}
                >
                    <Text style={styles.toggleText}>Mensual</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoForm}>
                {loading ? (
                    <Text>Cargando...</Text>
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Información del Vendedor</Text>
                        <Text>Nombre: {informe.nombres_vendedor}</Text>
                        <Text>Apellidos: {informe.apellidos_vendedor}</Text>
                        <Text>Número de Identificación: {informe.numero_identificacion}</Text>
                        <Text>Fecha: {formatFecha(informe.fecha)}</Text>
                        <Text>Total Cobrado: {informe.total_cobrado}</Text>
                        <Text style={styles.abonoTitle}>Abonos:</Text>
                        {informe.abonos.length > 0 ? (
                            informe.abonos.map((abono, index) => (
                                <View key={index} style={styles.abonoCard}>
                                    <Text style={styles.abonoTitle}>Abono {index + 1}</Text>
                                    <Text>ID Abono: {abono.id_abono}</Text>
                                    <Text>Valor Abono: {abono.valor_abono}</Text>
                                    <Text>Fecha Abono: {formatFecha(abono.fecha_abono)}</Text>
                                    <Text>Número Factura: {abono.numero_factura}</Text>
                                </View>
                            ))
                        ) : (
                            <Text>No hay abonos disponibles.</Text>
                        )}
                    </View>
                )}
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
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        backgroundColor: '#ccc',
    },
    activeButton: {
        backgroundColor: '#05bcc1',
    },
    toggleText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    infoForm: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    abonoCard: {
        backgroundColor: '#e0f7fa', // Fondo claro para los abonos
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    abonoTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default InformeCobros;
