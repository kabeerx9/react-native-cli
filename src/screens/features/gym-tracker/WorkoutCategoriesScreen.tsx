import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';
import {MUSCLE_GROUPS} from '../../../constants/contstants';

const WorkoutCategoriesScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Workout Category</Text>
      {MUSCLE_GROUPS.map(category => (
        <Card style={styles.card} key={category.id}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WorkoutDetails', {
                muscleGroupName: category.name,
                muscleGroupId: category.id,
              });
            }}>
            <Text style={styles.cardText}>{category.name}</Text>
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
