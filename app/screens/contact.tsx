import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import {
  uploadAvatarRequest,
  userDataRequest,
  userSaveRequest,
} from '../reducers/User/actions';
import { compareTwoDates, getFormattedDate } from '../utils/dataUtils';
import ImagePicker from '../components/ImagePicker';
import { Asset } from 'react-native-image-picker';

interface Props {
  userState: State;
  navigation: any;
  onCallApi: Function;
  userToken: string;
}
const ContactScreen: React.FC<Props> = ({
  userState,
  onCallApi,
  userToken,
  navigation,
}) => {
  let user: User = userState.data;

  const [date, setDate] = React.useState<Date>(new Date());
  const [open, setOpen] = React.useState<boolean>(false);

  const [currentUser, setUser] = React.useState<User>(user);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      last_name: '',
      birthdate: getFormattedDate(date),
    },
  });
  const onSubmit = (data: User) => {
    const isDateCorrect = compareTwoDates(
      date,
      new Date(),
      3600 * 24 * 365 * 3,
    );
    if (isDateCorrect) {
      let tempUser: User = {
        ...user,
        ...data,
        birthdate: user.birthdate || getFormattedDate(date),
      };
      onCallApi(userSaveRequest({ user: data, userToken: userToken }));
      setUser(tempUser);
      navigation.navigate('EducationScreen');
    } else {
      setError('birthdate', {});
    }
  };

  const handleUploadPhoto = (photo: Asset) => {
    onCallApi(
      uploadAvatarRequest({
        user: currentUser,
        userToken: userToken,
        photo: photo,
      }),
    );
  };

  React.useEffect(() => {
    if (user) {
      let tempUser: User = {
        ...user,
        birthdate: user.birthdate || getFormattedDate(date),
      };
      reset(tempUser);
      if (user.birthdate) setDate(new Date(user.birthdate));
      setUser(tempUser);
    } else {
      onCallApi(userDataRequest({ userToken: userToken }));
    }
  }, [userState]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First name</Text>
      <Controller
        control={control}
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
      {errors.name && <Text style={styles.errorText}>This is required.</Text>}
      <Text style={styles.label}>Last name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="last_name"
        rules={{ required: false }}
      />
      <Text style={styles.label}>Birthdate</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text>{value}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                onChange(getFormattedDate(date));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        )}
        name="birthdate"
        rules={{ required: false }}
      />
      {errors.birthdate && (
        <Text style={styles.errorText}>Please select a correct date.</Text>
      )}
      <View style={styles.imageViewer}>
        <ImagePicker
          handleUploadPhoto={handleUploadPhoto}
          avatarURL={currentUser ? currentUser.avatar : ''}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Back" onPress={() => {}} />
        </View>

        <View style={styles.button}>
          <Button
            color="white"
            title="Next Step"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  buttonInner: {
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  imageViewer: {
    height: 100,
    width: 100,
    paddingTop: 5,
  },
});

const mapStateToProps = (state: GlobalState) => {
  return {
    userToken: state.auth.data.token,
    userState: state.user,
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
)(ContactScreen);
