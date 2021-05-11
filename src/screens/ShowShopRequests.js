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
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
function ShowShopRequests(props) {
  const isFocused = useIsFocused();
  const control = async () => {};
  const [profileInfo, setProfileInfo] = useState({});
  const [showBookings, setShowBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(profileInfo);
  useEffect(() => {
    control();
    setLoading(true);
    firebaseFirestore()
      .collection('bookings')
      .onSnapshot(each => {
        setLoading(false);
        let allbookings = [];
        each.forEach(e => {
          allbookings.push(e.data());
        });
        // console.log(allbookings.filter((e) => e.userId === firebaseAuth().currentUser.uid))
        setShowBookings(
          allbookings.filter(e => e.userId === firebaseAuth().currentUser.uid),
        );
      });
  }, [isFocused, props]);
  console.log(showBookings);
  const getBackgroundColor = status => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'success':
        return '#2c7';
      case 'rejected':
        return "#d55";
      default:
        return 'gray';
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: width * 0.94,
          marginBottom: height * 0.05,
          alignSelf: 'center',
          height: height * 0.15,
          backgroundColor: '#fff',
          borderRightWidth: 5,
          borderLeftWidth: 5,
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: height * 0.15,
            width: width * 0.3,
            // borderRadius: height * 0.05,
            // borderWidth: 1,
            borderRightWidth: 1,
            borderRightColor:'#ddd',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item.shopImage ? (
            <Image
              style={{
                height: height * 0.15,
                width: width * 0.3,
                // borderRadius: height * 0.05,
              }}
              source={{uri: item.shopImage}}
            />
          ) : (
            <EntypoIcon name="shop" style={{fontSize: height * 0.05}} />
          )}
        </View>
        <View
          style={{
            height: height * 0.15,
            width: width * 0.64,
            backgroundColor: 'white',
          }}>
          <View>
            <Text style={{fontSize: height * 0.03, textAlign: 'center'}}>
              {item.shopName}
            </Text>
            <Text
              style={{
                fontSize: height * 0.025,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'green',
              }}>
              ${item.rate}
            </Text>
            <Text
              style={{
                backgroundColor: getBackgroundColor(item.status),
                textAlign: 'center',
                padding: 5,
                color: '#fff',
              }}>
              {item.status}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.6,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text>{item.bookingDate}</Text>
              </View>
              <View>
                <Text>{item.bookingTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/bookingbg.jpeg')}
      style={{height: height, width: width}}>
      <View
        style={{
          width: width * 1,
          height: height * 0.06,
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: height * 0.04,
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
            Your request Status
          </Text>
        </View>
      </View>
      {showBookings.length ? (
        <View
          style={{
            width,
            alignItems: 'center',
            marginTop: height * 0.02,
            height: height * 0.8,
          }}>
          <FlatList
            data={showBookings}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View
          style={{
            height: height * 0.15,
            marginTop: height * 0.3,
            width: width * 0.8,
            alignSelf: 'center',
            borderRadius: height * 0.03,
            borderWidth: 5,
            alignItems:'center', justifyContent:'center',
          }}>
          <Text style={{fontSize: height * 0.03, fontWeight: 'bold'}}>
            No bookings found
          </Text>
        </View>
      )}
    </ImageBackground>
  );
}
export default ShowShopRequests;
