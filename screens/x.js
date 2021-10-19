import React, { useState, useContext } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import { Button, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';

const SeatScreen = ({navigation}) => {
    const { selectedFrom, selectedTo, selectedTime, busInfoFromStore } = useContext(AuthContext)
    const [selectedSeat, setSelectedSeat] = useState({bookedSeats:[]})
    //  console.log(busInfoFromStore);
    const onClickItem = (seatNo)=>{
        const isBooked = selectedSeat.bookedSeats.find(seat=>seat===seatNo)
        if(isBooked){
            const index = selectedSeat.bookedSeats.indexOf(seatNo);
                if (index > -1) {
                selectedSeat.bookedSeats.splice(index, 1);
            }
            setSelectedSeat(...selectedSeat)
            return;
        }
        setSelectedSeat([...selectedSeat, seatNo])
    }

    let bookingObj = {busId:`${selectedFrom}-${selectedTo}-${selectedTime}`, bookedSeats: selectedSeat}
    const bookingForSeats = async (bookingObj) => {
        const busRef = firestore().doc(`bus/${bookingObj.busId}`);
        try {
            const snapShot = await busRef.get();
            if (snapShot.exists) {
                await busRef.update({
                    bookedSeats: [
                        ...snapShot.data().bookedSeats,
                        ...bookingObj.bookedSeats,
                    ],
                });
                const updatedSnapShot = await busRef.get();
                // console.log(updatedSnapShot.data().bookedSeats);

                return updatedSnapShot.data();
            } else {
                await busRef.set({
                    bookedSeats: bookingObj.bookedSeats,
                });
                const updatedSnapShot = await busRef.get();
                return updatedSnapShot.data();
            }
        }
        catch (error) {
            return null;
        }
    };

    return (
        <View style={{flexDirection: 'row', flex: 100, margin: 5, backgroundColor: 'white'}}>
            <View style={{flex: 50, borderRightColor: "gray", borderRightWidth: 5}}>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="A1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("A1")} style={styles.text}>A1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="A2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("A2")} style={styles.text}>A2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="B1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("B1")} style={styles.text}>B1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="B2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("B2")} style={styles.text}>B2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="C1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("C1")} style={styles.text}>C1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="C2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("C2")} style={styles.text}>C2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="D1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("D1")} style={styles.text}>D1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="D2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("D2")} style={styles.text}>D2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="E1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("E1")} style={styles.text}>E1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="E2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("E2")} style={styles.text}>E2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="F1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("F1")} style={styles.text}>F1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="F2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("F2")} style={styles.text}>F2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="G1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("G1")} style={styles.text}>G1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="G2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("G2")} style={styles.text}>G2</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="H1") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("H1")} style={styles.text}>H1</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="H2") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("H2")} style={styles.text}>H2</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 50, marginLeft: 5}}>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="A3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("A3")} style={styles.text}>A3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="A4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("A4")} style={styles.text}>A4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="B3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("B3")} style={styles.text}>B3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="B4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("B4")} style={styles.text}>B4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="C3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("C3")} style={styles.text}>C3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="C4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("C4")} style={styles.text}>C4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="D3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("D3")} style={styles.text}>D3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="D4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("D4")} style={styles.text}>D4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="E3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("E3")} style={styles.text}>E3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="E4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("E4")} style={styles.text}>E4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="F3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("F3")} style={styles.text}>F3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="F4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("F4")} style={styles.text}>F4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="G3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("G3")} style={styles.text}>G3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="G4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("G4")} style={styles.text}>G4</Text>
                    </View>
                </View>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <View style={ selectedSeat.find(seat=>seat==="H3") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("H3")} style={styles.text}>H3</Text>
                    </View>
                    <View style={ selectedSeat.find(seat=>seat==="H4") ? styles.bookedText: styles.seatPosition}>
                        <Text onPress={()=>onClickItem("H4")} style={styles.text}>H4</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.appButtonContainer}  onPress={()=>{
                    bookingForSeats(bookingObj)
                }}>
                <Text style={styles.appButtonText}>Book</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SeatScreen

const styles = StyleSheet.create({
    seatPosition: {
        flex: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 5,
        borderWidth: 3
    },
    bookedText: {
        flex: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 5,
        borderWidth: 3
    },
    text: {
        color:'white',
        fontWeight:'bold',
        fontSize: 25        
    },
    appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center'
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
