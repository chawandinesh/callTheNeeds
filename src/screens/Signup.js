import React, {useState, useEffect, useLayoutEffect} from 'react';
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
import Toast from 'react-native-toast-message';
import {CheckBox, Spinner} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntIcon from 'react-native-vector-icons/AntDesign';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFirestore from '@react-native-firebase/firestore';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
function Signup(props) {
  const [checkBox, setCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupState, setSignupState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    type: 'shops',
    name: '',
  });

  const handleRegister = () => {
    const {email, password, confirmPassword, type, name} = signupState;
    if (!email || !password || !confirmPassword || !type || !name) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please fill all details',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Passwords not matched',
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
        .createUserWithEmailAndPassword(signupState.email, signupState.password)
        .then(res => {
          setLoading(false);
          firebaseFirestore()
            .collection('users')
            .doc(firebaseAuth().currentUser.uid)
            .set({
              name: signupState.name,
              email: signupState.email,
              password: signupState.password,
              type: 'shops',
              createdAt: firebaseFirestore.FieldValue.serverTimestamp(),
              description: '',
              image: '',
              requestsList: [],
              is_active: true,
              rate: '',
            })
            .then(result => {
              console.log(result);
            })
            .catch(error => {
              console.log(error, 'error..');
            });
        })
        .catch(err => {
          setLoading(false);
          if (err.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Invalid Email',
              text2: 'Please enter a valid email',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          if (err.code === 'auth/weak-password') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Weak Password',
              text2: 'Please provide a strong password',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          if (err.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Email Already Registered',
              text2: 'Please provide a different mail id',
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
  return (
    <KeyboardAwareScrollView>
        <ImageBackground
          source={require('../assets/bookingbg.jpeg')}
          style={{height: height }}>
          <View
            style={{
              width: width * 1,
              height: height * 0.06,
              alignItems: 'center',
              marginTop: height * 0.04,
              flexDirection: 'row',
              //   justifyContent: 'center',
              //    backgroundColor: 'orange',
            }}>
            <View>
              <TouchableOpacity
                style={{justifyContent: 'center', padding: 5}}
                onPress={() => props.navigation.goBack()}>
                <AntIcon name="arrowleft" style={{fontSize: height * 0.05}} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                //  backgroundColor: 'pink',
                width: width * 0.8,

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                SignUp
              </Text>
            </View>
          </View>
          <View
            style={{
              margin: height * 0.03,
              width: width * 0.94,
              height: height * 0.75,
              marginTop: height * 0.06,
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
                height: height * 0.085,
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
                  fontSize: height * 0.04,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Create Account
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.9,
                height: height * 0.08,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.88,
                  height: height * 0.07,
                  color: 'white',
                  //   backgroundColor: 'white',
                  //   borderRadius: 10,
                  borderBottomWidth: 5,
                  borderBottomColor: '#7A8D76',
                }}
                onChangeText={text =>
                  setSignupState({
                    ...signupState,
                    email: text,
                  })
                }
                placeholder="Enter Your Email"
                placeholderTextColor="white"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.9,
                height: height * 0.08,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.88,
                  height: height * 0.07,
                  color: 'white',
                  //   backgroundColor: 'white',
                  //   borderRadius: 10,
                  borderBottomWidth: 5,
                  borderBottomColor: '#7A8D76',
                }}
                onChangeText={text =>
                  setSignupState({
                    ...signupState,
                    password: text,
                  })
                }
                secureTextEntry={!checkBox}
                placeholder="Enter Your Password"
                placeholderTextColor="white"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.9,
                height: height * 0.08,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.88,
                  height: height * 0.07,
                  color: 'white',
                  //   backgroundColor: 'white',
                  //   borderRadius: 10,
                  borderBottomWidth: 5,
                  borderBottomColor: '#7A8D76',
                }}
                secureTextEntry={!checkBox}
                onChangeText={text => {
                  setSignupState({...signupState, confirmPassword: text});
                }}
                placeholder="Confirm Password"
                placeholderTextColor="white"
              />
            </View>
            <View
              style={{
                width: width * 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: height * 0.04,
                //  backgroundColor: 'pink',
                marginLeft: 10,
                // justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: height * 0.025,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Show Password
              </Text>
              <CheckBox
                checked={checkBox}
                color="#7A8D76"
                onPress={() => setCheckBox(!checkBox)}
              />
            </View>
            <View
              style={{
                marginTop: 5,
                width: width * 0.93,
                height: height * 0.06,
                // backgroundColor: 'pink',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('')}
                onPress={() =>
                  setSignupState({
                    ...signupState,
                    type: 'shops',
                  })
                }
                style={{
                  marginLeft: 10,
                  backgroundColor:
                    signupState.type === 'shops' ? '#fff' : '#7A8D76',
                  height: height * 0.06,
                  width: width * 0.4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: height * 0.04,
                  borderWidth: 2,
                  borderColor:
                    signupState.type === 'shops' ? '#7A8D76' : '#fff',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: height * 0.02,
                    fontWeight: 'bold',
                    color: signupState.type === 'shops' ? '#7A8D76' : 'white',
                  }}>
                  Shop
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('')}
                onPress={() => setSignupState({...signupState, type: 'users'})}
                style={{
                  marginLeft: 20,
                  backgroundColor:
                    signupState.type === 'users' ? '#fff' : '#7A8D76',
                  height: height * 0.06,
                  width: width * 0.4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: height * 0.04,
                  borderWidth: 2,
                  borderColor:
                    signupState.type === 'users' ? '#7A8D76' : '#fff',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: height * 0.02,
                    fontWeight: 'bold',
                    color: signupState.type === 'users' ? '#7A8D76' : 'white',
                  }}>
                  User
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.9,
                height: height * 0.08,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                onChangeText={text =>
                  setSignupState({...signupState, name: text})
                }
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.88,
                  height: height * 0.07,
                  color: 'white',
                  //   backgroundColor: 'white',
                  //   borderRadius: 10,
                  borderBottomWidth: 5,
                  borderBottomColor: '#7A8D76',
                }}
                placeholder={
                  signupState.type === 'shops' ? 'Shop Name' : 'Full Name'
                }
                placeholderTextColor="white"
              />
            </View>
            <View
              style={{
                width: width * 0.94,
                height: height * 0.075,
                //  backgroundColor: 'pink',
                marginTop: 5,
              }}>
              <Text
                style={{
                  padding: 7,
                  alignSelf: 'flex-start',
                  //   width: width * 0.65,
                  height: height * 0.09,
                  fontWeight: 'normal',
                  fontSize: height * 0.02,
                  color: 'white',
                }}>
                {/* <CheckBox checked color=""/> */}
                By signing up you agree to our Terms & Conditions and Privacy
                policy
              </Text>
            </View>
            <View
              style={{
                padding: 5,
                marginTop: 7,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.9,
                height: height * 0.09,
                //    backgroundColor: 'pink',
                //   flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => handleRegister()}
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
                  <Spinner color="#fff" />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: height * 0.03,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Register
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Toast ref={ref => Toast.setRef(ref)} />
        </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
export default Signup;
