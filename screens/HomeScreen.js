import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, ScrollView, View, Alert} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {Picker} from '@react-native-picker/picker';
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
    setBusInfoFromStore,
    busName,
    setBusName,
    price,
    setPrice,
  } = useContext(AuthContext);

  useEffect(() => {
    if (busName == 'greenline') {
      setPrice('1000');
    }
    if (busName == 'starline') {
      setPrice('550');
    }
    if (busName == 'starlineac') {
      setPrice('800');
    }
    if (busName == 'enaac') {
      setPrice('1500');
    }
    if (busName == 'enanonac') {
      setPrice('1200');
    }
    if (busName == 'hanif') {
      setPrice('1300');
    }
    if (busName == 'hanifac') {
      setPrice('1800');
    }
    if (busName == 'symoly') {
      setPrice('1200');
    }
  }, [busName]);

  // useEffect(() => {
  //   if (
  //     selectedFrom !== 'Dhaka' &&
  //     (selectedTo == 'Chittagong' ||
  //       selectedTo == 'Rajshahi' ||
  //       selectedTo == 'Sylhet')
  //   ) {
  //     Alert.alert(
  //       'Sorry!',
  //       'Currently, Dhaka To Anywhere || Anywhere To Dhaka Services are avaiable.',
  //       [
  //         {
  //           text: 'Ok',
  //           onPress: () => setSelectedFrom('Dhaka'),
  //         },
  //       ],
  //     );
  //   }
  // }, [selectedFrom, selectedTo]);

  // getting single Bus Information
  let busId = `${selectedFrom}-${selectedTo}-${selectedTime}-${busName}`;
  const getSingleBusInformation = async busId => {
    const busRef = firestore().doc(`bus/${busId}`);

    try {
      const snapShot = await busRef.get();
      if (snapShot.exists) {
        setBusInfoFromStore(snapShot.data());
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
    <ScrollView>
      {/* <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 5}}>
            <Text style={{color:'black', fontSize: 20}}>Welcome, {user.email} </Text>
            <Button title='Logout' onPress={() => logout()} />
           </View> */}
      <View style={styles.container}>
        <Button
          title="Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 25,
            borderBottomWidth: 3,
            borderBottomColor: 'gray',
            marginTop: 15,
          }}>
          Choose Destination &amp; Time
        </Text>
        <Text style={styles.navButtonText}>From</Text>
        <Picker
          selectedValue={selectedFrom}
          style={{height: 50, width: 200, backgroundColor: 'white'}}
          onValueChange={(itemValue, itemIndex) => setSelectedFrom(itemValue)}>
          {<Picker.Item label="Dhaka" value="Dhaka" />}
          {<Picker.Item label="Chittagong" value="Chittagong" />}
          {<Picker.Item label="Rajshahi" value="Rajshahi" />}
          {<Picker.Item label="Sylhet" value="Sylhet" />}
        </Picker>
        <Text style={styles.navButtonText}>To</Text>
        <Picker
          selectedValue={selectedTo}
          style={{height: 50, width: 200, backgroundColor: 'white'}}
          onValueChange={(itemValue, itemIndex) => setSelectedTo(itemValue)}>
          {<Picker.Item label="Select Destination" />}
          {selectedFrom !== 'Dhaka' && (
            <Picker.Item label="Dhaka" value="Dhaka" />
          )}
          {selectedFrom !== 'Chittagong' && (
            <Picker.Item label="Chittagong" value="Chittagong" />
          )}
          {selectedFrom !== 'Rajshahi' && (
            <Picker.Item label="Rajshahi" value="Rajshahi" />
          )}
          {selectedFrom !== 'Sylhet' && (
            <Picker.Item label="Sylhet" value="Sylhet" />
          )}
        </Picker>
        <Text style={styles.navButtonText}>Time</Text>
        <Picker
          selectedValue={selectedTime}
          style={{
            height: 50,
            width: 200,
            backgroundColor: 'white',
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}>
          {<Picker.Item label="10am" value="10am" />}
          {<Picker.Item label="11am" value="11am" />}
          {<Picker.Item label="12am" value="12am" />}
          {<Picker.Item label="4pm" value="4pm" />}
          {<Picker.Item label="5pm" value="5pm" />}
        </Picker>
        <Text style={styles.navButtonText}>Bus</Text>
        <Picker
          selectedValue={busName}
          style={{
            height: 50,
            width: 200,
            backgroundColor: 'white',
            marginBottom: 20,
          }}
          onValueChange={(itemValue, itemIndex) => setBusName(itemValue)}>
          {<Picker.Item label="Select Bus" />}

          {/* {((selectedFrom === 'Dhaka' && selectedTo === 'Chittagong') ||
            (selectedFrom === 'Chittagong' && selectedTo === 'Dhaka')) && (
            <>
              <Picker.Item label="Green Line" value="greenline" />
              <Picker.Item label="Star Line" value="starline" />
              <Picker.Item label="Star Line AC" value="starlineac" />
            </>
          )} */}

          {/* Dhaka to anywhere, anywhere to Dhaka Start */}
          {((selectedFrom === 'Dhaka' && selectedTo === 'Chittagong') ||
            (selectedFrom === 'Chittagong' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Green Line" value="greenline" />
          )}
          {((selectedFrom === 'Dhaka' && selectedTo === 'Chittagong') ||
            (selectedFrom === 'Chittagong' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Star Line" value="starline" />
          )}
          {((selectedFrom === 'Dhaka' && selectedTo === 'Chittagong') ||
            (selectedFrom === 'Chittagong' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Star Line AC" value="starlineac" />
          )}

          {((selectedFrom === 'Dhaka' && selectedTo === 'Sylhet') ||
            (selectedFrom === 'Sylhet' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Ena AC" value="enaac" />
          )}
          {((selectedFrom === 'Dhaka' && selectedTo === 'Sylhet') ||
            (selectedFrom === 'Sylhet' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Ena Non-AC" value="enanonac" />
          )}

          {((selectedFrom === 'Dhaka' && selectedTo === 'Rajshahi') ||
            (selectedFrom === 'Rajshahi' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Hanif" value="hanif" />
          )}
          {((selectedFrom === 'Dhaka' && selectedTo === 'Rajshahi') ||
            (selectedFrom === 'Rajshahi' && selectedTo === 'Dhaka')) && (
            <Picker.Item label="Symoly" value="symoly" />
          )}
          {/* Dhaka to anywhere, anywhere to Dhaka End */}

          {/* Chittagong Division Start */}
          {((selectedFrom === 'Chittagong' && selectedTo === 'Rajshahi') ||
            (selectedFrom === 'Rajshahi' && selectedTo === 'Chittagong')) && (
            <Picker.Item label="Green Line" value="greenline" />
          )}
          {((selectedFrom === 'Chittagong' && selectedTo === 'Sylhet') ||
            (selectedFrom === 'Sylhet' && selectedTo === 'Chittagong')) && (
            <Picker.Item label="Hanif AC" value="hanifac" />
          )}
          {/* Chittagong Division End */}

          {/* Rajshahi Division Start */}
          {((selectedFrom === 'Rajshahi' && selectedTo === 'Sylhet') ||
            (selectedFrom === 'Sylhet' && selectedTo === 'Rajshahi')) && (
            <Picker.Item label="Hanif AC" value="hanifac" />
          )}
          {/* Rajshahi Division End */}
          
        </Picker>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 25,
            marginTop: 10,
            marginBottom: 15,
          }}>
          Cost BDT {price}
        </Text>
        <Button
          title="Next"
          color="#841584"
          onPress={() => {
            getSingleBusInformation(busId);
            navigation.navigate('Seat');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
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
    padding: 20,
  },
});
