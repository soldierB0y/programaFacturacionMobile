import { useEffect, useState } from "react"
import { Text,ScrollView,View,StyleSheet, Pressable,Image,TextInput, Modal} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import SelectDropdown from "react-native-select-dropdown"
import DropDownPicker from "react-native-dropdown-picker"
import { SearchBar } from "react-native-screens"
import { stylesTables } from "../css/styleTable"



/*Apartado principal de los clientes */
export const Clientes = ({navigation})=>{
    const Tap= createMaterialTopTabNavigator();
    return(
        <>
            <Tap.Navigator>
                <Tap.Screen
                 name="ListaClientes"
                 component={ListaClientes}
                 options={{title:'Listado'}}
                 ></Tap.Screen>
                 <Tap.Screen
                 name="NuevoCliente"
                 component={NuevoCliente}
                 options={
                    {
                        title:'Nuevo'
                 }}
                 >  
                 </Tap.Screen>
                 <Tap.Screen
                    name="EditarCliente"
                    component={EditarCliente}
                    options={
                        {
                            title:'Editar'
                        }
                    }
                 >
                 </Tap.Screen>
            </Tap.Navigator>
            
        </>

    )
}

//Listado de clientes
export const ListaClientes= ({navigation})=>{
    let listadoClientes = [
        {id: 1, nombre: 'Juancho'},
        {id: 2, nombre: 'Martin'},
        {id: 3, nombre: 'Carlos'},
        {id: 4, nombre: 'Ana'},
        {id: 5, nombre: 'Luis'},
        {id: 6, nombre: 'María'},
        {id: 7, nombre: 'Pedro'},
        {id: 8, nombre: 'Sofía'},
        {id: 9, nombre: 'Gabriel'},
        {id: 10, nombre: 'Lucía'},
        {id: 11, nombre: 'Rafael'},
        {id: 12, nombre: 'Clara'},
        {id: 13, nombre: 'Raúl'},
        {id: 14, nombre: 'Elena'},
        {id: 15, nombre: 'José'},
        {id: 16, nombre: 'Isabel'},
        {id: 17, nombre: 'Mario'},
        {id: 18, nombre: 'Victoria'},
        {id: 19, nombre: 'Andrés'},
        {id: 20, nombre: 'Carmen'}
      ];
      

    const[searchValue, setSearchValue]= useState(null);
    const [listaClientes,setListaclientes]= useState(listadoClientes);
    const [selectedID,setSelectedID]= useState(null);
    const [modalVisible,setModalVisible]=useState(false);

    useEffect(()=>{
            if (searchValue !=null && searchValue!='')
            {
               setListaclientes( listaClientes.filter(item=> item.nombre.toUpperCase().includes(searchValue.toUpperCase())))
            }
            else
            {
                setListaclientes(listadoClientes)
            }

    },
  [searchValue])
    return (
        <>
                <View style={{width:wp('100%'),display:'flex',alignItems:'center'}}>
                <TextInput style={{marginLeft:wp('5%'),backgroundColor:'white',paddingLeft:20,borderWidth:0,fontSize:18, borderColor:'black',width:wp('90%'),maxWidth:450,height:40,alignSelf:'center',marginTop:20,marginBottom:10}} placeholder="nombre..." onChangeText={(e)=>{

                    setSearchValue(e)
                }}></TextInput>
                
                <ScrollView style={stylesTables.contenedorTabla}>
                    <View style={stylesTables.tablaContenedortitulares}><Text style={stylesTables.tablaTitulo}>ID</Text><Text style={stylesTables.tablaTitulo}>nombre</Text></View>
                    {listaClientes.map(item=>(

                        <Pressable key={item.id}
                            onPress={()=>{
                               setSelectedID(item.id)
                            }}
                        >
                            <View style={[stylesTables.contenedorTablaLinea,{backgroundColor: selectedID==item.id? '#ccc':'white'}]} key={item.id}>
                                <Text style={[stylesTables.styleColumna,{color: selectedID==item.id? 'white':'black'}]}>{item.id}</Text>
                                <Text style={[stylesTables.styleColumna,{color: selectedID==item.id? 'white':'black'}]}>{item.nombre}</Text>
                            </View>
                        </Pressable>


                    )

                    )}
                </ScrollView>
                <View style={{display:'flex',flexDirection:'row',gap:10,marginTop:20}}>
                    <Pressable style={[styles.button,{backgroundColor:'green'}]}><Text style={styles.textoBoton}
                        onPress={()=>{navigation.navigate('NuevoCliente')}}
                    >Crear</Text></Pressable>
                    <Pressable style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={()=>{
                            navigation.navigate('EditarCliente')
                        }}
                    ><Text style={styles.textoBoton}>Editar</Text></Pressable>
                    <Pressable style={[styles.button,{backgroundColor:'red'}]}
                        onPress={()=>{
                            setModalVisible(true)
                        }}
                    ><Text style={styles.textoBoton}>Eliminar</Text></Pressable>
                </View>
                </View>
                <Modal animationType="slide" visible={modalVisible} transparent={true} onRequestClose={()=>{setModalVisible(false)}}>
                    <View style={{width:wp('95%'),maxWidth:500,height:hp('45%'),backgroundColor:'white',alignSelf:'center',marginTop:hp('21%'),borderWidth:1,borderColor:'#ccc',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',fontSize:18}}>¿Estas seguro que deseas eliminar este Registro?</Text>
                        <View style={{display:'flex',flexDirection:'row',gap:20}}>
                            <Pressable style={{flex:1,backgroundColor:'green',maxWidth:125,minWidth:125,height:35,justifyContent:'center'}} onPress={()=>{setModalVisible(false)}}><Text style={{textAlign:'center',color:'white',fontSize:15}}>si</Text></Pressable>
                            <Pressable style={{flex:1,backgroundColor:'red',maxWidth:125,minWidth:125,height:35, justifyContent:'center'}} onPress={()=>{setModalVisible(false)}}><Text style={{textAlign:'center', color:'white'}}>no</Text></Pressable>
                        </View>
                    </View>
                </Modal>

        </>
    )
}

/*Formulario de Nuevos Clientes*/
export const NuevoCliente= ({navigation})=>{
    const [item,setItem]= useState([{label:'masculino',value:'masculino'},{label:'femenino',value:'femenino'},{label:'prefiero no responder',value:null}])
    const [open, setOpen]= useState(false);
    const [value, setValue]= useState(null);


    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Crear Nuevo Cliente</Text>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10}}>
                    <TextInput  style={styles.input} placeholder="nombre"
                        
                    ></TextInput>
                    {/*Usar un selectDropDown para el sexo desinstalar 
                    el paquete que tengo para eso
                     actualmente, no funciona correctamente */}
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={item}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItem}
                        placeholder="genero"
                        style={{backgroundColor:'white', width:250}}
                        dropDownContainerStyle={{width:250}}


                    >
                    </DropDownPicker>
                    <TextInput style={styles.input} placeholder="direccion"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="telefono"></TextInput>
                    <TextInput style={styles.input} placeholder="correo"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="RNC"></TextInput> 
                    <TextInput style={styles.input} placeholder="empresa"></TextInput> 
                   
                
                </View>
                <Pressable style={[styles.botonCliente,{backgroundColor:'green'}]}><Text style={styles.textoBoton}
                    onPress={()=>{
                        navigation.navigate('ListaClientes')
                    }}
                >Guardar Datos</Text></Pressable>
            </View>
        </>
    )
}

