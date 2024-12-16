import { StatusBar } from 'expo-status-bar';
import './assets/css/styles.css'
import { Text, View } from 'react-native-web';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Pressable, TextInput, ViewComponent } from 'react-native';
import {Inventario,RegistrosInventario} from './assets/componentes/inventario';
import {NavigationContainer, TabActions, TabRouter} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles  from './assets/css/styles';
import { Menu } from './assets/componentes/inicio';
import {ListaClientes, NuevoCliente} from './assets/componentes/clientes'
import { Clientes } from './assets/componentes/clientes';
import {Login} from './assets/componentes/login.js'



export default function App() {
  const stack= createNativeStackNavigator();
  return (
    <>
      <StatusBar style='light' backgroundColor='black'/>
      <NavigationContainer>
        <stack.Navigator>


        <stack.Screen
            name='Login'
            component={Login}
            options={{headerShown:false}}
          
          />
        <stack.Screen
            name='Inicio'
            component={Menu}
            options={{headerShown:false}}
           />

          <stack.Screen
            name='Inventario'
            component={Inventario}
            options={{title:'Orden de Compra'}}
          />
          <stack.Screen 
          name='RegistroOrdenes'
           component={RegistrosInventario}
           options={{title:'Registro Ordenes de Compra'}}
           />

           <stack.Screen
           name='Clientes'
           component={Clientes}></stack.Screen>

        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}


