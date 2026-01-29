import { TouchableOpacity, Text, View, ScrollView, Dimensions,KeyboardAvoidingView, Platform, StyleSheet, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
const screenHeight = Dimensions.get("window").height;
import EditWorker from "./editWorkers";

export default function ConfigWorkers ({goBack}) {
    const [worker, setWorker] = useState([])
    const [workerName, setWorkerName] = useState("")
    const [modalVisible, setModalVisible] =useState(false)
    const [currentScreen, setCurrentScreen] = useState('configWorkers')
    const[index, setIndex] = useState(0)


    const addWorker = async () => {
         if(workerName != ""){
           const newWorker = [...worker, workerName]
            setWorker(newWorker)
            setWorkerName("")

            try{
                await AsyncStorage.setItem('@workers', JSON.stringify(newWorker))
            }catch(e){
                console.log("Error para agregar trabajador")
            }
            }else{
            Alert.alert(
                 "Atención",
                "El nombre no puede estar vacío",
                [{text: "OK"}]
            )
        }
    }

    const removeWorker = async (i) => {
        const updateList = worker.filter((_, index) => index !== i)
        setWorker(updateList)
        try{
                await AsyncStorage.setItem('@workers', JSON.stringify(updateList))
            }catch(e){
                console.log("Error para eliminar trabajador")
            }
    }

    useEffect(() => {
        const loadWorkers = async() => {
            const listWorkers = await AsyncStorage.getItem('@workers')

            if(listWorkers){
                setWorker(JSON.parse(listWorkers))
            }
        }

        loadWorkers()
    }, [])

    

    return(

        <>
        {currentScreen === "configWorkers" &&

        <KeyboardAvoidingView
            behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
            style = {styles.keyboardOut}
        >
            <ScrollView style = {styles.generaScrolllView}>

                <View style = {styles.generalView}>
                
                    <View style={styles.buttonsView}>
                        <View style={styles.buttongoBack}>
                            <TouchableOpacity  onPress={goBack}>
                                <Text style={styles.textBtn}>Ir Atrás</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addWorker}>
                                 <Text style={styles.textBtn}>Añadir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style = {styles.inputView}>
                        <TextInput
                            style = {styles.workerInput}
                            placeholder="Agrega un trabajador"
                            placeholderTextColor="#888"
                            value = {workerName}
                            onChangeText={text => setWorkerName(text) }
                        ></TextInput>
                    </View>

                    
                    <View style = {styles.listView}>
                        {worker.map( (w, i) => {
                            return(
                                <View style = {styles.workerCard} key = {i}>
                                    <View style = {styles.nameView}>
                                        <Text style = {styles.name}>{w}</Text>
                                    </View>
                                    
                                    <View style = {styles.addEditBtn}>
                                        <View style = {styles.editBtn}>
                                            <TouchableOpacity onPress={() => {
                                                setCurrentScreen('editWorkers')
                                                setIndex(i)
                                                }}>
                                                <Text style = {styles.editText}>Editar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style = {styles.removeBtn}>
                                            <TouchableOpacity  onPress={() => {
                                                Alert.alert(
                                                    "Confirmación",
                                                    `Quieres eliminar a: ${w} ???` ,
                        
                                                    [
                                                        {text: "Ok", onPress: () => removeWorker(i), style: "destructive"},
                                                        {text: "Cancelar", style: 'cancel'}
                                                    ]

                                                )
                                                //removeWorker(i)
                                                
                                                }}>
                                                <Text style = {styles.removeText}>Eliminar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                    </View>
                                </View>
                            )
                        })}

                    </View>

                    

                </View>

                


            </ScrollView>

        </KeyboardAvoidingView>
        }

        {currentScreen === 'editWorkers' && (
            <EditWorker
                worker = {worker}
                index = {index}
                goBack={() => setCurrentScreen('configWorkers')}
                setWorker={setWorker}
            />
        )}

        
    </>
   )
}

const styles = StyleSheet.create({
    generalView:{
        minHeight: screenHeight,
        backgroundColor:'#AFD8DC', 
        alignItems:'center',
    },
    buttonsView:{
        width:350,
        height:100,
        flexDirection:'row',
        marginTop:50,
        justifyContent:'space-around',
        alignItems:'center'
    },
    buttongoBack:{
    height: 45,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    },
    buttonAdd:{
    height: 45,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    },
    textBtn:{
        fontSize: 18,
        fontWeight: "bold",
    },
    inputView:{
        width:250,
    },
    workerInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        height:40,
        borderColor:'#818181ff',
        borderWidth:3,
        textAlign:'center',
        color:"#000",
        fontSize:16,
        textAlignVertical:"center",

    },
    listView:{
        width:'100%',
        alignItems:'center',
        marginTop:'10%',
        gap:10,
        marginBottom:'30%'
    },
    workerCard:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:10,
        borderColor:'#BA4435',
        backgroundColor:'#F55E3E',
        borderWidth:2,
        padding:10,
        borderRadius:10,
        
    },
    name:{
        fontSize:24,
        fontWeight:'bold'
    },
    addEditBtn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'60%',
        gap:20,
    },
    editBtn:{
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    width:'35%',
    height:30
    },
    removeBtn:{
        justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    width:'35%',
    height:30
    },
    generaScrolllView:{
        backgroundColor:'#AFD8DC',
        paddingBottom:150
    },
    keyboardOut:{
        backgroundColor:'#AFD8DC',
        flex:1
    }
   
     


})

/*
Fondo suave azul/verde
#AFD8DC
Rojo quemado oscuro
#BA4435
Verde esmeralda
#45996A
Naranja rojizo brillante
#F55E3E
Verde petróleo oscuro
#1C514F
Beige cálido / piel
#EDB987
*/