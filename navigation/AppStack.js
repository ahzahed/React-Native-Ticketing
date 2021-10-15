import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DashboardScreen from '../screens/DashboardScreen'
import HomeScreen from '../screens/HomeScreen'
import SeatScreen from '../screens/SeatScreen'
const Stack = createStackNavigator()
const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Seat" component={SeatScreen} />
        </Stack.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})
