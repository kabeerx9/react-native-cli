import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';

function HomeScreen({route, navigation}: any) {
  return (
    <View>
      <Text>This is the Home screen </Text>

      <Button icon={'camera'}>Button </Button>
    </View>
  );
}

export default HomeScreen;
