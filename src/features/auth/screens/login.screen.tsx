/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {useEffect, useState} from 'react';
import {Alert, Image, Linking, Platform} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '@shopify/restyle';
import {
  Box,
  Spacer,
  TextInput,
  LinkButton,
  RadioButton,
  Button,
  Dropdown,
} from '@components';
import {useStores} from '@/store';
import {Theme} from '@/theme';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {pdfBase64} from '../constants/pdf';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {FullScreenProgress} from '@/library/components';

interface LoginProps {
  navigation: NavigationProp<ParamListBase>;
}

export const Login = observer((props: LoginProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
  } = useForm();
  const {images} = useTheme<Theme>();
  //const [loading, setLoading] = useState<boolean>(true);
  const {
    accountStore,
    accountStore: {isLoggedIn},
  } = useStores();
  const [labRoleList, setlabRoleList] = useState({labList: [], roleList: []});

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

  const share = async () => {
    try {
      if (Platform.OS !== 'ios') {
        const shareOptions = {
          url: 'data:application/pdf;base64,' + pdfBase64,
          filename: 'tech-abl',
        };
        await Share.open(shareOptions);
      } else {
        const dirs: any = RNFetchBlob.fs.dirs;
        const path = dirs.DocumentDir + '/' + 'tech-abl.pdf';
        console.log({path});

        RNFetchBlob.fs
          .writeFile(path, pdfBase64, 'base64')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then(result => {
            Share.open({
              subject: 'Pdf share',
              url: path,
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log({error});
    }
  };

  const onLogin = async (data: any) => {
    accountStore.authService.userService
      .onLogin({
        input: {
          user: accountStore.inputLogin,
          loginActivity: {
            device: 'Mobile',
            platform: Platform.OS,
          },
        },
      })
      .then(res => {
        if (res.login.success === 1) {
          if (!res.login.data.user.passChanged) {
            Alert.alert('Please change password using web app');
          } else {
            if (res.login.data.user?.noticeBoard !== undefined) {
              Alert.alert(
                'But don’t worry! \nWe’ll let you know as soon as\nthis technical issue is resolved.',
              );
            } else {
              accountStore.updateLoginParams(res.login.data.user);
              props.navigation?.navigate('otpVerify', {
                resUser: Object.assign(res.login.data.user, {
                  password: accountStore.inputLogin.password,
                }),
              });
              accountStore.clearInputUser();
            }
          }
        } else {
          Alert.alert(res.login.message);
        }
      })
      .catch(error => {
        Alert.alert(
          'But don’t worry! \nWe’ll let you know as soon as\nthis technical issue is resolved.',
        );
      });
  };

  return (
    <>
      <Box width="100%" height="100%" padding="md" backgroundColor="black">
        <Box height="20%" alignItems="center" justifyContent="center">
          <Image
            source={images?.appLogo}
            style={{height: '80%', marginTop: 20, width: '80%'}}
            resizeMode="contain"
          />
        </Box>
        <Box height="70%">
          <Spacer multiplier={0.6} />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput
                keyboardTypeValue="default"
                onBlur={userId => {
                  if (userId) {
                    accountStore.authService.userService
                      .checkExitsUserId(userId.trim())
                      .then((res: any) => {
                        if (res.checkUserExitsUserId.success) {
                          const {
                            data: {user},
                          } = res.checkUserExitsUserId;
                          setValue('lab', user.defaultLab);
                          clearErrors('lab');
                          if (user.role.length == 1) {
                            setValue('role', user.role[0].code);
                          }
                          clearErrors('role');
                          accountStore.updateInputUser({
                            ...accountStore.inputLogin,
                            lab: user.defaultLab,
                            role:
                              user.role.length == 1 ? user.role[0].code : '',
                          });
                          // labStore.fetchListLab();
                          // roleStore.fetchListRole();
                          setlabRoleList({
                            labList: user.lab,
                            roleList: user.role,
                          });
                        } else {
                          Alert.alert(res.checkUserExitsUserId.message);
                        }
                      });
                  }
                }}
                value={accountStore.inputLogin?.userId}
                hasError={!!errors.userId}
                placeholder="User Id"
                onChangeText={(userId: string) => {
                  onChange(userId);
                  accountStore.updateInputUser({
                    ...accountStore.inputLogin,
                    userId: userId.toUpperCase(),
                  });
                }}
              />
            )}
            name="userId"
            rules={{required: true}}
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
            rules={{required: true}}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={'Select Lab'}
                displayKey="name"
                data={labRoleList.labList || []}
                onSelect={(item: any) => {
                  onChange(item.code);
                  accountStore.updateInputUser({
                    ...accountStore.inputLogin,
                    lab: item.code,
                  });
                }}
              />
            )}
            name="lab"
            rules={{required: true}}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={'Select Role'}
                data={labRoleList.roleList || []}
                displayKey="description"
                onSelect={(item: any) => {
                  onChange(item.code);
                  accountStore.updateInputUser({
                    ...accountStore.inputLogin,
                    role: item.code,
                  });
                }}
              />
            )}
            name="role"
            rules={{required: true}}
            defaultValue=""
          />
          <Spacer multiplier={0.6} />
          <RadioButton
            title="Remember Me"
            isChecked={accountStore.rememberMe}
            checkIcon="check-square-o"
            unCheckIcon="stop"
            onCheckChange={() => {
              accountStore.updateRememberMe(!accountStore.rememberMe);
            }}
          />
          <Spacer multiplier={1} />
          <Button
            label="Login"
            labelColor="black"
            onPress={handleSubmit(onLogin)}
          />
          <Spacer multiplier={1} />
        </Box>
        {/* <Box height="10%" flexDirection="row" justifyContent="space-around">
        <LinkButton
          label="Terms & Conditions"
          onPress={() => Linking.openURL('https://lims-plus-854e4.web.app/')}
        />
        <LinkButton
          label="Privacy Policy"
          onPress={() => Linking.openURL('https://lims-plus-854e4.web.app/')}
        />
      </Box> */}
      </Box>
    </>
  );
});
