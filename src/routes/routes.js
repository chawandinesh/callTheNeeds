import React from 'react';
import {View, Text} from 'react-native';
import firebaseAuth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Bookings from '../screens/Bookings';
import ShowDetails from '../screens/ShowDetails';
import ShowShopRequests from '../screens/ShowShopRequests';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export default function Routes() {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    loaded: false,
  });

  const TabNavigation = () => (
    <Tab.Navigator
      barStyle={{backgroundColor: '#25383C'}}
      activeColor="#f0edf6"
      inactiveColor="#999">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Shops List',
          tabBarIcon: ({tintColor, focused}) => (
            <View>
              {focused ? (
                <FontAwesome
                  style={[{color: '#fff'}]}
                  size={25}
                  name={'file-text'}
                />
              ) : (
                <FontAwesome
                  style={[{color: '#999'}]}
                  size={25}
                  name={'file-text-o'}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({tintColor, focused}) => (
            <View>
              {focused ? (
                <MaterialCommunity
                  style={[{color: '#fff'}]}
                  size={25}
                  name={'storefront'}
                />
              ) : (
                <MaterialCommunity
                  style={[{color: '#999'}]}
                  size={25}
                  name={'storefront-outline'}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({tintColor, focused}) => (
            <View>
              {focused ? (
                <FontAwesome
                  style={[{color: '#fff'}]}
                  size={25}
                  name={'user'}
                />
              ) : (
                <FontAwesome
                  style={[{color: '#999'}]}
                  size={25}
                  name={'user-o'}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );

  
  React.useEffect(() => {
    firebaseAuth().onAuthStateChanged(user => {
      if (!user) {
        setAuthState({...authState, isLoggedIn: false, loaded: true});
      } else {
        setAuthState({...authState, isLoggedIn: true, loaded: true});
      }
    });
  }, []);

  if (!authState.loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!authState.isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
  
    return (
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen component={Dashboard} name="Dashboard"/>
      //   </Stack.Navigator>
      // </NavigationContainer>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component ={TabNavigation}/>
          <Stack.Screen name="ShowDetails" component={ShowDetails}/>
          <Stack.Screen name="ShowShopRequests" component={ShowShopRequests}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
