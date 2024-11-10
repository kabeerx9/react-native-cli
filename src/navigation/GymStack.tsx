import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import GymTrackerScreen from '../screens/features/gym-tracker/GymTrackerScreen';
import WorkoutCategoriesScreen from '../screens/features/gym-tracker/WorkoutCategoriesScreen';

const Stack = createStackNavigator();

const GymStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GymTracker" component={GymTrackerScreen} />
      <Stack.Screen
        name="WorkoutCategories"
        component={WorkoutCategoriesScreen}
      />
    </Stack.Navigator>
  );
};

export default GymStack;
