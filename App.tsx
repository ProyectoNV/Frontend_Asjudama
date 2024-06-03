import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Views/Login';
import RegisterProduct from './src/Views/Registro_producto';
import Productos_Lista from './src/Views/Lista_Productos';
import ActualizarProduct from './src/Views/Actualizar_productos';
import RegisterAbono from './src/Views/Abonos';
import LogoutScreen from './src/Views/LogoutScreen';
import InformeClientes from './src/Views/InformeClientes';
import InformeVentasVendedor from './src/Views/InformeVentasVendedor';
import HistorialUser from './src/Views/actualizar_clientes';
import ClienteInformacion from './src/Views/clientes';
import Registrofor from './src/Views/Registrar_zona';
import lista_Zona from './src/Views/Zonas_Regis';
import RegisterForm from './src/Views/registro_cliente';
import RegistrarVendedor from './src/Views/RegistrarVendedor';
import Icon from 'react-native-vector-icons/Ionicons';

export type RootStackParamList = {
  LoginScreen: { estado: boolean };
  RegisterProduct: { estado: boolean };
  Productos_Lista: {estado: boolean};
  ActualizarProduct: {id_producto: number};
  RegisterAbono: { estado: boolean };
  InformeVentasVendedor: {estado: boolean};
  InformeClientes: {estado: boolean};
  RegistrarVendedor: {estado: boolean};
  HistorialUser: {estado: boolean};
  ClienteInformacion: {estado: boolean};
  RegisterForm: {estado: boolean};
  Registrofor: {estado:boolean};
  lista_Zona: {estado:boolean};
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
    <Stack.Screen name="RegisterProduct" component={RegisterProduct}/>
    <Stack.Screen name="LoginScreen" component={LoginScreen}/>
    <Stack.Screen name="InformeVentasVendedor" component={InformeVentasVendedor}/>
    <Stack.Screen name="InformeClientes" component={InformeClientes}/>
    <Stack.Screen name="RegistrarVendedor" component={RegistrarVendedor}/>
    <Stack.Screen name="Productos_Lista" component={Productos_Lista}/>
    <Stack.Screen name="ActualizarProduct" component={ActualizarProduct}/>
    <Stack.Screen name="Registrofor" component={Registrofor}/>
    <Stack.Screen name="lista_Zona" component={lista_Zona}/>
  </Stack.Navigator>
);

const AbonoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisterAbono" component={RegisterAbono} />
    <Stack.Screen name="HistorialUser" component={HistorialUser}/>
    <Stack.Screen name="RegisterForm" component={RegisterForm}/>
    <Stack.Screen name="ClienteInformacion" component={ClienteInformacion}/>
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
        title: 'Productos',
        tabBarLabel: 'Productos',
        tabBarIcon: ({ color, size }) => (
          <Icon name="cube-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Registrofor"
      component={Registrofor}
      options={{
        title: 'Zonas',
        tabBarLabel: 'Zonas',
        tabBarIcon: ({ color, size }) => (
          <Icon name="map-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="InformeVentasVendedor"
      component={InformeVentasVendedor}
      options={{
        title: 'Ventas',
        tabBarLabel: 'Ventas',
        tabBarIcon: ({ color, size }) => (
          <Icon name="stats-chart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="InformeClientes"
      component={InformeClientes}
      options={{
        title: 'Clientes',
        tabBarLabel: 'Clientes',
        tabBarIcon: ({ color, size }) => (
          <Icon name="people-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="RegistrarVendedor"
      component={RegistrarVendedor}
      options={{
        title: 'Vendedores',
        tabBarLabel: 'Vendedores',
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
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
          <Icon name="cash-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="RegisterForm"
      component={RegisterForm}
      options={{
        title: 'Registrar Clientes',
        tabBarLabel: 'Registrar Clientes',
        tabBarIcon: ({ color, size }) => (
          <Icon name="people-outline" color={color} size={size} />
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
