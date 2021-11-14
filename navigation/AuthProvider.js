import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState('Dhaka');
  const [selectedTo, setSelectedTo] = useState('Chittagong');
  const [selectedTime, setSelectedTime] = useState('10am');
  const [busInfoFromStore, setBusInfoFromStore] = useState(null);
  const [busName, setBusName] = useState('greenline');
  const [price, setPrice] = useState('1000');
   const [selectedSeat, setSelectedSeat] = useState({bookedSeats: []});
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert('Email or password is not valid');
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: '',
                    lname: '',
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error,
                    );
                  });
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                Alert.alert('This email has already used');
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
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
        selectedSeat,
        setSelectedSeat,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
