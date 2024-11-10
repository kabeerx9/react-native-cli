import React from 'react';
import {Button, Text, View} from 'react-native';
import {demoApi} from '../api/demoApi';
import {useAuth} from '../context/auth-context';

export const FirstTabScreen = () => {
  const {isSignedIn} = useAuth();
  const [result, setResult] = React.useState<string>('');

  const makeApiCall = async () => {
    try {
      const response = await demoApi.fetchProtectedData();
      setResult(response.data);
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text>Auth Status: {isSignedIn ? 'Signed In' : 'Signed Out'}</Text>
      <Text>Last Result: {result}</Text>
      <Button title="Make API Call" onPress={makeApiCall} />
    </View>
  );
};
