import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';

import { loginRequest } from 'app/reducers/auth/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from './types';

interface Props {
  navigation: StackNavigationProp<StackParamList, 'LoginScreen'>
  route: RouteProp<StackParamList, "LoginScreen">;
}

const loginData = []
const LoginScreen: React.FC<Props> = () => {
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const onLoginSubmit = data => {
    dispatch(loginRequest(data));
  };

  React.useEffect(() => {
    loginForm.reset(loginData[1]);
  }, []);

  return (
    <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={loginForm.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                onBlur={onBlur}
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
          />
          {loginForm.formState.errors.email && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <Controller
            control={loginForm.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {loginForm.formState.errors.password && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <View style={styles.button}>
            <Button
              title="Login"
              color="white"
              onPress={loginForm.handleSubmit(onLoginSubmit)}
            />
          </View>
          <View style={styles.orButton}>
            <Button
              title="Register"
              color="white"
              onPress={() => {}}
            />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 10,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#0e101c',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  orButton: {},
  errorText: {
    color: 'red',
  },
});

const mapStateToProps = (state: GlobalState) => {
  return {
    sendNetworkFail: state.network,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onCallApi: (object: Action) => dispatch(object),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
