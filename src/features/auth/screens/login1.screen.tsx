import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useForm, Controller} from 'react-hook-form';
import {Box, Spacer, TextInput, Button} from '@components';
import {useStores} from '@/store';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {FormHelper} from '../../../core-utils';
import {Storage} from '@/library/modules';
import {constants} from '@/library/utils/constants';

interface LoginProps {
  navigation: NavigationProp<ParamListBase>;
}

export const Login1 = observer((props: LoginProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  //const [loading, setLoading] = useState<boolean>(true);

  const {
    accountStore,
    accountStore: {isLoggedIn},
  } = useStores();

  useEffect(() => {
    if (isLoggedIn) {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'dashboardStack'}],
      });
    }
    // setTimeout(() => {
    //   setLoading(false);
    // }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const onLogin = async (data: any) => {
    await Storage.setItemAsync(
      constants.isEmail,
      accountStore.inputLogin?.email,
    );
    props.navigation.reset({
      index: 0,
      routes: [{name: 'dashboardStack'}],
    });
  };

  return (
    <>
      <Box
        width="100%"
        height="100%"
        padding="md"
        backgroundColor="black"
        justifyContent="center">
        <Box>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput
                keyboardTypeValue="email-address"
                value={accountStore.inputLogin?.email}
                hasError={!!errors.email}
                placeholder="Email"
                onChangeText={(email: string) => {
                  onChange(email);
                  accountStore.updateInputUser({
                    ...accountStore.inputLogin,
                    email,
                  });
                }}
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: FormHelper.patterns.nonEmptyString,
              validate: value => FormHelper.isEmailValid(value),
            }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({field: {value, onChange, onBlur}}) => (
              <TextInput
                keyboardTypeValue="default"
                secureTextEntry={true}
                onBlur={() => onBlur()}
                value={value}
                hasError={!!errors.password}
                placeholder="Password"
                onChangeText={(password: string) => {
                  onChange(password);
                  accountStore.updateInputUser({
                    ...accountStore.inputLogin,
                    password,
                  });
                }}
              />
            )}
            name="password"
            rules={{
              required: true,
              pattern: FormHelper.patterns.password,
            }}
            defaultValue=""
          />
          <Spacer multiplier={1} />
          <Button
            label="Login"
            labelColor="black"
            onPress={handleSubmit(onLogin)}
            disabled={
              FormHelper.isEmailValid(accountStore.inputLogin.email) &&
              FormHelper.isPasswordValid(accountStore.inputLogin.password)
                ? false
                : true
            }
          />
          <Spacer multiplier={1} />
        </Box>
      </Box>
    </>
  );
});
