import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/Views/Login';


export type RootStackParamList = {
  LoginScreen: {estado:boolean};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
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
            title: 'Actividades',
          }}
          initialParams={{estado:false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



