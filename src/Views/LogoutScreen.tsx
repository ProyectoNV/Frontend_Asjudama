// LogoutScreen.tsx
import React, { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Asegúrate de importar correctamente

const LogoutScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.navigate('LoginScreen', { estado: false });
  }, [navigation]);

  return null; // No necesita renderizar nada
};

export default LogoutScreen;
