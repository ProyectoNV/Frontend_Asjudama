// LogoutScreen.tsx
import React, { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        navigation.navigate('LoginScreen', { estado: false });
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };

    clearAsyncStorage();
  }, [navigation]);

  return null; // No se renderiza nada
};

export default LogoutScreen;
