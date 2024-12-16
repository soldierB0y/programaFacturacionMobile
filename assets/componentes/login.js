import { Pressable, StyleSheet, Text, View,TextInput, Image, Platform } from 'react-native';
import '../css/styles.css'
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../css/styles.js';
import { useEffect, useState } from 'react';


//prueba usuario y pass
let user="admin";
let pass="admin";



const botonPassInvisible = require('../imagenes/hide.png');
const botonPassVisible = require('../imagenes/view.png');
const urlApi='http://localhost:8000/';












export const Login = ({navigation}) => {
  // Estado para controlar la visibilidad de la contraseña

  const [passVisible, setPassVisible] = useState(false);
  const [usuario,setUsuario]= useState(null);
  const [password, setPassWord]= useState(null);
  const [mostrarErrorCredenciales,setMostrarErrorCredenciales]=useState(false);
  const [mostrarRelleneCampos, setMostrarRelleneCampos]=useState(false);


  useEffect(()=>
  {

  },
  [mostrarErrorCredenciales,mostrarRelleneCampos]);


  async function validarCredenciales(MyUsuario,Mypass)
  {


    /*
    if(usuario=='' || usuario==null || password==null || password=='')
    {
      setMostrarRelleneCampos(true);
    }
    else
    {
      setMostrarRelleneCampos(false);

      if (Mypass==pass && MyUsuario==user)
        {
          navigation.navigate('Inicio');
          setMostrarErrorCredenciales(false);
        }
        else
        {
          setMostrarErrorCredenciales(true);
        }
    }*/
    if(usuario=='' || usuario==null || password==null || password=='')
    {
      setMostrarErrorCredenciales(false);
      setMostrarRelleneCampos(true)
    }
    else{
      try {
        const resultado= await fetch(urlApi+'login?usuario='+MyUsuario+'&clave='+Mypass,{
          method:'POST'
        }).then(data=>data.json())

        if (resultado.validated==false)
        {
          setMostrarErrorCredenciales(true)
          setMostrarRelleneCampos(false)
          
        }
        else
        {
          setMostrarErrorCredenciales(false)
          setMostrarRelleneCampos(false)
          navigation.navigate('Inicio')
        }
        } catch (error) {
          console.log(error)
        }
  }
}


  return (
    <LinearGradient
      colors={['rgb(255,84,84)', 'white']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <View style={styles.loginBox}>
        <Image source={require('../imagenes/logoWascar.png')} style={{ width: 150, height: 150 }} />
        <Text style={styles.h1}>Iniciar Sesión</Text>
        <Text style={styles.Label}>Ingresa tus credenciales</Text>
        {
          mostrarErrorCredenciales==true?
          (
          <Text style={{color:'red'}}>Usuario/ Correo o Clave incorrectos</Text>
          ):(<Text></Text>)
        }

        {
          mostrarRelleneCampos==true?
          (
          <Text style={{color:'red'}}>Rellene todos los Campos</Text>
          ):(<Text></Text>)
        }

        <TextInput id="tbxUsuario"
          onChangeText={(value)=>
          {
            setUsuario(value);
          }
          }
        style={styles.TextInput} placeholder='usuario/correo' />

        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput  id='tbxPass'
            secureTextEntry={!passVisible} // Cambiar visibilidad según el estado
            style={styles.TextInput}
            placeholder='Clave'
            onChangeText={(value)=>{setPassWord(value)}}
          />
          <Pressable
            onPress={() => {
              setPassVisible(!passVisible); // Alternar visibilidad
            }}
            style={{ position: 'absolute', right: 70, ...Platform.select({web:{right:150}}) }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={passVisible ? botonPassVisible : botonPassInvisible} // Dependencia directa de passVisible
            />
          </Pressable>
        </View>

        <Pressable>
          <Text style={styles.botonTextoAzul}>¿Has olvidado tu clave?</Text>
        </Pressable>
        <Pressable 
            onPress={()=>{
                
              validarCredenciales(usuario,password);
                
                
            }}
        
        style={styles.loginButton}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Ingresar</Text>
        </Pressable>
        <Text>or</Text>
        <Pressable style={styles.botonGoogle}>
          <Image source={require('../imagenes/google.png')} style={{ width: 25, height: 25 }} />
          <Text>Acceder con Google</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.botonTextoAzul}>¿Nuevo por aqui?</Text>
        </Pressable>
      </View>
    </LinearGradient>

  );
};
