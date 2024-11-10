import React, {useState} from 'react';
import {Keyboard, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Snackbar,
  TextInput,
  Title,
} from 'react-native-paper';
import {useAuth} from '../context/auth-context';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false); // for Snackbar
  const [loading, setLoading] = useState(false); // for loading state
  const {signIn} = useAuth();

  const onSignInPress = async () => {
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      setVisible(true); // show snackbar on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flex: 1, justifyContent: 'center', padding: 16}}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Card style={{borderRadius: 12, padding: 16, elevation: 5}}>
          <Card.Content>
            <Title
              style={{
                textAlign: 'center',
                marginBottom: 16,
                fontWeight: 'bold',
              }}>
              Sign In
            </Title>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={{marginBottom: 16}}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="email"
              left={<TextInput.Icon name="email" />}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{marginBottom: 16}}
              left={<TextInput.Icon name="lock" />}
              mode="outlined"
            />
            <Button
              mode="contained"
              onPress={onSignInPress}
              loading={loading}
              disabled={loading || !email || !password}
              style={{paddingVertical: 6, marginBottom: 16}}
              contentStyle={{flexDirection: 'row', justifyContent: 'center'}}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                'Sign In'
              )}
            </Button>

            <Paragraph style={{textAlign: 'center', marginBottom: 8}}>
              Don't have an account?{' '}
              <Button mode="text" onPress={() => {}}>
                Sign Up
              </Button>
            </Paragraph>
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={{backgroundColor: 'tomato'}}>
        Error signing in. Please check your credentials.
      </Snackbar>
    </ScrollView>
  );
}
