import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../../constants";

import SafeAreaComponent from "../../../components/safe-area.component";
import Input from "../../../components/Input.component";
import Button from "../../../components/button.component";

import { StackScreenProps } from "@react-navigation/stack";
import { AccountStackParamsList } from "../../../interfaces/navigator.interface";
import { setUser, useAuth } from "../../../contexts/auth.context";

type LoginScreenProps = {} & StackScreenProps<AccountStackParamsList, "login">;

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const {
    state: { loading, user, session },
    authDispatch,
  } = useAuth();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (
    inputIdentifier: string,
    enteredValue: string,
  ) => {
    setInputValues((prevState) => ({
      ...prevState,
      [inputIdentifier]: enteredValue,
    }));
  };

  const submitHandler = async () => {
    const { email, password } = inputValues;
    await setUser(authDispatch, email, password);
  };

  return (
    <SafeAreaComponent>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Vamos começar</Text>
            <Text style={styles.text}>Entre para continuar</Text>
          </View>

          <View style={styles.form}>
            <Input
              label={"Email"}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "email"),
                placeholder: "Insira seu email",
                keyboardType: "email-address",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputValues.email,
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
                value: inputValues.password,
                secureTextEntry: true,
              }}
            />
          </View>

          <Button label="Entrar" loading={loading} onPress={submitHandler} />

          <View style={styles.createAccSection}>
            <Text style={styles.text}>Ainda não tem conta?</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("register")}
            >
              Criar conta
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
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
  createAccSection: {
    marginTop: theme.SPACING.xxxlg,
    flexDirection: "row",
    gap: theme.SPACING.md,
  },
  link: {
    color: theme.COLORS.red,
  },
});
