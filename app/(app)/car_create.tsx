import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useActions, useTypedSelector } from "@/hooks/storeHooks";
import { CarInfo } from "@/store/model/CarInfo";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { selectUser } from "@/store/selectors/index.";
import { User } from "@/store/model/User";
import { Colors } from "@/shared/config/theme";
import { router } from "expo-router";

export default function CarCreateForm() {
  const user = useTypedSelector(selectUser);
  const { uid } = user as User;
  const { createCarAction } = useActions();
  const [car, setCar] = useState<CarInfo>({
    id: "",
    carNumber: "",
    secondCarNumber: "",
    brand: "",
    type: "",
    registrationDate: "",
    vin: "",
    model: "",
    year: "",
    engine: "",
    registrationType: "",
    color: "",
  });

  const handleChange = (key: keyof CarInfo, value: string) => {
    setCar({ ...car, [key]: value });
  };

  const handleCreateCar = async () => {
    console.log("Створення автомобіля:", car);
    car.id = car.carNumber;

    createCarAction({ car, uid });
    router.replace("/login");
  };

  const {
    carNumber,
    secondCarNumber,
    brand,
    type,
    registrationDate,
    vin,
    model,
    year,
    engine,
    color,
    registrationType,
  } = car;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="Номер"
          value={carNumber}
          onChangeText={(text) => handleChange("carNumber", text)}
        />
        <Input
          style={styles.input}
          text="Другий номер"
          value={secondCarNumber}
          onChangeText={(text) => handleChange("secondCarNumber", text)}
        />
      </View>
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="Марка"
          value={brand}
          onChangeText={(text) => handleChange("brand", text)}
        />
      </View>
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="Вид"
          value={type}
          onChangeText={(text) => handleChange("type", text)}
        />
        <Input
          style={styles.input}
          text="Дата реєстрації"
          value={registrationDate}
          onChangeText={(text) => handleChange("registrationDate", text)}
        />
      </View>
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="vin (Введення латинською)"
          value={vin}
          onChangeText={(text) => handleChange("vin", text)}
        />
      </View>
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="Модель"
          value={model}
          onChangeText={(text) => handleChange("model", text)}
        />
      </View>
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="Рік"
          value={year}
          onChangeText={(text) => handleChange("year", text)}
        />
        <Input
          style={styles.input}
          text="Двигун"
          value={engine}
          onChangeText={(text) => handleChange("engine", text)}
        />
      </View>
      <View style={styles.row}>
        <Input
          style={styles.input}
          text="Тип реєстрації"
          value={registrationType}
          onChangeText={(text) => handleChange("registrationType", text)}
        />
        <Input
          style={styles.input}
          text="Колір"
          value={color}
          onChangeText={(text) => handleChange("color", text)}
        />
      </View>
      <Button text="Створити автомобіль" onPress={handleCreateCar} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.yellowLight,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 75,
  },
});