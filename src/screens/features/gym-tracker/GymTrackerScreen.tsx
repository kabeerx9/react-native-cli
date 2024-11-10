// GymTrackerScreen.tsx
import {useNavigation} from '@react-navigation/native'; // Import navigation hook
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const GymTrackerScreen = () => {
  const navigation = useNavigation();

  const handleAddWorkout = () => {
    navigation.navigate('WorkoutCategories'); // Navigate to the WorkoutCategories screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to your Gym Tracker!</Text>
      <Button mode="contained" onPress={handleAddWorkout}>
        Add a Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default GymTrackerScreen;
