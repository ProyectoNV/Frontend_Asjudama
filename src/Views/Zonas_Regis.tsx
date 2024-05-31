import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../App';

//winterface Props extends StackScreenProps<RootStackParamList, "> {}

const lista_Zona = () => {

    const [listUpdated, setListUpdated] = useState(false);
    const [zonass, setZonass] = useState([]);
    const [zonassi, setZonassi] = useState([]);

    useEffect(() => {
        const listZona = async () => {
            try {
                const getzona = await fetch('http://192.168.1.103:4000/admin/ver_zona');
                const datazona = await getzona.json();
                setZonass(datazona);
            } catch (error) {
                console.log(error);
            }
        };

        const listZonasi = async () => {
            try {
                const getzonasi = await fetch('http://192.168.1.103:4000/admin/ver_zona_I');
                const datazonasi = await getzonasi.json();
                setZonassi(datazonasi);
            } catch (error) {
                console.log(error);
            }
        };

        listZona();
        listZonasi();
        setListUpdated(false);
    }, [listUpdated]);

    const CambiarEstadoZ = async (id_zona: number) => {
        try {
            const response = await fetch(`http://192.168.1.103:4000/admin/actualizar/${id_zona}`, {
                method: 'PUT',
            });

            if (response.ok) {
                console.log('El producto se actualizó exitosamente');
            }
        } catch (error) {
            console.error('Error al actualizar la zona ', error);
        }
        setListUpdated(true);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Zonas Activas</Text>
                <View>
                    {zonass.map((zone: { id_zona: number; nombre_zona: string; descripcion_zona: string; ubicacion_zona: string;tipo_zona: string; estado_zona: number }) => (
                        <View key={zone.id_zona} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Nombre: {zone.nombre_zona}</Text>
                            <Text style={styles.zoneText}>Descripción: {zone.descripcion_zona}</Text>
                            <Text style={styles.zoneText}>Ubicación: {zone.ubicacion_zona}</Text>
                            <Text style={styles.zoneText}>Tipo: {zone.tipo_zona}</Text>
                             <Text style={styles.zoneText}>Estado zona: Activa</Text>
                            <TouchableOpacity onPress={() => CambiarEstadoZ(zone.id_zona)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Cambiar Estado</Text>
                            </TouchableOpacity>
                        </View>


                    ))}
                </View>
                <Text style={styles.title}>Zonas Inactivas</Text>
                <View>
                {zonassi.map((zonen: { id_zona: number; nombre_zona: string; descripcion_zona: string; ubicacion_zona: string;tipo_zona: string; estado_zona: number }) => (
                        <View key={zonen.id_zona} style={styles.zoneContainer}>
                            <Text style={styles.zoneText}>Nombre: {zonen.nombre_zona}</Text>
                            <Text style={styles.zoneText}>Descripción: {zonen.descripcion_zona}</Text>
                            <Text style={styles.zoneText}>Ubicación: {zonen.ubicacion_zona}</Text>
                            <Text style={styles.zoneText}>Tipo: {zonen.tipo_zona}</Text>
                             <Text style={styles.zoneText}>Estado zona: Activa</Text>
                            <TouchableOpacity onPress={() => CambiarEstadoZ(zonen.id_zona)} style={styles.deleteButton}>
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

export default lista_Zona;
