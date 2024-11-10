// App.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button} from '@react-navigation/elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {SignInScreen} from './src/components/signin-screen';
import {SplashScreen} from './src/components/splash-screen';
import {AuthProvider, useAuth} from './src/context/auth-context';
import GymStack from './src/navigation/GymStack';
import GlucoseTrackerScreen from './src/screens/Tabs/glucose-tracker';

// Navigation Components
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Gym" component={GymStack} />
      <Tab.Screen name="Glucose" component={GlucoseTrackerScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {isLoading, isSignedIn, signOut} = useAuth();

  // Show splash screen while checking auth state
  if (isLoading || isSignedIn === null) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={({route}) => {
        // Define default options here
        let options = {
          headerShown: false, // Default to hiding headers
        };

        // Override options for specific screens when logged in
        if (isSignedIn) {
          options.headerShown = true;

          // Show the sign-out button only on screens in the main app flow
          if (route.name === 'Home') {
            options.headerRight = () => (
              <Button onPress={signOut} title="Sign Out" />
            );
          }

          // Set specific header titles for other screens
          if (route.name === 'Home') {
            options.title = route?.params?.name || 'Home';
          } else if (route.name === 'Details') {
            options.title = 'Details';
          }
        }

        return options;
      }}>
      {!isSignedIn ? (
        // Authentication Screen (when signed out)
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : (
        <>
          {/* Main app screens when signed in */}
          <Stack.Screen name="Home" component={HomeTabNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
