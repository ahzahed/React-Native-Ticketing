import React, { useContext } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
const DashboardScreen = ({navigation}) => {
    const {
        user, 
        logout, 
        } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 5}}>
            <Text style={{color:'black', fontSize: 20}}>Welcome, {user.email} </Text>
            <Button title='Logout' onPress={() => logout()} />
           </View>
        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
     container: {
        // backgroundColor: '#f9fafd',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 20
    },
})