export const EditarCliente=({navigation})=>{
    
    const [item,setItem]= useState([{label:'masculino',value:'masculino'},{label:'femenino',value:'femenino'},{label:'prefiero no responder',value:null}])
    const [open, setOpen]= useState(false);
    const [value, setValue]= useState(null);


    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Modificar Cliente</Text>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10}}>
                    <TextInput  style={styles.input} placeholder="nombre"
                        
                    ></TextInput>
                    {/*Usar un selectDropDown para el sexo desinstalar 
                    el paquete que tengo para eso
                     actualmente, no funciona correctamente */}
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={item}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItem}
                        placeholder="genero"
                        style={{backgroundColor:'white', width:250}}
                        dropDownContainerStyle={{width:250}}


                    >
                    </DropDownPicker>
                    <TextInput style={styles.input} placeholder="direccion"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="telefono"></TextInput>
                    <TextInput style={styles.input} placeholder="correo"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="RNC"></TextInput> 
                    <TextInput style={styles.input} placeholder="empresa"></TextInput> 
                   
                
                </View>
                <Pressable style={[styles.botonCliente,{backgroundColor:'green'}]}><Text style={styles.textoBoton}
                    onPress={()=>{
                        navigation.navigate('ListaClientes')
                    }}
                >Guardar Datos</Text></Pressable>
            </View>
       </>
    )
}




/*estilos*/
const styles = StyleSheet.create({
    button:{
        flex:1,
        height:40,
        width:150,
        display:'flex',
        justifyContent:'center',
        borderRadius:15
    },
    container:{
        width:wp('100%'),
        height:hp('100%'),
        backgroundColor:'whiteSmoke',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:50
        ,
        gap:20
    },
    botonCliente:
    {
        width:200,
        height:40,
        borderRadius:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    textoBoton:{

        textAlign:'center',
        fontSize:17,
        fontWeight:700,
        color:'white'
    },
    title:{
    
        textAlign:'center',
        fontSize:20,
        fontWeight:790
    },
    input:{
        width:250,
        borderRadius:10,
        height:40,
        paddingLeft:10,
        borderWidth:1,
        borderColor:'gray',
        backgroundColor:'white'
    }
})