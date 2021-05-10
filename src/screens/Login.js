import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner, CheckBox, Form, Picker} from 'native-base';
import firebaseAuth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectType, setSelectType] = useState('users');
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  AsyncStorage.setItem('type', selectType);
  const handleLogin =  () => {
    const {email, password} = loginState;
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please enter email and password',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    } else {
      setLoading(true);
      firebaseAuth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Invalid Email',
              // text2: 'Please provide a different mail id',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          if (err.code === 'auth/user-not-found') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'User Not found',
              // text2: 'Please provide a different mail id',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          if (err.code === 'auth/wrong-password') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Wrong password',
              // text2: 'Please provide a different mail id',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
        });
    }
  };

  // const PickerSelect = () => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         width: width * 0.98,
  //         // height: height * 0.05,
  //         alignSelf: 'center',
  //         justifyContent: 'space-between',
  //       }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: width * 0.3,
  //           justifyContent: 'space-around',
  //         }}>
  //         <View>
  //           <CheckBox
  //             color={'#7a7'}
  //             checked={selectType === 'users'}
  //             onPress={() => setSelectType('users')}
  //           />
  //         </View>
  //         <View>
  //           <Text style={{color: '#dfd'}}>User</Text>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: width * 0.3,
  //           justifyContent: 'space-around',
  //         }}>
  //         <View>
  //           <CheckBox
  //             color={'#7a7'}
  //             checked={selectType === 'shops'}
  //             onPress={() => setSelectType('shops')}
  //           />
  //         </View>
  //         <View>
  //           <Text style={{color: '#dfd'}}>Shop</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <KeyboardAwareScrollView>
      {/* <SafeAreaView style={{flex: 1}}> */}
        <ImageBackground
          source={require('../assets/bookingbg.jpeg')}
          // source={require('../assets/bookingbg.jpeg')}
          style={{
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* {PickerSelect()} */}
          <View
            style={{
              width: width,
              height: height * 0.06,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: 'black',
              }}>
              LogIn
            </Text>
          </View>
          <View
            style={{
              margin: height * 0.08,
              width: width * 0.94,
              height: height * 0.6,
              alignSelf: 'center',
              alignContent: 'center',
              //   justifyContent: 'center',
              backgroundColor: '#26323D',
              borderRadius: 25,
              shadowOffset: {width: 10, height: 20},
              shadowColor: '#7A8D76',
              shadowRadius: 3,
              shadowOpacity: 1,
              elevation: 5,
              borderColor: 'black',
              borderWidth: 3,
            }}>
            <View
              style={{
                width: width * 0.8,
                height: height * 0.09,
                backgroundColor: '#7A8D76',
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                borderBottomWidth: 3,
                borderBottomColor: 'black',
                borderRightColor: 'black',
                borderLeftColor: 'black',
                borderLeftWidth: 3,
                borderRightWidth: 3,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Log In
              </Text>
            </View>
            {/* {PickerSelect()} */}

            <View
              style={{
                marginTop: 10,
                width: width * 0.9,
                height: height * 0.1,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  marginTop: 5,
                  alignSelf: 'center',
                  width: width * 0.88,
                  height: height * 0.09,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: '#7A8D76',
                }}
                onChangeText={text =>
                  setLoginState({...loginState, email: text})
                }
                placeholder="Enter Your Email"
              />
            </View>
            <View
              style={{
                marginTop: 20,
                width: width * 0.9,
                height: height * 0.1,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                onChangeText={text =>
                  setLoginState({...loginState, password: text})
                }
                secureTextEntry={!showPassword}
                style={{
                  marginTop: 5,
                  alignSelf: 'center',
                  width: width * 0.88,
                  height: height * 0.09,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: '#7A8D76',
                }}
                placeholder="Enter Your Password"
              />
            </View>
            <View
              style={{
                width: width * 0.8,
                height: height * 0.06,
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'pink',
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: height * 0.035,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Show Password
              </Text>
              <CheckBox
                onPress={() => setShowPassword(!showPassword)}
                checked={showPassword}
                color="#7A8D76"
              />
              {/* <CheckBox
                style={{
                  width: width * 0.01,
                  height: 0.005,
                  backgroundColor: 'white',
                }}></CheckBox> */}
            </View>
            <View
              style={{
                padding: 5,
                marginTop: 10,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.9,
                height: height * 0.09,
                //    backgroundColor: 'pink',
                //   flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => handleLogin()}
                style={{
                  //   marginLeft: 1,
                  padding: 10,
                  backgroundColor: '#7A8D76',
                  height: height * 0.07,
                  width: width * 0.85,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: height * 0.04,
                  borderWidth: 2,
                }}>
                {loading ? (
                  <Spinner color={'#fff'} />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: height * 0.03,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    LogIn
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: width * 0.85,
                height: height * 0.05,
                // backgroundColor: 'pink',
                marginTop: 5,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  padding: 7,
                  alignSelf: 'flex-start',
                  width: width * 0.65,
                  height: height * 0.05,
                  fontWeight: 'bold',
                  fontSize: height * 0.025,
                  color: 'white',
                }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup')}>
                <Text
                  style={{
                    padding: 7,
                    alignSelf: 'flex-start',
                    width: width * 0.65,
                    height: height * 0.05,
                    fontWeight: 'bold',
                    fontSize: height * 0.025,
                    color: '#7A8D76',
                    textDecorationLine: 'underline',
                  }}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Toast ref={ref => Toast.setRef(ref)} />
        </ImageBackground>
      {/* </SafeAreaView> */}
    </KeyboardAwareScrollView>
  );
}
export default Login;
