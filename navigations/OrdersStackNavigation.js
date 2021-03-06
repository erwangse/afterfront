import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderDetailScreen, OrdersListScreen } from '../screens';
import GlobalStyles from '../config/styles';

const Stack = createNativeStackNavigator();

const OrdersStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: GlobalStyles.color.primary,
        },
        headerTitleStyle: GlobalStyles.headerTitleStyle,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="List"
        component={OrdersListScreen}
        options={{ title: 'Commandes' }}
      />
      <Stack.Screen
        name="Detail"
        component={OrderDetailScreen}
        options={{ title: 'Détail' }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStackNavigation;
