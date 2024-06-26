import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput , Alert, Linking} from 'react-native';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const AgregarAbono = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'AgregarAbono'>>();
    const { id_factu, valor_factu, celularclient} = route.params;
    const [listUpdated, setListUpdated] = useState(false);
    const [listabonos, setListabonos] = useState([]);
    const [valorAbono, setValorAbono] = useState("");

    useEffect(() => {
        const BuscarAbonos = async () => {
            try {
                const getlistabonos = await fetch(`http://192.168.209.37:4000/vendedor/buscar_abono/${id_factu}`);
                const datalistabonos = await getlistabonos.json();
                setListabonos(datalistabonos);
            } catch (error) {
                console.log(error);
            }
        };
        BuscarAbonos();
        setListUpdated(false);
    }, [listUpdated]);

    const EnviarMensaje = (phoneNumber: string, text: string) => {
        const link = `https://wa.me/${phoneNumber}?text=${text}`
        Linking.canOpenURL(link).then((supported) => {
            if (!supported){
                Alert.alert("Por favor instale Whatsapp para enviar un mensaje directo")
                return
            }
            return Linking.openURL(link)
        })
        
    }

    const handleRegistrarAbono = async () => {
        if (!valorAbono) {
            console.log("El campo valor abono es obligatorio");
            return;
        }

        try {
            const response = await fetch('http://192.168.209.37:4000/vendedor/registro_abono', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numero_factura: id_factu, valor_abono: valorAbono }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400 && errorData.error === "La factura ya está pagada") {
                    Alert.alert(
                        "Error",
                        "La factura ya está pagada y no se puede registrar un nuevo abono.",
                        [{ text: "OK" }]
                    );
                } else {
                    throw new Error('Error en la solicitud');
                }
                return;
            }
    
            const result = await response.json();
            console.log(result.message);
    
            // Limpiar el campo
            setValorAbono("");
   
            // Actualizar la lista de abonos
            setListUpdated(true);

            // Formatear y enviar el mensaje
            const mensaje = `*Asjudama* le informa del registro de un abono con valor de *${valorAbono}* a su factura número *${id_factu}* que tiene un valor neto de *${valor_factu}*`;

            EnviarMensaje(`57${celularclient}`, mensaje);

        
        } catch (error) {
            console.log('Error al registrar el abono:', error);
        }
    };
    

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <ScrollView>
            <Text style={styles.title}>Registrar Abono</Text>
            <View>
                <TextInput
                    placeholder="Valor Abono"
                    keyboardType="numeric"
                    value={valorAbono}
                    onChangeText={setValorAbono}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.buttonregis} onPress={handleRegistrarAbono}>
                    <Text style={styles.buttonText}>Registrar Abono</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.titlei}>Abonos de la Factura</Text>
                <View>
                    {listabonos.map((abono: { id_abono: number; numero_factura_abono: number; valor_abono: string; fecha_abono: string}, index) => (
                        <View key={abono.id_abono} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Abono Numero: {index + 1}</Text>
                            <Text style={styles.zoneText}>Valor: {abono.valor_abono}</Text>
                            <Text style={styles.zoneText}>Fecha: {formatDate(abono.fecha_abono)}</Text>
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
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: '#05bcc1',
    },
    titlei: {
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
    input: {
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginLeft: 60,
        backgroundColor: '#fff',
        flex: 1,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#FF6347',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonregis: {
        width: '40%',
        marginLeft: '30%',
        backgroundColor: '#FF6347',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        textAlign: 'center',
    },
});

export default AgregarAbono;
