import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { Picker } from '@react-native-picker/picker'
import firestore from '@react-native-firebase/firestore';
const HomeScreen = ({navigation}) => {
    const {
        user, 
        logout, 
        selectedFrom,
        selectedTo,
        selectedTime,
        setSelectedFrom,
        setSelectedTo,
        setSelectedTime,
        busInfoFromStore,
        setBusInfoFromStore
    } = useContext(AuthContext)

    // getting single Bus Information
    let busId = `${selectedFrom}-${selectedTo}-${selectedTime}`
    const getSingleBusInformation = async (busId) => {
        const busRef = firestore().doc(`bus/${busId}`);

        try {
            const snapShot = await busRef.get();
            if (snapShot.exists) {
                setBusInfoFromStore(snapShot.data())
                // return snapShot.data();
                return;
            } else {
            await busRef.set({
                bookedSeats: [],
            });
            const updatedSnapShot = await busRef.get();
            return updatedSnapShot.data();
            }
        } catch (error) {
            return null;
        }
    };

    return (
        <View style={styles.container}>
           {/* <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 5}}>
            <Text style={{color:'black', fontSize: 20}}>Welcome, {user.email} </Text>
            <Button title='Logout' onPress={() => logout()} />
           </View> */}
           <Button title="Dashboard" onPress={()=>navigation.navigate('Dashboard')}/>
            <Text style={{color: "black", fontWeight:'bold', fontSize: 25, borderBottomWidth: 3, borderBottomColor: "gray", marginTop: 15}}>Choose Destination &amp; Time</Text>
            <Text style={styles.navButtonText}>From</Text>
            <Picker
                selectedValue={selectedFrom}
                style={{ height: 50, width: 200, backgroundColor: "white" }}
                onValueChange={(itemValue, itemIndex) => setSelectedFrom(itemValue)}
            >
                {<Picker.Item label="Dhaka" value="Dhaka" />}
                {<Picker.Item label="Chittagong" value="Chittagong" />}
                {<Picker.Item label="Khulna" value="Khulna" />}
                {<Picker.Item label="Rajshahi" value="Rajshahi" />}
                {<Picker.Item label="Sylhet" value="Sylhet" />}
            </Picker>
            <Text style={styles.navButtonText}>To</Text>
            <Picker
                selectedValue={selectedTo}
                style={{ height: 50, width: 200, backgroundColor: "white" }}
                onValueChange={(itemValue, itemIndex) => setSelectedTo(itemValue)}
            >
                {selectedFrom !== "Dhaka" && <Picker.Item label="Dhaka" value="Dhaka" />}
                {selectedFrom !== "Chittagong" && <Picker.Item label="Chittagong" value="Chittagong" />}
                {selectedFrom !== "Khulna" && <Picker.Item label="Khulna" value="Khulna" />}
                {selectedFrom !== "Rajshahi" && <Picker.Item label="Rajshahi" value="Rajshahi" />}
                {selectedFrom !== "Sylhet" && <Picker.Item label="Sylhet" value="Sylhet" />}
            </Picker>
            <Text style={styles.navButtonText}>Time</Text>
            <Picker
                selectedValue={selectedTime}
                style={{ height: 50, width: 200, backgroundColor: "white", marginBottom: 20 }}
                onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
            >
                {<Picker.Item label="10am" value="10am" />}
                {<Picker.Item label="11am" value="11am" />}
                {<Picker.Item label="12am" value="12am" />}
                {<Picker.Item label="1pm" value="1pm" />}
                {<Picker.Item label="2pm" value="2pm" />}
                {<Picker.Item label="3pm" value="3pm" />}
                {<Picker.Item label="4pm" value="4pm" />}
                {<Picker.Item label="5pm" value="5pm" />}
                {<Picker.Item label="6pm" value="6pm" />}
            </Picker>
            <Button
                title="Next"
                color="#841584"
                onPress={()=>{
                            getSingleBusInformation(busId);
                            navigation.navigate('Seat')
                        }
                        }
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f9fafd',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 20
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
        padding: 20
    },
})
