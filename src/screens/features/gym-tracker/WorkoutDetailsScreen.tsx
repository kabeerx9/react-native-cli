import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  Paragraph,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {MUSCLE_GROUPS_WITH_EXERCISES} from '../../../constants/contstants';

const WorkoutDetailsScreen = ({route, navigation}) => {
  const muscleGroupName = route.params.muscleGroupName || 'chest';
  const muscleGroupId = route.params.muscleGroupId;
  const exercises = MUSCLE_GROUPS_WITH_EXERCISES[muscleGroupName];

  const handleExercisePress = (exercise: any) => {
    navigation.navigate('SingleExercise');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Muscle Group: {muscleGroupName}</Title>
      <Paragraph>Muscle Group ID: {muscleGroupId}</Paragraph>
      {exercises.map(exercise => (
        <TouchableRipple
          key={exercise.id}
          onPress={() => handleExercisePress(exercise)}
          rippleColor="rgba(0, 0, 0, .32)"
          style={styles.exerciseItem}>
          <Card mode="outlined" style={styles.card}>
            <Card.Content>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
            </Card.Content>
          </Card>
        </TouchableRipple>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  exerciseItem: {
    marginVertical: 8,
  },
  card: {
    elevation: 2,
  },
  exerciseName: {
    fontSize: 16,
  },
});

export default WorkoutDetailsScreen;
