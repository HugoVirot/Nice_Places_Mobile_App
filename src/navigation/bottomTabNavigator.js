import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faMap, faLocationDot, faUser, faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faHome);
library.add(faMap);
library.add(faLocationDot);
library.add(faUser);
library.add(faStar);

import Accueil from '../screens/Accueil'
import Carte from '../screens/Carte'
import Lieux from '../screens/Lieux'
import Compte from '../screens/Compte'
import Favoris from '../screens/Favoris'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // tabBarIcon: ({ focused, color, size }) => {
                //   let iconName;

                //   if (route.name === 'Accueil') {
                //     iconName = focused
                //       ?  'faHome'
                //       : 'faMap';
                //   } else if (route.name === 'Settings') {
                //     iconName = focused ? 'ios-list' : 'ios-list-outline';
                //   }

                //   // You can return any component that you like here!
                //   return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
                // },
                // tabBarActiveTintColor: 'tomato',
                // tabBarInactiveTintColor: 'gray',
                tabBarStyle: { 
                    paddingVertical: 5, 
                    borderTopLeftRadius: 15, 
                    borderTopRightRadius: 15, 
                    backgroundColor: '#1C6E8C', 
                    position: 'absolute', 
                    height: 100 },
            })}
        >
            <Tab.Screen
                name="Accueil"
                component={Accueil}
                options={{
                    headerShown: false,
                    tabBarLabel:  ({focused, color, size}) => (
                        <Text style={{color: focused ? '#94D1BE' : 'white', fontSize: 18, marginBottom: 10, fontFamily: 'Cooper'}}>Accueil</Text>
                      ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faHome} size={40} style={{color: focused ? '#94D1BE' : 'white'}}/>

                    ),
                }}
            />
            <Tab.Screen
                name="Carte"
                component={Carte}
                options={{
                    headerShown: false,
                    tabBarLabel:  ({focused, color, size}) => (
                        <Text style={{color: focused ? '#94D1BE' : 'white', fontSize: 18, marginBottom: 10, fontFamily: 'Cooper'}}>Carte</Text>
                      ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faMap} size={40} style={{color: focused ? '#94D1BE' : 'white'}} />
                    ),
                }}
            />
            <Tab.Screen
                name="Lieux"
                component={Lieux}
                options={{
                    headerShown: false,
                    tabBarLabel:  ({focused, color, size}) => (
                        <Text style={{color: focused ? '#94D1BE' : 'white', fontSize: 18, marginBottom: 10, fontFamily: 'Cooper'}}>Lieux</Text>
                      ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faLocationDot} size={40} style={{color: focused ? '#94D1BE' : 'white'}} />
                    ),
                }}
            />
            <Tab.Screen
                name="Compte"
                component={Compte}
                options={{
                    headerShown: false,
                    tabBarLabel:  ({focused, color, size}) => (
                        <Text style={{color: focused ? '#94D1BE' : 'white', fontSize: 18, marginBottom: 10, fontFamily: 'Cooper'}}>Compte</Text>
                      ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faUser} size={40} style={{color: focused ? '#94D1BE' : 'white'}} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favoris"
                component={Favoris}
                options={{
                    headerShown: false,
                    tabBarLabel:  ({focused, color, size}) => (
                        <Text style={{color: focused ? '#94D1BE' : 'white', fontSize: 18, marginBottom: 10, fontFamily: 'Cooper'}}>Favoris</Text>
                      ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesomeIcon icon={faStar} size={40} style={{color: focused ? '#94D1BE' : 'white'}} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default MyTabs

// <NavigationContainer independent={true}>
// <Tab.Navigator
//   initialRouteName={screen.HOME}
//   activeColor={colors.offWhite}
//   inactiveColor={colors.primaryDarkColor}
//   barStyle={{backgroundColor: '#694fad', }}
//   backBehavior={'history'}>
//   <Tab.Screen
//     name={screen.HOME}
//     component={Home}
//     options={({navigation}) => ({
//       tabBarColor: colors.homeScreenColor,
//       tabBarLabel: tabNames.homeTabName,
//       tabBarIcon: ({color, focused}) => (
//   <MaterialIcons name="bar-chart" color={color} size={26} />
//       ),
//     })}
//   />
// </Tab.Navigator>
// </NavigationContainer>