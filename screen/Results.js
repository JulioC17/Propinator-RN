import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import ModalSelector from "react-native-modal-selector"
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function Results({ props, tips, goBack }) {
  let hourTotal = 0;
  for (const hour of props) {
    hourTotal += hour.Horas;
  }

  return (
    <ScrollView>
      <View style={styles.generalView}>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
            <Text style={styles.textBtn}>Ir Atrás</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoWords}>Propina Total: {tips} Euros</Text>
          <Text style={styles.infoWords}>
            Horas Totales: {Number(hourTotal)} Horas
          </Text>
        </View>

        <View style={styles.tableView}>
          {props.map((w, i) => {
            const percentageHours = (w.Horas * 100) / hourTotal;
            return (
              <View key={i} style={styles.workerView}>
                <Text style={styles.workerRow}>
                  {w.Trabajador} -- {w.Horas} Horas --{" "}
                  {(Math.floor(percentageHours * tips) / 100).toFixed(2)} Euros
                </Text>
              </View>
            );
          })}
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  generalView: {
    minHeight: screenHeight,
    backgroundColor: "#AFD8DC",
    alignItems: "center",
  },
  buttonView: {
    width: "90%",
    height: "10%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  goBackBtn: {
    height: "60%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: "5%",
    marginLeft: "1%",
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoView: {
    backgroundColor: "#F55E3E",
    width: "90%",
    borderRadius: 10,
    borderColor: "#BA4435",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  infoWords: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  tableView: {
    width: "90%",
    backgroundColor: "#EDB987",
    marginTop: "5%",
    borderRadius: 10,
    borderColor: "#a97749ff",
    borderWidth: 2,
    gap: 20,
    padding: 10,
  },
  workerView: {
    borderBottomColor: "#a97749ff",
    borderBottomWidth: 1,
  },
  workerRow: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
});

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
