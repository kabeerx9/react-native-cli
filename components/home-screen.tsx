import {Button, Text} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';

function HomeScreen({route, navigation}: any) {
  console.log('Params in Home Screen', route.params);
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        onPressIn={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}>
        Go to Details Screen
      </Button>
      <Button
        onPressIn={() => {
          navigation.navigate('TabScreen');
        }}>
        Go To Tabs Screen
      </Button>
      <Button
        onPressIn={() => {
          navigation.navigate('DrawerScreen');
        }}>
        Go To Drawer Screen
      </Button>
      <Button
        onPressIn={() => {
          navigation.navigate('DrawerScreen', {
            screen: 'Second',
            params: {
              name: 'Kabeer in 2nd drawer',
            },
          });
        }}>
        Go To Second Drawer screen Screen
      </Button>
    </View>
  );
}

export default HomeScreen;
