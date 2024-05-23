import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Views/Login';
import RegisterProduct from './src/Views/Registro_producto';

export type RootStackParamList = {
  LoginScreen: { estado: boolean };
  RegisterProduct: { estado: boolean };
  // Agrega más pantallas aquí según sea necesario
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#05bcc1', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false,  // Oculta la barra de navegación en la pantalla de inicio de sesión
          }}
          initialParams={{ estado: false }}
        />
        <Stack.Screen
          name="RegisterProduct"
          component={RegisterProduct}
          options={{
            title: 'Registrar Productos',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
