// WorkoutCategoriesScreen.tsx
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';

const WorkoutCategoriesScreen = () => {
  const categories = ['Biceps', 'Chest', 'Back', 'Legs', 'Shoulders'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Workout Category</Text>
      {categories.map(category => (
        <Card style={styles.card} key={category}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.cardText}>{category}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    padding: 10,
  },
  cardText: {
    fontSize: 18,
  },
});

export default WorkoutCategoriesScreen;
