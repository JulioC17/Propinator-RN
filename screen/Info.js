import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  
} from "react-native";
import { useState, useEffect } from "react";
const screenHeight = Dimensions.get("window").height;

export default function Help ({goBack}) {
    return(
        <KeyboardAvoidingView>
            <ScrollView>
                <View style = {styles.generalView}>
                    <View style={styles.goBackBtnView}>
                        <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
                            <Text style={styles.textBtn}>Ir Atrás</Text>
                            </TouchableOpacity>
                    </View>
                    <View style = {styles.sectionView}>
                        <Text style = {styles.h1}>Funcionamiento Básico</Text>
                        <Text style = {styles.p}>
                            {"-En la página principal puedes añadir trabajadores y poner las horas que trabajaron esta semana.\n"}
                            {"-Introducir el total de propina recibida en la semana.\n"}
                            {"-Pulsa “Calcular” para ir a la pantalla siguiente, donde verás el total de horas trabajadas y la propina distribuida.\n"}
                            {"-Estos datos son temporales, solo sirven para este cálculo rápido y no se guardan.\n"}
                        </Text>
                    </View>

                    <View style = {styles.sectionView}>
                        <Text style = {styles.h1}>Botón "Ajustes" </Text>
                        <Text style = {styles.p}>
                            {"-Aquí puedes añadir nuevos trabajadores que se guardarán de manera permanente para poder seleccionarlos en la página principal.\n"}
                            {"-Cada trabajador que crees aparecerá demanera individual, donde podrás:\n"}
                            {"-->Editar su nombre en caso de que haya un error.\n"}
                            {"-->Eliminar al trabajador si ya no forma parte de tu plantilla.\n"}
                            {"-Esta sección te ayuda a mantener tu lista de trabajadores actualizada, así solo tendrás que seleccionar los nombres en la página principal sin tener que escribirlos cada vez.\n"}
                        </Text>
                    </View>

                     <View style = {styles.sectionView}>
                        <Text style = {styles.h1}>Botón "Registro" </Text>
                        <Text style = {styles.p}>
                            {"-Aquí puedes registrar el trabajo de tus empleados con persistencia de datos, para poder consultarlo más adelante.\n"}
                            {"-Primero selecciona el período usando los dos modales: Año y Mes.\n"}
                            {"-Después, puedes añadir todos los trabajadores que quieras y poner las horas que trabajaron.\n"}
                            {"-Cuando termines, pulsa “Guardar” para que estos datos se almacenen permanentemente en la app.\n"}
                            {"-Más adelante, podrás consultar estos registros, hacer cálculos acumulados o ver históricos sin perder la información.\n"}
                        </Text>
                    </View>

                    <View style = {styles.sectionView}>
                        <Text style = {styles.h1}>Botón "Datos"</Text>
                        <Text style = {styles.p}>
                            {"-Aquí puedes seleccionar uno o varios períodos (mes y año) para ver las horas trabajadas de tus empleados en esas fechas.\n"}
                            {"-La app suma automáticamente las horas de todos los períodos seleccionados, mostrando el total por trabajador.\n"}
                            {"-Una vez verificados los datos, puedes enviarlos a la página principal para calcular de manera sencilla la propina proporcional de cada trabajador en un período más largo, como varias semanas o meses.\n"}
                            {"-Esto te permite hacer cálculos más completos sin tener que introducir los datos manualmente de nuevo.\n"}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
generalView:{
    minHeight: screenHeight,
    backgroundColor: "#AFD8DC",
    alignItems: "center",
    padding:20,
    paddingBottom:100
},
 goBackBtn:{
    height: 55,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: "10%",
    marginLeft: "1%",
},
goBackBtnView:{
    width:'100%'
},
textBtn:{
    fontSize:18,
    fontWeight:'bold'
},
h1:{
    marginTop:'10%',
    fontSize:26,
    fontWeight:'bold',
    color:'#BA4435',
    textDecorationLine:'underline'
},
p:{
    fontSize:18,
    margin:5
},
sectionView:{
    borderColor:'#BA4435',
    borderWidth:1,
    borderRadius:10,
    margin:10,
    padding:10
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
//setCurrentScreen("Results")