import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firebaseStorage from '@react-native-firebase/storage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFirestore from '@react-native-firebase/firestore';
import {Spinner} from 'native-base';

const {height, width} = Dimensions.get('window');
function ShowDetails(props) {
  const isFocused = useIsFocused();
  const [profileInfo, setProfileInfo] = useState({});
//   console.log(profileInfo, 'profileInnfo')
  const [bookingData, setBookingData] = useState({
    shopImage: props.route.params.data.data.image ? props.route.params.data.data.image : null,
    userImage: null,
    bookingDate:  moment(new Date()).format('MMM DD,yyyy'),
    bookingTime:  moment(new Date(), 'HH:mm:ss').format('hh:mm A'),
    notes: '',
    userId: firebaseAuth().currentUser.uid,
    shopId: props.route.params.data.id,
    rate: props.route.params.data.data.rate,
    shopName: props.route.params.data.data.name,
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  console.log(bookingData,'bookData')
  useEffect(() => {
    const date = moment(new Date()).format('MMM DD,yyyy');
    const time = moment(new Date(), 'HH:mm:ss').format('hh:mm A');
    
    // setBookingData({
    //     ...bookingData,
    //     bookingDate: date,
    //     bookingTime: time,
    //   });
    firebaseFirestore()
      .collection('users')
      .doc(firebaseAuth().currentUser.uid)
      .get()
      .then(res => {
        //  console.log(res.data().type)
        setProfileInfo(res.data());
        setBookingData({...bookingData, userImage: res.data().image})
      });

  }, [isFocused]);

  const handleBookSlot = async () => {
    setLoading(true);
    await firebaseFirestore()
      .collection('bookings')
      //   .doc(firebaseAuth().currentUser.uid)
      //   .collection('allbookings')
      .add(bookingData)
      .then(res => {
        setLoading(false);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    //   <SafeAreaView>
    <ImageBackground
      source={require('../assets/bookingbg.jpeg')}
      style={{flex: 1}}>
      <View
        style={{
          width: width * 1,
          height: height * 0.06,
          alignItems: 'center',
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
            Details
          </Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.32,
          height: height * 0.15,
          backgroundColor: 'pink',
          marginTop: 5,
          marginLeft: 10,
          borderRadius: 75,
          borderColor: 'black',
          borderWidth: 3,
        }}>
        {
            // profileInfo.type === 'users' 
            // ?
            // bookingData.shopImage ? (
            //     <Image
            //       source={{uri: bookingData.shopImage}}
            //       style={{
            //         height: height * 0.15,
            //         width: width * 0.32,
            //         borderRadius: 75,
            //         borderWidth: 3,
            //       }}
            //     />
            //   ) : (
            //     <EntypoIcon name="images" style={{fontSize: height * 0.035}} />
            //   )
            // :
            // profileInfo.type === 'shops'
            // ?
            // bookingData.userImage ? (
            //     <Image
            //       source={{uri: bookingData.userImage}}
            //       style={{
            //         height: height * 0.15,
            //         width: width * 0.32,
            //         borderRadius: 75,
            //         borderWidth: 3,
            //       }}
            //     />
            //   ) : (
            //     <EntypoIcon name="images" style={{fontSize: height * 0.035}} />
            //   )
            // :
            // <EntypoIcon name="images" style={{fontSize: height * 0.035}} />

            
        
        bookingData.shopImage ? (
          <Image
            source={{uri: bookingData.shopImage}}
            style={{
              height: height * 0.15,
              width: width * 0.32,
              borderRadius: 75,
              borderWidth: 3,
            }}
          />
        ) : (
          <EntypoIcon name="images" style={{fontSize: height * 0.035}} />
        )
        }
      </View>
      <View
        style={{
          alignContent: 'center',
          alignSelf: 'center',
          width: width * 1,
          height: height * 0.05,
          //   backgroundColor: 'pink',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          {bookingData.shopName}
        </Text>
      </View>
      <View
        style={{
          alignContent: 'center',
          alignSelf: 'center',
          width: width * 0.95,
          height: 'auto',
          maxHeight: height * 0.1,
          //   backgroundColor: 'pink',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontWeight: 'normal',
            fontSize: 17,
          }}>
          {props.route.params.data.data.description.slice(0, 39)}
        </Text>
      </View>
      <View
        style={{
          marginTop: 1,
          width: width * 0.5,
          //   backgroundColor: 'pink',
          height: height * 0.08,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text
          style={{
            // padding: 8,
            textAlign: 'left',
            alignContent: 'center',
            justifyContent: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          Notes :
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          width: width * 1,
          height: height * 0.16,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: '#75888C',
          borderWidth: 3,
          borderColor: 'black',
        }}>
        <TextInput
          numberOfLines={4}
          onChangeText={text => setBookingData({...bookingData, notes: text})}
          value={bookingData.notes}
          editable = {profileInfo.type === 'users'}
          multiline
          style={{
            marginTop: 5,
            width: width * 0.88,
            height: height * 0.14,
            backgroundColor: 'white',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            borderRadius: 5,
          }}
          placeholder="Add Booking about your shop"
        />
      </View>
      <View
        style={{
          marginTop: 7,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          width: width * 0.97,
          height: height * 0.07,
          //   backgroundColor: 'pink',
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'black',
          borderRadius: 3,
        }}>
        <Text
          style={{
            padding: 8,
            textAlign: 'left',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Booking Date
        </Text>
        <View style={{alignItems: 'flex-end', width: width * 0.57}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'green',
              fontWeight: 'normal',
              fontSize: 20,
            }}>
            {bookingData.bookingDate}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 7,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          width: width * 0.97,
          height: height * 0.07,
          //   backgroundColor: 'pink',
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'black',
          borderRadius: 3,
        }}>
        <Text
          style={{
            padding: 8,
            textAlign: 'left',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Booking Time
        </Text>
        <View style={{alignItems: 'flex-end', width: width * 0.57}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'green',
              fontWeight: 'normal',
              fontSize: 20,
            }}>
            {bookingData.bookingTime}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 7,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          width: width * 0.97,
          height: height * 0.07,
          //   backgroundColor: 'pink',
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'black',
          borderRadius: 3,
        }}>
        <Text
          style={{
            padding: 8,
            textAlign: 'left',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Rate
        </Text>
        <View style={{alignItems: 'flex-end', width: width * 0.57}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'green',
              fontWeight: 'normal',
              fontSize: 20,
            }}>
            ${bookingData.rate}
          </Text>
        </View>
      </View>
      {profileInfo.type === 'shops' ? null : (
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
            onPress={() => handleBookSlot()}
            style={{
              //   marginLeft: 1,
              padding: 10,
              backgroundColor: '#25383C',
              height: height * 0.08,
              width: width * 0.85,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: height * 0.03,
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
                Request For Slot
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
    //   </SafeAreaView>
  );
}
export default ShowDetails;
