// import React, { useEffect, useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'

// import OnboardingScreen from './screens/OnboardingScreen'
// import LoginScreen from './screens/LoginScreen'
// import AsyncStorage from '@react-native-community/async-storage'


// const AppStack = createStackNavigator()

// const App = () => {
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null)
//   useEffect(()=>{
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if(value === null){
//         AsyncStorage.setItem('alreadyLaunched','true')
//         setIsFirstLaunch(true)
//       }
//       else{
//         setIsFirstLaunch(false)
//       }
//     })
//   },[])
//   if(isFirstLaunch === null){
//     return null
//   }
//   else if(isFirstLaunch === true){
//     return (
//         <NavigationContainer>
//           <AppStack.Navigator
//             headerShown="false"
//           >
//             <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
//             <AppStack.Screen name="Login" component={LoginScreen} />
//           </AppStack.Navigator>
//         </NavigationContainer>
//       )
//   }
//   else{
//    return <LoginScreen />
//   }
// }

// export default App

import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import Providers from './navigation'

const App = () => {
  return <Providers />
}

export default App
