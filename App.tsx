import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Views/Login';
import RegisterProduct from './src/Views/Registro_producto';
import RegisterAbono from './src/Views/Abonos';
import LogoutScreen from './src/Views/LogoutScreen';
import InformeClientes from './src/Views/InformeClientes';
import InformeVentasVendedor from './src/Views/InformeVentasVendedor';
import RegistrarVendedor from './src/Views/RegistrarVendedor';
import Icon from 'react-native-vector-icons/Ionicons';

export type RootStackParamList = {
  LoginScreen: { estado: boolean };
  RegisterProduct: { estado: boolean };
  RegisterAbono: { estado: boolean };
  InformeVentasVendedor: {estado: boolean};
  InformeClientes: {estado: boolean};
  RegistrarVendedor: {estado: boolean};
  MainTabsAdmi: undefined;
  MainTabsVende: undefined;
  ProductStack: undefined;
  AbonoStack: undefined;
  Logout: undefined; 

};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const ProductStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisterProduct" component={RegisterProduct} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="InformeVentasVendedor" component={InformeVentasVendedor} />
    <Stack.Screen name="InformeClientes" component={InformeClientes} />
    <Stack.Screen name="RegistrarVendedor" component={RegistrarVendedor} />
  </Stack.Navigator>
);

const AbonoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisterAbono" component={RegisterAbono} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>
);

const MainTabsAdmi = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#05bcc1',
      tabBarInactiveTintColor: '#888',
      headerStyle: {
        backgroundColor: '#05bcc1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen
      name="ProductStack"
      component={ProductStack}
      options={{
        title: 'Registrar Productos',
        tabBarLabel: 'Registrar Productos',
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={LogoutScreen}
      options={{
        title: 'Cerrar Sesión',
        tabBarLabel: 'Cerrar Sesión',
        tabBarIcon: ({ color, size }) => (
          <Icon name="log-out-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="InformeVentasVendedor"
      component={InformeVentasVendedor}
      options={{
        title: 'Informe de Ventas por Vendedor',
        tabBarLabel: 'Informe de Ventas por Vendedor',
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="InformeClientes"
      component={InformeClientes}
      options={{
        title: 'Informe de Clientes',
        tabBarLabel: 'Informe de Clientes',
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="RegistrarVendedor"
      component={RegistrarVendedor}
      options={{
        title: 'Registrar Vendedores',
        tabBarLabel: 'Registrar Vendedores',
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainTabsVende = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#05bcc1',
      tabBarInactiveTintColor: '#888',
      headerStyle: {
        backgroundColor: '#05bcc1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen
      name="AbonoStack"
      component={AbonoStack}
      options={{
        title: 'Registrar Abonos',
        tabBarLabel: 'Registrar Abonos',
        tabBarIcon: ({ color, size }) => (
          <Icon name="add-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={LogoutScreen}
      options={{
        title: 'Cerrar Sesión',
        tabBarLabel: 'Cerrar Sesión',
        tabBarIcon: ({ color, size }) => (
          <Icon name="log-out-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTabsAdmi" component={MainTabsAdmi} />
        <Stack.Screen name="MainTabsVende" component={MainTabsVende} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
