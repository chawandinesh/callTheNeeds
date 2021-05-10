import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  View,
  Dimensions,
  Share,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firebaseStorage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFirestore from '@react-native-firebase/firestore';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';
import {Spinner} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
function Profile(props) {
  const [profileInfo, setProfileInfo] = useState({});
  const isFocused = useIsFocused();
  const uploadImage = async uri => {
    const uploadUri = uri.path;
    const response = await fetch(uploadUri);
    const childPath = `post/${firebaseAuth().currentUser.uid}/profile`;
    const blob = await response.blob();
    // const task = firebaseStorage().ref().child(childPath).delete()
    const task = firebaseStorage().ref().child(childPath).put(blob);
    const taskProgress = snapshot => {
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(resSnap => {
        setProfileInfo({...profileInfo, image: resSnap});
        // setImage(resSnap);
      });
    };

    const taskError = snapshot => {
    };
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        uploadImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify({
          name: profileInfo.name,
          email: profileInfo.email,
        }),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if(firebaseAuth().currentUser){

      firebaseFirestore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .get()
        .then(snap => {
          setProfileInfo(snap.data());
        });
    }
  }, [isFocused]);
  return (
    // <SafeAreaView style={{flex: 1}}>
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require('../assets/bookingbg.jpeg')}
        style={{height: height * 0.94}}>
        <View
          style={{
            width: width * 1,
            height: height * 0.06,
            marginTop: height * 0.04,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            //   backgroundColor: 'black',
          }}>
          <View>
            <AntIcon
              onPress={() => {
                firebaseAuth().signOut();
                AsyncStorage.removeItem('type');
              }}
              name="logout"
              style={{padding: 10, fontSize: height * 0.025}}
            />
            <Text
              style={{
                alignContent: 'center',
                textAlign: 'center',
                paddingRight: 10,
                fontSize: height * 0.02,
                fontWeight: 'normal',
                color: 'black',
              }}>
              LogOut
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => pickImage()}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.4,
            height: height * 0.18,
            backgroundColor: 'white',
            marginTop: 5,
            borderRadius: 75,
            borderColor: 'black',
            borderWidth: 3,
          }}>
          {profileInfo.image ? (
            <Image
              source={{uri: profileInfo.image}}
              style={{
                height: height * 0.18,
                width: width * 0.4,
                borderRadius: 75,
              }}
            />
          ) : (
            <EntypoIcon name="images" style={{fontSize: height * 0.035}} />
          )}
        </TouchableOpacity>
        <View
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            width: width * 1,
            height: height * 0.08,
            //   backgroundColor: 'pink',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            {profileInfo.name}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'normal',
              fontSize: 20,
            }}>
            {profileInfo.email}
          </Text>
        </View>
        {profileInfo ? (
          <View>
            {profileInfo.type === 'users' ? (
              <View>
                <View
                  style={{
                    marginTop: 5,
                    width: width * 0.65,
                    height: height * 0.06,
                    borderBottomColor: 'black',
                    borderBottomWidth: 5,
                    borderRightColor: 'black',
                    borderRightWidth: 5,
                    borderBottomEndRadius: 20,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 37,
                    }}>
                    User Details
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.48,
                    backgroundColor: '#25383C',
                    borderRadius: 20,
                    borderWidth: 3,
                    shadowOffset: {width: 10, height: 10},
                    shadowColor: '#25383C',
                    shadowRadius: 3,
                    shadowOpacity: 1,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      color: 'white',
                      fontWeight: 'normal',
                      fontSize: 15,
                    }}>
                    User description....
                  </Text>
                  <View
                    style={{
                      width: width * 0.9,
                      height: height * 0.28,
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: '#75888C',
                      borderWidth: 3,
                      borderColor: 'white',
                    }}>
                    <TextInput
                      style={{
                        marginTop: 5,
                        width: width * 0.85,
                        height: height * 0.26,
                        backgroundColor: 'white',
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                      }}
                      value={profileInfo.description}
                      onChangeText={text =>
                        setProfileInfo({...profileInfo, description: text})
                      }
                      placeholder="Add Something about you"
                    />
                  </View>
                  <View
                    style={{
                      padding: 5,
                      marginTop: 10,
                      alignSelf: 'center',
                      width: width * 0.9,
                      height: height * 0.09,
                      // backgroundColor: 'pink',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        firebaseFirestore()
                          .collection('users')
                          .doc(firebaseAuth().currentUser.uid)
                          .update(profileInfo)
                          .then(res => {
                            alert('success');
                          })
                          .catch(err => {
                            alert('failed');
                          });
                      }}
                      style={{
                        //   marginLeft: 1,
                        padding: 10,
                        backgroundColor: 'orange',
                        height: height * 0.07,
                        width: width * 0.28,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: height * 0.03,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: height * 0.03,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onShare()}
                      style={{
                        marginLeft: 5,
                        padding: 10,
                        backgroundColor: 'orange',
                        height: height * 0.07,
                        width: width * 0.28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: height * 0.03,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: height * 0.03,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Share
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack()}
                      style={{
                        marginLeft: 5,
                        padding: 10,
                        backgroundColor: 'orange',
                        height: height * 0.07,
                        width: width * 0.28,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        borderRadius: height * 0.03,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: height * 0.03,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Exit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    marginTop: 5,
                    width: width * 0.65,
                    height: height * 0.06,
                    //   backgroundColor: 'white',
                    borderBottomColor: 'black',
                    borderBottomWidth: 5,
                    borderRightColor: 'black',
                    borderRightWidth: 5,
                    borderBottomEndRadius: 20,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 37,
                    }}>
                    Shop Details
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.48,
                    backgroundColor: '#25383C',
                    borderRadius: 20,
                    borderWidth: 3,
                    shadowOffset: {width: 10, height: 10},
                    shadowColor: '#25383C',
                    shadowRadius: 3,
                    shadowOpacity: 1,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                      textDecorationLine: 'underline',
                    }}>
                    Rate ($ per hour)
                  </Text>
                  <View
                    style={{
                      width: width * 0.9,
                      height: height * 0.08,
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: '#75888C',
                      borderWidth: 3,
                      borderColor: 'white',
                    }}>
                    <TextInput
                      style={{
                        marginTop: 5,
                        width: width * 0.85,
                        height: height * 0.06,
                        backgroundColor: 'white',
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                      }}
                      value={profileInfo.rate}
                      onChangeText={text => {
                        setProfileInfo({
                          ...profileInfo,
                          rate: text,
                        });
                      }}
                      placeholder="Rate"
                    />
                  </View>
                  <Text
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      color: 'white',
                      fontWeight: 'normal',
                      fontSize: 15,
                      // textDecorationLine: 'underline',
                    }}>
                    Write Something....
                  </Text>
                  <View
                    style={{
                      width: width * 0.9,
                      height: height * 0.18,
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: '#75888C',
                      borderWidth: 3,
                      borderColor: 'white',
                    }}>
                    <TextInput
                      value={profileInfo.description}
                      onChangeText={text => {
                        setProfileInfo({
                          ...profileInfo,
                          description: text,
                        });
                      }}
                      style={{
                        marginTop: 5,
                        width: width * 0.85,
                        height: height * 0.16,
                        backgroundColor: 'white',
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                      }}
                      placeholder="Add Something about your shop"
                    />
                  </View>
                  <View
                    style={{
                      padding: 5,
                      marginTop: 10,
                      alignSelf: 'center',
                      width: width * 0.9,
                      height: height * 0.09,
                      // backgroundColor: 'pink',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        firebaseFirestore()
                          .collection('users')
                          .doc(firebaseAuth().currentUser.uid)
                          .update(profileInfo)
                          .then(res => {
                            alert('success');
                          })
                          .catch(err => {
                            alert('failed');
                          });
                      }}
                      style={{
                        //   marginLeft: 1,
                        padding: 10,
                        backgroundColor: 'orange',
                        height: height * 0.07,
                        width: width * 0.28,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: height * 0.03,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: height * 0.03,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={{
                        marginLeft: 5,
                        padding: 10,
                        backgroundColor: 'orange',
                        height: height * 0.07,
                        width: width * 0.28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: height * 0.03,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: height * 0.03,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Share
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack()}
                      style={{
                        marginLeft: 5,
                        padding: 10,
                        backgroundColor: 'orange',
                        height: height * 0.07,
                        width: width * 0.28,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        borderRadius: height * 0.03,
                        borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: height * 0.03,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Exit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        ) : (
          <Spinner color="#fff" />
        )}
      </ImageBackground>
    </KeyboardAwareScrollView>
    // </SafeAreaView>
  );
}
export default Profile;
