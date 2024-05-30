import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ClienteInformacion = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://192.168.209.37:4000/vendedor/mostrarClientes');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Usuarios</Text>
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.numero_id ? item.numero_id.toString() : ''}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={[styles.cell, { flex: 0.2 }]}>{item.pkfk_tdoc}</Text>
                        <Text style={[styles.cell, { flex: 0.2 }]}>{item.numero_id}</Text>
                        <Text style={[styles.cell, { flex: 0.2 }]}>{item.Nombres}</Text>
                        <Text style={[styles.cell, { flex: 0.2 }]}>{item.Apellidos}</Text>
                        <Text style={[styles.cell, { flex: 0.2 }]}>{item.celular}</Text>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.headerRow}>
                        <Text style={[styles.headerCell, { flex: 0.2 }]}>Tipo Doc</Text>
                        <Text style={[styles.headerCell, { flex: 0.2 }]}>Número ID</Text>
                        <Text style={[styles.headerCell, { flex: 0.2 }]}>Nombres</Text>
                        <Text style={[styles.headerCell, { flex: 0.2 }]}>Apellidos</Text>
                        <Text style={[styles.headerCell, { flex: 0.2 }]}>Celular</Text>
                    </View>
                )}
            />
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
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#05bcc1',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: '#333',
    },
    headerRow: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#05bcc1',
        backgroundColor: '#FF6347',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ClienteInformacion;
