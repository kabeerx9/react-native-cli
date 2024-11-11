import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import GymTrackerScreen from '../screens/features/gym-tracker/GymTrackerScreen';
import WorkoutCategoriesScreen from '../screens/features/gym-tracker/WorkoutCategoriesScreen';
import WorkoutDetailsScreen from '../screens/features/gym-tracker/WorkoutDetailsScreen';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GraphScreen from '../screens/features/single-excercise-tab/GraphScreen';
import HistoryScreen from '../screens/features/single-excercise-tab/HistoryScreen';
import TrackScreen from '../screens/features/single-excercise-tab/TrackScreen';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

const SingleExerciseTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Graph" component={GraphScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
};

const GymStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GymTracker" component={GymTrackerScreen} />
      <Stack.Screen
        name="WorkoutCategories"
        component={WorkoutCategoriesScreen}
      />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="SingleExercise" component={SingleExerciseTab} />
    </Stack.Navigator>
  );
};

export default GymStack;
