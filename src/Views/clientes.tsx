import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import axios from 'axios';

interface Usuario {
    pkfk_tdoc: string;
    numero_id: number;
    Nombres: string;
    Apellidos: string;
    celular: string;
}

const ClienteInformacion: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get<Usuario[]>('http://192.168.209.37:4000/vendedor/mostrarClientes');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const handleActualizarClientes = () => {
        fetchUsuarios();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Clientes</Text>
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.numero_id ? item.numero_id.toString() : ''}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.text}>Tipo Doc: {item.pkfk_tdoc}</Text>
                        <Text style={styles.text}>Número ID: {item.numero_id}</Text>
                        <Text style={styles.text}>Nombres: {item.Nombres}</Text>
                        <Text style={styles.text}>Apellidos: {item.Apellidos}</Text>
                        <Text style={styles.text}>Celular: {item.celular}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistorialUser', { estado: true })}>
                <Text style={styles.buttonText}>Actualizar Clientes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf3ec',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#05bcc1',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 35,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#FF6347',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#05bcc1',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default ClienteInformacion;
