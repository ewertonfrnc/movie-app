import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "../../../components/Input.component";
import Button from "../../../components/button.component";
import SafeAreaComponent from "../../../components/safe-area.component";

import { theme } from "../../../constants";

import { StackScreenProps } from "@react-navigation/stack";
import { AccountStackParamsList } from "../../../interfaces/navigator.interface";

type RegisterScreenProps = {} & StackScreenProps<
  AccountStackParamsList,
  "register"
>;

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    displayName: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
  });

  const inputChangeHandler = (
    inputIdentifier: string,
    enteredValue: string,
  ) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue },
    }));
  };

  const submitHandler = () => {
    console.log("inputs", inputs);
  };

  return (
    <SafeAreaComponent>
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Vamos começar</Text>
            <Text style={styles.text}>Crie sua conta para continuar</Text>
          </View>

          <View style={styles.form}>
            <Input
              label={"Nome completo"}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "email"),
                placeholder: "Insira seu nome",
                autoCapitalize: "words",
                autoCorrect: false,
                value: inputs.displayName.value,
              }}
            />

            <Input
              label={"Email"}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "email"),
                placeholder: "Insira seu email",
                keyboardType: "email-address",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputs.email.value,
              }}
            />

            <Input
              label={"Senha"}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "password"),
                placeholder: "Insira sua senha",
                keyboardType: "default",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputs.password.value,
              }}
            />

            <Input
              label={"Confirmar senha"}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
                placeholder: "Confirme sua senha",
                keyboardType: "default",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputs.confirmPassword.value,
              }}
            />
          </View>

          <Button label="Entrar" onPress={submitHandler} />
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.SPACING.xxlg,
  },
  form: {
    width: "100%",
    marginBottom: theme.SPACING.xlg,
  },
  text: {
    color: theme.COLORS.silver,
    textAlign: "left",
  },
  title: {
    fontSize: theme.SIZES.xlg,
    fontWeight: "bold",
    color: theme.COLORS.whiteSmoke,
  },
  titleContainer: {
    width: "100%",
    marginBottom: theme.SPACING.xxlg,
  },
});
