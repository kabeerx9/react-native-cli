import {Button, Text} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';

function DetailsScreen({route, navigation}: any) {
  console.log('Params in Details Screen', route.params);
  return (
    <View>
      <Text>Details Screen</Text>
      <Button
        onPressOut={() => {
          navigation.navigate('Home', {
            name: 'Dirty Nigger',
          });
        }}>
        Go to Home Screen
      </Button>
      <Button
        onPressIn={() => {
          navigation.goBack();
        }}>
        Go Back
      </Button>
      <Button
        onPressIn={() => {
          navigation.setOptions({title: 'Changed Heading'});
        }}>
        Change Heading
      </Button>
      <Button
        onPressIn={() => {
          navigation.navigate('TabScreen');
        }}>
        Go To Tabs Screen
      </Button>
    </View>
  );
}

export default DetailsScreen;
