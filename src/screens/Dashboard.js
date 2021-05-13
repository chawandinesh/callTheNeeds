import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFirestore from '@react-native-firebase/firestore';
import {Item, Icon, Input} from 'native-base';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
const {height, width} = Dimensions.get('window');
export default function Dashboard(props) {
  const isFocused = useIsFocused();
  const [searchedText, setSearchedText] = useState('');
  const [profileInfo, setProfileInfo] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  useEffect(async () => {
    await firebaseFirestore()
      .collection('users')
      .doc(firebaseAuth().currentUser.uid)
      .get()
      .then(res => {
        setProfileInfo(res.data());
      })
      .catch(err => {
        console.log(err);
      });

    const Info = await firebaseFirestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        let users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        return users;
      });
    setAllUsers(Info);
    setAllUsersData(Info);
  }, [isFocused]);

  useEffect(() => {
    if (searchedText.length) {
      setAllUsersData(
        allUsers.filter(e =>
          e.data.name.toLowerCase().includes(searchedText.toLowerCase()),
        ),
      );
    } else {
      setAllUsersData(allUsers);
    }
  }, [searchedText]);
  const renderItem = ({item, index}) => {
    const itemRate = item.data.rate ? `$ ${item.data.rate}` : '';
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ShowDetails', {data: item})}
        style={{
          width: width * 0.9,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          height: height * 0.18,
          backgroundColor: '#25383C',
          borderRadius: 20,
          marginVertical: 10,
        }}>
        <View
          style={{
            width: width * 0.25,
            height: height * 0.18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: height * 0.09,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#6f7',
              alignItems: 'center',
              width: height * 0.09,
              backgroundColor: '#458',
              borderRadius: height * 0.04,
            }}>
            {item.data.image ? (
              <Image
                source={{uri: item.data.image}}
                style={{
                  height: height * 0.09,
                  width: height * 0.09,
                  borderRadius: height * 0.04,
                }}
              />
            ) : (
              <Fontisto
                name="shopping-store"
                color="#fff"
                size={height * 0.04}
              />
            )}
          </View>
          <View
            style={{
              height: height * 0.07,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#6f7'}}>{itemRate} / hr</Text>
          </View>
        </View>
        <View
          style={{
            height: height * 0.15,
            backgroundColor: '#dfd',
            width: width * 0.003,
          }}></View>
        <View
          style={{
            width: width * 0.65,
            height: height * 0.18,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              height: height * 0.05,
              alignSelf: 'center',
              justifyContent: 'center',
              width: width * 0.55,
              backgroundColor: '#fff',
              flexDirection: 'row',
              borderColor: '#709',
              borderWidth: 2,
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#777',
                width: width * 0.1,
                height: height * 0.045,
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Name</Text>
            </View>
            <View
              style={{
                width: width * 0.45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>{item.data.name}</Text>
            </View>
          </View>
          <View
            style={{
              height: height * 0.1,
              alignSelf: 'center',
              width: width * 0.55,
              backgroundColor: '#fff',
              borderColor: '#709',
              borderWidth: 2,
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#777',
                width: 'auto',
                height: height * 0.03,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Description</Text>
            </View>
            <View>
              {item.data.description.length ? (
                <Text> {item.data.description.slice(0, 60)}...</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getData = () => {
    if (allUsersData.filter(e => e.data.type === 'shops' &&  e.id !== firebaseAuth().currentUser.uid).length) {
      if (profileInfo.type === 'shops') {
        return (
          <FlatList
            data={allUsersData.filter(
              e =>
                e.data.type === 'shops' &&
                e.id !== firebaseAuth().currentUser.uid,
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      } else {
        return (
          <FlatList
            data={allUsersData.filter(e => e.data.type === 'shops')}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      }
    } else {
      return (
        <View
          style={{
            position: 'absolute',
            top: height * 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            height: height * 0.2,
            width: width * 0.8,
            alignSelf: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.035}}>
            No List Found
          </Text>
        </View>
      );
    }
  };
  return (
    <ImageBackground
      style={{height, width}}
      source={require('../assets/bookingbg.jpeg')}>
      <View
        style={{
          height: height * 0.05,
          alignItems: 'center',
          marginTop: height * 0.04,
          flexDirection: 'row',
          alignSelf: 'center',
          width: width * 0.9,
          justifyContent: 'space-between',
        }}>
        {/* <View
          style={{
            height: height * 0.03,
            width: height * 0.03,
            borderRadius: 30,
            backgroundColor: '#383',
          }}></View> */}
        <View
          style={{
            height: height * 0.03,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.02}}>
            Shops List
          </Text>
          {/* {profileInfo.type === 'users' ? (
            <Text style={{fontWeight: 'bold', fontSize: height * 0.02}}>
              Shops List
            </Text>
          ) : (
            <Text style={{fontWeight: 'bold', fontSize: height * 0.02}}>
              Users List
            </Text>
          )} */}
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>
            {moment(new Date()).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
      <View style={{width: width * 0.9, alignSelf: 'center'}}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            value={searchedText}
            onChangeText={text => {
              setSearchedText(text);
            }}
          />
          {searchedText ? (
            <Icon name="ios-close" onPress={() => setSearchedText('')} />
          ) : null}
        </Item>
      </View>
      <View style={{height: height * 0.8}}>
        {profileInfo ? getData() : null}
      </View>
      {/* <Text>Dashboard</Text>
      <TouchableOpacity onPress={() => firebaseAuth().signOut()}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
}
