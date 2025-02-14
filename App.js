



import * as React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as KeyboardProvider } from './src/context/KeyBoardContext';
import { Provider as CrosswordProvider } from './src/context/CrosswordContext';
import { navigationRef } from './src/navigationRef';
import HomeScreen from './src/screens/HomeScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AccountScreen from "./src/screens/AccountScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import LandingScreen from "./src/screens/LandingScreen";
import GameScreen from "./src/screens/GameScreen";
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <AuthProvider>
        <KeyboardProvider>
          <CrosswordProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator screenOptions={{ headerBackVisible: false }}>
                <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </CrosswordProvider>
        </KeyboardProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default MyStack;
// 
// import React from "react";
// import { StatusBar } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import AccountScreen from "./src/screens/AccountScreen";
// import SettingsScreen from "./src/screens/SettingsScreen";
// import SigninScreen from "./src/screens/SigninScreen";
// import SignupScreen from "./src/screens/SignupScreen";
// import LandingScreen from "./src/screens/LandingScreen";
// import GameScreen from "./src/screens/GameScreen";
// import { Provider as AuthProvider } from './src/context/AuthContext';
// import { Provider as KeyboardProvider } from './src/context/KeyBoardContext';
// import { Provider as CrosswordProvider } from './src/context/CrosswordContext';
// import { setNavigator } from './src/navigationRef';
// import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
// 
// const switchNavigator = createSwitchNavigator({
//   ResolveAuth: ResolveAuthScreen,
//   loginFlow: createStackNavigator({
//     Signin: {
//       screen: SigninScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     Signup: {
//       screen: SignupScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//   }),
//   Play: createStackNavigator({
//     Landing: {
//       screen: LandingScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     Game: {
//       screen: GameScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     Account: {
//       screen: AccountScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     Settings: {
//       screen: SettingsScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//   })
// });
// 
// const App = createAppContainer(switchNavigator);
// 
// export default () => {
//   return (
//     <SafeAreaProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <StatusBar hidden={true} />
//         <AuthProvider>
//           <KeyboardProvider>
//             <CrosswordProvider>
//               <App
//                 ref={(navigator) => {
//                   setNavigator(navigator);
//                 }}
//               />
//             </CrosswordProvider>
//           </KeyboardProvider>
//         </AuthProvider>
//       </GestureHandlerRootView>
//     </SafeAreaProvider>
//   );
// };