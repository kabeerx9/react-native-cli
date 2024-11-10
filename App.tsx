// App.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button} from '@react-navigation/elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import DetailsScreen from './components/details-screen';
import {FirstTabScreen} from './components/firsttab-screen';
import HomeScreen from './components/home-screen';
import {SignInScreen} from './components/signin-screen';
import {SplashScreen} from './components/splash-screen';
import {AuthProvider, useAuth} from './context/auth-context';

// Existing screens

const SecondTabScreen = () => <Text>Second Tab Screen</Text>;
const FirstDrawerScreen = () => <Text>First Drawer Screen</Text>;
const SecondDrawerScreen = ({route}: any) => {
  const name = route?.params?.name ?? 'No name';
  return <Text>Second Drawer Screen {name}</Text>;
};

// Navigation Components
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name="First" component={FirstTabScreen} />
    <Tab.Screen name="Second" component={SecondTabScreen} />
  </Tab.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="First" component={FirstDrawerScreen} />
    <Drawer.Screen name="Second" component={SecondDrawerScreen} />
  </Drawer.Navigator>
);

// Main App Stack (When Signed In)
const MainStack = () => {
  const {signOut} = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => <Button onPress={signOut}>Sign Out</Button>,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{name: 'Niggesh'}}
        options={({route}) => ({
          title: route?.params?.name || 'Home',
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: 'Details'}}
      />
      <Stack.Screen
        name="TabScreen"
        component={TabNavigator}
        options={{
          title: 'Tabs',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="DrawerScreen"
        component={DrawerNavigator}
        options={{
          title: 'Drawer',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const {isLoading, isSignedIn} = useAuth();

  // Show splash screen while checking auth state
  if (isLoading || isSignedIn === null) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isSignedIn ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
