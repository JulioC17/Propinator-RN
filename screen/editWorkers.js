import { TouchableOpacity, Text, View,Dimensions,KeyboardAvoidingView, Platform, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenHeight = Dimensions.get("window").height;


export default function EditWorker ({worker, index, goBack, setWorker}){
    const [newName, setNewName]=useState('')

    const editConfirmation = async () =>{
        const workerEdit = [...worker]
        workerEdit.splice(index,1,newName)
        setWorker(workerEdit)
        setNewName('')

        try{
            await AsyncStorage.setItem('@workers',JSON.stringify(workerEdit))
        }catch(e){
            console.log("Error para editar el trabajador")
        }
    }

    return(
        <View style = {styles.generalView}>
            
            <View style = {styles.oldName}>
                <Text style = {styles.textName}>Nombre Actual:</Text>
                <Text style = {styles.textName}>{worker[index]}</Text>
            </View>
            
            <View style = {styles.input}>
                <TextInput
                   style = {styles.input}
                   value = {newName}
                   placeholder="Escribe un nuevo nombre..."
                   onChangeText={text => {setNewName(text)}} 
                >

                </TextInput>
            </View>

            <View style = {styles.btnEdit}>
                <TouchableOpacity onPress={() => {
                    if(newName != ''){
                    editConfirmation()
                    goBack()
                    }else{
                        Alert.alert(
                            "Atención",
                            "El nuevo nombre está vacío",
                            [{text: "Ok"}]
                        )
                    }
                }}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    generalView:{
        minHeight:screenHeight,
        backgroundColor:'#AFD8DC',
        justifyContent:'flex-start',
        alignItems:'center',
        gap:'5%',
    },
    input:{
        width:250,
        backgroundColor:'#fff',
        borderRadius:5,
        height:40,
       textAlign:'center',
       fontSize:16
    },
    oldName:{
        marginTop:'50%',
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        backgroundColor:'#F55E3E',
        borderColor:'#BA4435',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        width:'70%'
    },
    textName:{
        fontSize:24,
        fontWeight:'bold',
    },
    btnEdit:{
    height:50,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
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