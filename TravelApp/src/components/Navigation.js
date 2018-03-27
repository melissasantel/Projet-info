import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet} from 'react-native';
import { TabNavigator, TabBarBottom,StackNavigator } from 'react-navigation';
import Profil from '../scene/Profil/Profil';
import Acceuil from '../scene/Home/Acceuil';
import Photos from '../scene/Photos/Photos'; 
import CreerCarnet from '../scene/Diary/CreerCarnet';
import Abbonnement from '../scene/Abbonnement/Abbonnement';
import Parameters from '../scene/Parameters/Parameters';
import EcrirePage from '../scene/Diary/EcrirePage';
import MesCarnets from '../scene/Diary/MesCarnets';
import SignIn from '../scene/Authentification/Authentification';
import SignUp from '../scene/Register/Register';
import Post from '../scene/Photos/Post';

// Mise en place de la navigation au sein de l'application

export default class Navigation extends Component{
    render() {
        return <BarreNavigation/>; 
    }
}

const RootStack = StackNavigator({
    HomeScreen : {
        screen : Acceuil
    },
    FollowerScreen : {
        screen : Abbonnement
    },
},
    {
        inialRouteName: 'HomeScreen',
    },
  );

const RootStack1 = StackNavigator({
    ProfilScreen :{
      screen : Profil 
    },
    ParametersScreen :{
      screen : Parameters
    },
},
  {
    initialRouteName: 'ProfilScreen',
  },
);

const RootStack2 = StackNavigator({
    MesCarnetScreen:{
      screen: MesCarnets
    },
    EcrirePageScreen :{
      screen : EcrirePage
    },
    CreerCarnetScreen :{
      screen : CreerCarnet
    },  
},
  {
    initialRouteName: 'MesCarnetScreen',
  },
);

const RootStack3 = StackNavigator({
    PhotosScreen: {
      screen : Photos
    },
    PostScreen: {
      screen : Post
    },
},
  {
    initialRouteName : 'PhotosScreen',
  },
);


const BarreNavigation =  TabNavigator({
  Acceuil: {
    screen : RootStack,
  },
  Photos: {
    screen: RootStack3,
  },
  Carnet: {
    screen: RootStack2,
  },
  Profil: {
    screen: RootStack1,
  },
},
{

  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Acceuil') {
        iconName =`ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Photos') {
        iconName = `ios-camera${focused ? '' : '-outline'}`;
      } else if (routeName === 'Carnet') {
        iconName = `ios-quote${focused ? '' : '-outline'}`;
      } else if (routeName === 'Profil') {
        iconName = `ios-person${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />
    },
  }),
  tabBarOptions: {
    activeTintColor: '#66CDAA',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
}
); 
