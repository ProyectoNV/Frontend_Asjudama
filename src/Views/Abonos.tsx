import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ClienteData {
    Nombres: string;
    Apellidos: string;
    correo: string;
    celular: string;
    direccion: string;
}

const RegisterAbono = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [abonos, setAbonos] = useState([]);
    const [factupaga, setFactupaga] = useState([]);
    const [idclient, setIdclient] = useState("");
    const [tdoc, setTdoc] = useState("");
    const [clienteData, setClienteData] = useState<ClienteData | null>(null);
    const [vendedorid, setVendedorid] = useState(null);

    const obtenerVendedorId = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('sesionusuario');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                setVendedorid(parsedUserData.id);
            }
        } catch (error) {
            console.error('Error al obtener vendedor_id:', error);
        }
    };

    const handleBuscar = async () => {
        if (idclient && tdoc) {
            try {
                const response = await fetch(`http://192.168.209.37:4000/vendedor/buscar_factura_cliente_vendedor/${vendedorid}/${tdoc}/${idclient}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const databonos = await response.json();
                setAbonos(databonos);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleBuscarpaga = async () => {
        if (idclient && tdoc) {
            try {
                const response = await fetch(`http://192.168.209.37:4000/vendedor/buscar_facturapaga_cliente_vendedor/${vendedorid}/${tdoc}/${idclient}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const databonos = await response.json();
                setFactupaga(databonos);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const ObtenerClienteData = async () => {
        if (idclient && tdoc) {
            try {
                const response = await fetch(`http://192.168.209.37:4000/vendedor/datosCliente/${idclient}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClienteData(data.cliente);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        obtenerVendedorId();
        ObtenerClienteData();
        handleBuscar();
        handleBuscarpaga();
        
    }, [idclient, tdoc]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Registrar Abonos a Facturas</Text>
                <View style={styles.buscar}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTdoc(text)}
                        value={tdoc}
                        placeholder="Ingrese tipo de documento del cliente"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setIdclient(text)}
                        value={idclient}
                        placeholder="Ingrese número de documento del cliente"
                    />
                    <TouchableOpacity style={styles.buscarIcon} onPress={() => { handleBuscar(); handleBuscarpaga(); ObtenerClienteData(); }}>
                        <Image source={require('../../imagenes/Buscar.png')} style={styles.buscarImage} />
                    </TouchableOpacity>
                </View>
                {clienteData && (
                    <View style={styles.clienteInfo}>
                        <Text style={styles.clienteText}>Nombre: {clienteData.Nombres} {clienteData.Apellidos}</Text>
                        <Text style={styles.clienteText}>Correo: {clienteData.correo}</Text>
                        <Text style={styles.clienteText}>Celular: {clienteData.celular}</Text>
                        <Text style={styles.clienteText}>Dirección: {clienteData.direccion}</Text>
                    </View>
                )}
                <Text style={styles.title}>Facturas Pendientes</Text>
                <View>
                    {abonos.map((abon: { numero_factura_venta: number; fecha_factura: string; total_factura: number; estado_factura: number }) => (
                        <View key={abon.numero_factura_venta} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Numero: {abon.numero_factura_venta}</Text>
                            <Text style={styles.zoneText}>Valor: {abon.total_factura}</Text>
                            <Text style={styles.zoneText}>Fecha: {formatDate(abon.fecha_factura)}</Text>
                            <Text style={styles.zoneText}>Estado: Pendiente</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AgregarAbono', { id_factu: abon.numero_factura_venta, valor_factu: abon.total_factura, celularclient: clienteData?.celular ?? '' })} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Hacer Abono</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <Text style={styles.title}>Facturas Pagas</Text>
                <View>
                    {factupaga.map((paga: { numero_factura_venta: number; fecha_factura: string; total_factura: number; estado_factura: number }) => (
                        <View key={paga.numero_factura_venta} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Numero: {paga.numero_factura_venta}</Text>
                            <Text style={styles.zoneText}>Valor: {paga.total_factura}</Text>
                            <Text style={styles.zoneText}>Fecha: {formatDate(paga.fecha_factura)}</Text>
                            <Text style={styles.zoneText}>Estado: Paga</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AgregarAbono', { id_factu: paga.numero_factura_venta, valor_factu: paga.total_factura, celularclient: clienteData?.celular ?? '' })} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Hacer Abono</Text>
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
        color: '#05bcc1',
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
        marginRight: 10, // Para dar espacio entre los inputs
    },
    clienteInfo: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
    },
    clienteText: {
        fontSize: 18,
        color: '#333',
    },
});

export default RegisterAbono;
