import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { connect, useDispatch, useStore } from 'react-redux';

import { loginRequest, signupRequest } from 'app/reducers/auth/actions';

interface Props {}

const SigupForm: React.FC<{ setMode: Function }> = ({ setMode }) => {
  const registerForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      last_name: '',
      birthdate: '',
    },
  });
  const dispatch = useDispatch();
  const onSignupSubmit = data => {
    dispatch(signupRequest(data));
  };
  React.useEffect(() => {
    registerForm.reset({
      email: 'test@example.com',
      password: 'qwerty123',
      name: 'Tester',
      last_name: 'Testson',
      birthdate: '1974-05-01',
    });
  }, []);
  return (
    <>
      <Text style={styles.label}>Email address</Text>
      <Controller
        control={registerForm.control}
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
      {registerForm.formState.errors.email && (
        <Text style={styles.errorText}>This is required.</Text>
      )}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={registerForm.control}
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
      {registerForm.formState.errors.password && (
        <Text style={styles.errorText}>This is required.</Text>
      )}
      <Text style={styles.label}>Name</Text>
      <Controller
        control={registerForm.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Last name</Text>
      <Controller
        control={registerForm.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="last_name"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Birthdate</Text>
      <Controller
        control={registerForm.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="birthdate"
        rules={{ required: true }}
      />
      <View style={styles.button}>
        <Button
          title="Register"
          color="white"
          onPress={registerForm.handleSubmit(onSignupSubmit)}
        />
      </View>
      <View style={styles.orButton}>
        <Button title="Login" color="white" onPress={() => setMode(true)} />
      </View>
    </>
  );
};
const loginData = []
const LoginScreen: React.FC<Props> = () => {
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loginMode, setMode] = React.useState<boolean>(true);
  const dispatch = useDispatch();
  const onLoginSubmit = data => {
    
    dispatch(loginRequest(data));
  };

  React.useEffect(() => {
    loginForm.reset(loginData[1]);
  }, []);

  return (
    <View style={styles.container}>
      {loginMode ? (
        <>
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
              onPress={() => setMode(false)}
            />
          </View>
        </>
      ) : (
        <SigupForm setMode={setMode} />
      )}
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
