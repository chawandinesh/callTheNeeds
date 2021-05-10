import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import firebaseFirestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {Button, Icon} from 'native-base';
const {height, width} = Dimensions.get('window');
export default function Bookings(props) {
  const [count, setCount] = useState(false);
  // const [state, setstate] = useState(initialState)
  const [profileInfo, setProfileInfo] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const [status, setStatus] = useState('pending');
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const getBookingData = () => {
    switch (profileInfo.type) {
      case 'users':
        return bookingData
          .filter(e => e.userId === firebaseAuth().currentUser.uid)
          .filter(e => e.status === status);
      case 'shops':
        return bookingData
          .filter(e => e.shopId === firebaseAuth().currentUser.uid)
          .filter(e => e.status === status);
      default:
        return [];
    }
  };
  useEffect(() => {
    getInitialData();
    if (firebaseAuth().currentUser) {
      firebaseFirestore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .get()
        .then(snap => {
          setProfileInfo(snap.data());
        });
    }
    firebaseFirestore()
      .collection('bookings')
      .get()
      .then(querySnapshot => {
        let bookingData = [];
        querySnapshot.forEach(eachdoc => {
          bookingData.push({...eachdoc.data(), id: eachdoc.id});
        });
        setBookingData(bookingData);
      });
  }, [isFocused, props, count, status]);

  const getColor = statusValue => {
    switch (statusValue) {
      case 'pending':
        return 'orange';
      case 'success':
        return '#2c7';
      case 'rejected':
        return '#d55';
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          borderRightWidth: 3,
          borderLeftWidth: 3,
          marginBottom: 5,
          marginTop: 5,
          width: width * 0.9,
          //   justifyContent: 'space-around',
          alignItems: 'center',
          //   flexDirection: 'row',
          alignSelf: 'center',
          borderBottomRightRadius: height * 0.03,
          borderBottomLeftRadius: height * 0.03,
          height: 'auto',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderBottomWidth: 8,
          borderBottomColor: getColor(status),
        }}>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <View
            style={{
              height: height * 0.03,
              width: width * 0.2,
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 10,
              alignItems: 'center',
              backgroundColor: getColor(status),
            }}>
            <Text>{item.status}</Text>
          </View>
          <View
            style={{
              height: height * 0.03,
              flexDirection: 'row',
              width: width * 0.4,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
              alignItems: 'center',
              backgroundColor: 'gray',
            }}>
            <Text style={{color: '#fff'}}>{item.bookingDate}</Text>
            <Text>|||</Text>
            <Text style={{color: '#fff'}}> {item.bookingTime}</Text>
          </View>
          <View
            style={{
              height: height * 0.18,
              justifyContent: 'flex-end',
              width: width * 0.3,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: height * 0.12,
                justifyContent: 'center',
                alignItems: 'center',
                width: height * 0.12,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderRadius: height * 0.08,
              }}>
              {

                  profileInfo.type === 'users' ?
                  item.shopImage ? (
                    <Image
                      source={{uri: item.shopImage}}
                      style={{
                        height: height * 0.12,
                        width: height * 0.12,
                        borderRadius: height * 0.08,
                      }}
                    />
                  ) : (
                    <Icon
                      name="ios-image-outline"
                      style={{fontSize: height * 0.05}}
                    />
                  )

                  : 
                  profileInfo.type === 'shops' 
                  ?
                  item.userImage ? (
                    <Image
                      source={{uri: item.userImage}}
                      style={{
                        height: height * 0.12,
                        width: height * 0.12,
                        borderRadius: height * 0.08,
                      }}
                    />
                  ) : (
                    <Icon
                      name="ios-image-outline"
                      style={{fontSize: height * 0.05}}
                    />
                  )

                  :
                  <Icon
                  name="ios-image-outline"
                  style={{fontSize: height * 0.05}}
                />

                  
            //   item.image ? (
            //     <Image
            //       source={{uri: item.image}}
            //       style={{
            //         height: height * 0.12,
            //         width: height * 0.12,
            //         borderRadius: height * 0.08,
            //       }}
            //     />
            //   ) : (
            //     <Icon
            //       name="ios-image-outline"
            //       style={{fontSize: height * 0.05}}
            //     />
            //   )
              }
            </View>
          </View>
          <View
            style={{
              height: height * 0.18,
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: width * 0.7,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: height * 0.15,
                padding: 10,
                width: width * 0.6,
                borderRadius: height * 0.03,
                backgroundColor: '#ddd',
              }}>
              <Text>{item.notes}</Text>
            </View>
          </View>
        </View>
        {/* <View style={{height: height * 0.1}}></View> */}
        {profileInfo.type === 'shops' ? (
          <View
            style={{
              width: width * 0.8,
              borderRadius: height * 0.05,
              marginVertical: 5,
              alignSelf: 'center',
              height: height * 0.04,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() =>
                firebaseFirestore()
                  .collection('bookings')
                  .doc(item.id)
                  .update({
                    ...item,
                    status: 'success',
                  })
                  .then(res => {
                    setCount(!count);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
              style={{
                backgroundColor: '#2c7',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.4,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: height * 0.024,
                }}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                firebaseFirestore()
                  .collection('bookings')
                  .doc(item.id)
                  .update({
                    ...item,
                    status: 'rejected',
                  })
                  .then(res => {
                    setCount(!count);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
              style={{
                backgroundColor: '#d55',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.4,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: height * 0.024,
                }}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: width * 0.8,
              borderRadius: height * 0.05,
              borderWidth:2,
              marginVertical: 5,
              alignSelf: 'center',
              height: height * 0.04,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: '#25383C',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.3,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: height * 0.024,
                }}>
                Shop Name
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.5,
              }}>
              <Text
                style={{
                  color: '#25383C',
                  fontWeight: 'bold',
                  fontSize: height * 0.024,
                }}>
                {item.shopName}
              </Text>
            </View>
          </View>
        )}
        {/* <View style>

        </View> */}
      </View>
    );
  };
  return (
    <ImageBackground
      source={require('../assets/bookingbg.jpeg')}
      style={{height: height * 0.98, width: width}}>
      <View
        style={{
          height: height * 0.08,
          width: width,
          marginTop: height * 0.04,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: height * 0.025, fontWeight: 'bold'}}>
          Bookings
        </Text>
      </View>
      <View
        style={{
          height: height * 0.1,
          width: width,
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => setStatus('pending')}
          style={{
            backgroundColor: status === 'pending' ? 'orange' : '#aaa',
            width: width * 0.3,
            height: height * 0.07,
            borderRadius: height * 0.01,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width * 0.25,
            }}>
            <View>
              <Text style={{color: status === 'pending' ? '#fff' : '#000'}}>
                Pending
              </Text>
            </View>
            <View>
              <Icon
                name="alert-circle-outline"
                style={{color: status === 'pending' ? '#fff' : '#000'}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStatus('success')}
          style={{
            backgroundColor: status === 'success' ? '#2c7' : '#aaa',
            width: width * 0.3,
            height: height * 0.07,
            borderRadius: height * 0.01,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width * 0.25,
            }}>
            <View>
              <Text style={{color: status === 'success' ? '#fff' : '#000'}}>
                Success
              </Text>
            </View>
            <View>
              <Icon
                name="checkmark-sharp"
                style={{color: status === 'success' ? '#fff' : '#000'}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStatus('rejected')}
          style={{
            backgroundColor: status === 'rejected' ? '#d55' : '#aaa',
            width: width * 0.3,
            height: height * 0.07,
            borderRadius: height * 0.01,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width * 0.25,
            }}>
            <View>
              <Text style={{color: status === 'rejected' ? '#fff' : '#000'}}>
                Rejected
              </Text>
            </View>
            <View>
              <Icon
                name="close"
                style={{color: status === 'rejected' ? '#fff' : '#000'}}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: width * 0.98,
          alignSelf: 'center',
          height: height * 0.72,
        }}>
        {getBookingData().length ? (
          <FlatList
            data={getBookingData()}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: height * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: getColor(status),
              width: width * 0.9,
              alignSelf: 'center',
              borderRadius: height * 0.03,
              borderWidth: 3,
              marginTop: height * 0.3,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: height * 0.04,
                color: '#fff',
              }}>
              No Records Found
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
