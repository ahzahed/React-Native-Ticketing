import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
  <Button title="Skip" color="#000000" />
)
const Next = ({...props}) => (
  <Button title="Next" color="#000000" {...props} />
)
const Done = ({...props}) => (
  // <Button title="Next" color="#000000" {...props} />
  <TouchableOpacity style={{marginHorizontal:10}} {...props}>
    <Text style={{fontSize:16}}>Done</Text>
  </TouchableOpacity>
)
const Dots = ({selected}) =>{
  let backgroundColor;
  backgroundColor = selected? 'rgba(0,0,0,0.8)':'rgba(0,0,0,0.3)';
  return(
    <View style={{width:5, height:5, marginHorizontal: 3, backgroundColor}}/>
  )
}
const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace('Login')}
        onDone={() => navigation.navigate('Login')}
  pages={[
    {
      backgroundColor: '#a6e4d0',
      image: <Image source={require('../assets/bus1.png')} />,
      title: '',
      subtitle: 'Book Now!',
    },
    {
      backgroundColor: '#fdeb93',
      image: <Image source={require('../assets/2.jpg')} />,
      title: '',
      subtitle: 'Have a safe and relaxed journey',
    },
  ]}
/>

    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
