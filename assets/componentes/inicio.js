import { useState } from "react"
import { Text,ScrollView,View,StyleSheet, Pressable,Image} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"




export  const Inicio= ({navigation})=>{

    const [textVisible,setTextVisible]= useState(0);
    const [navWidth,setNavWidth]= useState(wp('15%'));//
    return(
        <>
            {/*nav */}
            <View style={[styles.Body]}>

                <View style={[styles.Nav,{width:navWidth}]}>
                    <Pressable style={{display:'flex',alignItems:'center'}}
                    onPress={()=>{
                        if(navWidth==wp('15%'))
                        {
                            setNavWidth(wp('55%'))
                        }
                        else
                        {
                            setNavWidth(wp('15%'))
                        }

                        if (textVisible==0)
                        {
                            setTextVisible(1)
                        }
                        else
                        {
                            setTextVisible(0)
                        }
                        
                    }}>
                        <Image style={styles.menu} source={require('../imagenes/menu.png')}></Image>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Inicio</Text>
                    </Pressable>
                    <Pressable
                        onPress={()=>{
                            navigation.navigate('Clientes')
                        }}
                    >
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Clientes</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Articulos</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Cotizacion</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Empleados</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Factura</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>Camiones</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>administracion</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}
                            onPress={()=>{
                                navigation.navigate('RegistroOrdenes');
                            }}
                        >Ordenes</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={[styles.textNav,{opacity:textVisible}]}>
                            Conduces
                        </Text>
                    </Pressable>

                    
                </View>
                <ScrollView>
                <View style={styles.bellContainer}>
                    <Pressable style={styles.bellButton} onPress={()=>{
                        alert('ding dong');
                    }}>
                        <Image style={styles.bell} source={require('../imagenes/notification.png')}></Image>
                    </Pressable>
                </View>
                <View style={styles.aside}>
                    
                    <Text style={styles.asideTittle}>Ventas</Text>
                    <Image style={styles.imageAside} source={require('../imagenes/ventas.png')}></Image>
                    <Text>Value</Text>
                    <Text style={styles.asideTittle}>Ganancia</Text>
                    <Image style={styles.imageAside} source={require('../imagenes/ganancia.png')}></Image>
                    <Text>Value</Text>
                    <Text style={styles.asideTittle}>Gasto</Text>
                    <Image style={styles.imageAside} source={require('../imagenes/gasto.png')}></Image>
                    <Text>Value</Text>
                </View>
                </ScrollView>
            </View>
        </>
    )
}


const styles= StyleSheet.create({

    bellButton:{
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'black',
        borderRadius:18,
        position:'relative',
        zIndex:1000
    },
    bellContainer:{

        position:'absolute',
        width:'100%',
        paddingTop:hp('5%'),
        display:'flex',
        alignItems:'flex-end',
        paddingRight:5
    },
    bell:{
        width:50,
        height:50,
        

    },
    asideTittle:{
        fontSize:20,
        fontWeight:675
    },

    imageAside:{
        width:160,
        height:160
    },

    aside:
    {

        width:wp('75%'),
        minHeight:hp('100%'),
        flex:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:18,
        paddingTop:hp('10%')
    },
    Body:{
        backgroundColor:'whiteSmoke',
        width:wp('100%'),
        height:hp('100%'),
        display:'flex',
        flexDirection:'row'
        
    },
    Nav:
    {

        height:hp('110%'),
        backgroundColor:'#1f2229ff',
        display:'flex',
        flexDirection:'column',
        position:'static',
        justifyContent:'flex-start',
        paddingTop:hp('10%'),
        gap:30,
        maxWidth:225,
        

    },
    textNav:{
        color:'white',
        textAlign:'center',
        fontSize:18,
        

    },
    menu:{
        width:35,
        height:35,
        position:'relative',
        filter:'invert(1)'
    }
})