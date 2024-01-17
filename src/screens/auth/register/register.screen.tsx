import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "../../../components/Input.component";
import Button from "../../../components/button.component";
import SafeAreaComponent from "../../../components/safe-area.component";

import { theme } from "../../../constants";

import { StackScreenProps } from "@react-navigation/stack";
import { AccountStackParamsList } from "../../../interfaces/navigator.interface";
import { setUser, useAuth } from "../../../contexts/auth.context";

type RegisterScreenProps = {} & StackScreenProps<
  AccountStackParamsList,
  "register"
>;

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const {
    state: { loading },
    authDispatch,
  } = useAuth();

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
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const submitHandler = async () => {
    const { displayName, email, password, confirmPassword } = inputs;

    const isDisplaynameValid = displayName.value.trim().length > 0;
    const isEmailValid = email.value.trim().length > 0;
    const isPasswordValid = password.value.trim().length > 0;
    const isConfirmPasswordValid =
      isPasswordValid && password.value === confirmPassword.value;

    if (
      !isDisplaynameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      setInputs((prevState) => {
        return {
          displayName: {
            value: prevState.displayName.value,
            isValid: isDisplaynameValid,
          },
          email: {
            value: prevState.email.value,
            isValid: isEmailValid,
          },
          password: {
            value: prevState.password.value,
            isValid: isPasswordValid,
          },
          confirmPassword: {
            value: prevState.confirmPassword.value,
            isValid: isConfirmPasswordValid,
          },
        };
      });
    }

    await setUser(authDispatch, email.value, password.value, {
      isRegister: true,
      displayName: displayName.value,
    });
  };

  const isFormValid =
    !inputs.displayName.isValid ||
    !inputs.email.isValid ||
    !inputs.password.isValid ||
    !inputs.confirmPassword.isValid;

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
              invalid={!inputs.displayName.isValid}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "displayName"),
                placeholder: "Insira seu nome",
                autoCapitalize: "words",
                autoCorrect: false,
                value: inputs.displayName.value,
              }}
            />

            <Input
              label={"Email"}
              invalid={!inputs.email.isValid}
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
              invalid={!inputs.password.isValid}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "password"),
                placeholder: "Insira sua senha",
                keyboardType: "default",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputs.password.value,
                secureTextEntry: true,
              }}
            />

            <Input
              label={"Confirmar senha"}
              invalid={!inputs.confirmPassword.isValid}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
                placeholder: "Confirme sua senha",
                keyboardType: "default",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputs.confirmPassword.value,
                secureTextEntry: true,
              }}
            />
          </View>

          {isFormValid && (
            <Text style={styles.errorText}>
              Por favor, verifique os dados informados!
            </Text>
          )}

          <Button label="Entrar" loading={loading} onPress={submitHandler} />
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
  errorText: {
    color: theme.COLORS.red,
  },
  titleContainer: {
    width: "100%",
    marginBottom: theme.SPACING.xxlg,
  },
});
