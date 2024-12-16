import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, ViewComponent } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import styles2 from "../css/styles";



/*Inventario*/
export const Inventario = ({navigation}) => {
  const [numeroProducto, setNumeroProducto] = useState(3);
  const [productos, setProductos] = useState([
    { id: 1, nombre: "default", cantidad: 0 },
    { id: 2, nombre: "default", cantidad: 0 },
  ]);

  useEffect(() => {
    console.log("Número de productos actualizado:", numeroProducto);
  }, [numeroProducto]);

  const agregarProducto = () => {
    setNumeroProducto(numeroProducto + 1); // Actualiza el contador
    const nuevoProducto = {
      id: numeroProducto, // Usa la longitud del array para asignar un ID único
      nombre: "default",
      cantidad: 0,
    };
    setProductos([...productos, nuevoProducto]); // Actualización inmutable
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.formSection}>
        <Text style={styles.label}>Nombre del registro</Text>
          <TextInput
            style={styles.input}
            placeholder="registro"
          />
          <Text style={styles.label}>Recibir de:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del proveedor"
          />

          <Text style={styles.label}>Tipo de operaciones:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Venta, Compra"
          />

          <Text style={{width:wp('90%'),height:30,textAlign:'center'}}>Productos</Text>

          {productos.map((data) => (
            <View style={styles.line} key={data.id}>

              <TextInput
                placeholder="nombre"
                style={styles.lineInput}
                value={data.nombre}
                onChangeText={(text) => {
                  // Actualización del producto específico
                  
                  setProductos((prev) =>
                    prev.map((prod) =>
                      prod.id === data.id ? { ...prod, nombre: text } : prod
                    )
                  );
                }}
              />
              <TextInput
                keyboardType="numeric"
                placeholder="cantidad"
                style={styles.lineInput}
                value={data.cantidad.toString()}
                onChangeText={(text) => {
                
                  const cantidad = text;
                  setProductos((prev) =>
                    prev.map((prod) =>
                      prod.id === data.id ? { ...prod, cantidad } : prod
                    )
                  );
                }}
              />
            <Pressable style={styles.lineButtonRed} onPress={
              ()=>{
                setProductos(productos.filter(item=> item.id!=data.id))
              }
            }>
              <Image style={styles.lineButtonImage} source={require('../imagenes/bin.png')}></Image>
            </Pressable>
            </View>
          ))}

          <Pressable style={styles.button} onPress={agregarProducto}>
            <Text style={styles.buttonText}>Agregar un producto</Text>
          </Pressable>

          <Pressable style={styles.buttonSave}
            onPress={()=>{navigation.navigate('RegistroOrdenes')
                
            }}
          >
            <Text style={styles.buttonText}

            >Guardar Registro</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};



/*Registros de Inventario */

let listaRegistrosInventario= 
[
  {id:0, nombreRegistro:'nombre',proovedor:'proovedor',tipo:'tipo'},
  {id:1,nombreRegistro:'nombre',proovedor:'proovedor',tipo:'tipo'},
  {id:2,nombreRegistro:'nombre',proovedor:'proovedor',tipo:'tipo'},
  {id:3,nombreRegistro:'nombre',proovedor:'proovedor',tipo:'tipo'},
  {id:4,nombreRegistro:'nombre',proovedor:'proovedor',tipo:'tipo'}

]
 export const RegistrosInventario= ({navigation})=>
{
  const [registroInventario, setRegistroInventario]= useState(listaRegistrosInventario);
  useEffect(()=>{

  },[registroInventario])
  return(
    <>
      <View style={styles.container2}>
        <ScrollView style={{borderWidth:1,borderColor:'#ccc',width:wp('98%')}}>
          <View style={[styles.line,{justifyContent:'flex-start'}]}>
            <Text style={styles.column}>nombre</Text>
            <Text style={styles.column}>proovedor</Text>
            <Text style={styles.column}>tipo</Text>
            
          </View>
        {registroInventario.map(
          (fila)=>(
            <View style={[styles.line,]} key={fila.id}>
              <Text style={styles.column}>{fila.nombreRegistro}</Text>
              <Text style={styles.column}>{fila.proovedor}</Text>
              <Text style={styles.column}>{fila.tipo}</Text>
              <Pressable style={styles.lineButton} onPress={()=>{
                navigation.navigate('Inventario');
                }}>
                <Text style={styles.buttonText}>editar</Text>
              </Pressable>
              <Pressable style={styles.lineButtonRed} onPress={
              ()=>{
                setRegistroInventario(registroInventario.filter(item=> item.id != fila.id))

              }
            }>
              <Image style={styles.lineButtonImage} source={require('../imagenes/bin.png')}></Image>
            </Pressable>
            </View>
          )

        )}
        </ScrollView>
        <Pressable style={styles.buttonSave} onPress={()=>{
                navigation.navigate('Inventario');
                }}>
                <Text style={styles.buttonText}>Nuevo Registro</Text>
              </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container2:{

    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    paddingTop:50
  },
  column:{
    width:wp('18%'),
    height:60,
    paddingTop:20,
    textAlign:'center'
  },
  lineButton:
  {
    backgroundColor:'blue',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:10
  },
  lineButtonRed:
  {
    backgroundColor:'red',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:10
  }
  ,
  lineButtonImage:{
    width:30,
    height:30,
    filter:'invert(1)',
  },
  line: {
    display: "flex",
    flexDirection: "row",
    gap:10,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    alignItems:'center',
    justifyContent:'center',

  
  },
  lineInput: {
    width: wp("35%"),
    height:50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: wp("100%"),
  },
  formSection: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    color: "black",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width:wp('90%'),
    alignSelf:'center'
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonSave: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width:wp('90%'),
    alignSelf:'center'
  },
});

