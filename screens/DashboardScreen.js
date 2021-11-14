import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DashboardScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [loggedUserBookedSeat, setLoggedUserBookedSeat] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUser = async userId => {
    const userRef = firestore().doc(`users/${userId}`);
    try {
      const snapShot = await userRef.get();
      if (snapShot.exists) {
        snapShot.data().bookedSeats &&
          setLoggedUserBookedSeat(snapShot.data().bookedSeats);
        setLoading(false);
        return;
      } else {
        await userRef.set({
          bookedSeats: [],
          uid: userId,
        });
        setLoading(false);
        const updatedSnapShot = await userRef.get();
        return updatedSnapShot.data();
      }
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    getUser(user.uid);
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Button
          title="Home"
          onPress={() => navigation.navigate('Home')}
          color="blue"
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 5,
            marginTop: 10,
          }}>
          <Text style={{color: 'black', fontSize: 20}}>{user.email} </Text>
          <Button title="Logout" onPress={() => logout()} />
        </View>
        {loggedUserBookedSeat.length > 0 ? (
          loggedUserBookedSeat.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#ebebe0',
                  marginVertical: 10,
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 2,
                }}>
                <Text style={{color: 'black', fontSize: 20}}>
                  Bus Id: {item.busId}
                </Text>
                <Text style={{color: 'black', fontSize: 20}} key={index}>
                  Seat Number:{' '}
                  {item.bookedSeats.map((seat, index) => (
                    <Text key={index}>{seat} </Text>
                  ))}
                </Text>
              </View>
            );
          })
        ) : (
          <View>
            <Text style={{color: 'black', fontSize: 20, marginTop: 15}}>
              Your seat list is empty!
            </Text>
            <Button
              title="Book Now"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
});
