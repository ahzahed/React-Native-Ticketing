import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, ScrollView, View, Alert} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

const Payment = ({navigation}) => {
  const {selectedSeat, setSelectedSeat, price} = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 25,
            marginTop: 15,
            marginBottom: 15,
          }}>
          Your Cost: BDT {selectedSeat.bookedSeats.length * price}
        </Text>
        <Button
          title="Pay Now"
          onPress={() => {
            setSelectedSeat({bookedSeats: []});
            Alert.alert(
              'Thank You!',
              `You payment BDT ${
                selectedSeat.bookedSeats.length * price
              } has been accepted!`,
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Payment;

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
