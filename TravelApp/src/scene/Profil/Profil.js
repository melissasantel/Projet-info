import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button,ScrollView, TouchableOpacity } from 'react-native';
import Loggin from '../Authentification/Authentification';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';

//TODO afficher les photos et les carnets en ligne comme sur instagram 
export default class Profil extends Component {
    constructor() {
        super();
        this.state = {
            parametre: false,
        };
//var user = firebase.auth().currentUser;         
    }

    static navigationOptions ={
      header: null

    };
  
   componentDidMount() {
      firebase.auth().onAuthStateChanged((user)=>{
          this.setState({user});
      })
  }

    render() {
        
      if (this.state.user)
        {
          const {navigate} = this.props.navigation;
          return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <ViewContainer>
                <StatusbarBackground/>
                <View style={styles.infoContainer}>
                  <View style={styles.ButtonParametersCont}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ParametersScreen')}>
                      <Text style={styles.buttonParam}>Paramètres</Text>
                    </TouchableOpacity>
                    <Image source={require('../../image/settings-gears.png')}/>
                  </View>
                  <View style={styles.profilPicture}>
                    <View style={styles.profilPictureBorder}>
                      <Image source ={require('../../image/profilPicture.png')}/>
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.nameText}> EDITH  LOUSSARD </Text>
                    <Text style={styles.descriptionText}> Je suis une globetrotteuse. 
                    J'aimerai partager mes aventures avec vous.</Text>
                  </View>
                </View>
                <View style={styles.affichageContainer}>
                <TouchableOpacity style={styles.btnGalerieProfil}>
                    <Text>Galerie</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCarnetProfil}>
                  <Text>Carnets</Text>
                    </TouchableOpacity>
                </View>
              </ViewContainer>
             </ScrollView>
          )
        }
        // Si l'utilisateur n'est pas connecté, il est renvoyé vers la page de connexion
        else {
          return <Loggin/>
        } 

}
}

