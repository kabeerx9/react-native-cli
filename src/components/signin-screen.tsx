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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Card style={{borderRadius: 12, padding: 24, elevation: 5}}>
          <Card.Content>
            <Title
              style={{
                textAlign: 'center',
                marginBottom: 20,
                fontWeight: 'bold',
                fontSize: 28,
                color: '#6200ee',
              }}>
              Sign In
            </Title>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                marginBottom: 16,
                backgroundColor: '#fff',
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="email"
              left={
                <TextInput.Icon name={() => <Icon name="email" size={20} />} />
              }
              mode="outlined"
              theme={{
                colors: {primary: '#6200ee', underlineColor: 'transparent'},
              }}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                marginBottom: 24,
                backgroundColor: '#fff',
              }}
              left={
                <TextInput.Icon name={() => <Icon name="lock" size={20} />} />
              }
              mode="outlined"
              theme={{
                colors: {primary: '#6200ee', underlineColor: 'transparent'},
              }}
            />

            <Button
              mode="contained"
              onPress={onSignInPress}
              loading={loading}
              disabled={loading}
              style={{
                marginBottom: 24,
                borderRadius: 30,
                backgroundColor: '#6200ee',
              }}
              contentStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
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
        style={{
          backgroundColor: '#d32f2f',
          borderRadius: 8,
        }}>
        Error signing in. Please check your credentials.
      </Snackbar>
    </ScrollView>
  );
}
