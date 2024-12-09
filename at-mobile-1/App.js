import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AutenticacaoScreen from "./src/screens/AutenticacaoScreen";
import TransacaoListScreen from "./src/screens/TransacaoListScreen";
import FormularioTransacaoScreen from "./src/screens/FormularioTransacaoScreen";

import { TransactionProvider } from "./src/context/TransactionContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TransactionProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={AutenticacaoScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Transacoes"
              component={TransacaoListScreen}
              options={{ title: "Lista de Transações" }}
            />
            <Stack.Screen
              name="Formulario"
              component={FormularioTransacaoScreen}
              options={{ title: "Nova Transação" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </TransactionProvider>
  );
}
