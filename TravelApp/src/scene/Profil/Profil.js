import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button,ScrollView, TouchableOpacity, ListView } from 'react-native';
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
            val : 'post',
            user: '',
            pseudo : '',
            imageUri : '',
            description:'',
        };
        
    }

    static navigationOptions ={
      header: null

    };

   componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({user});
      if (user){
        this.renderUserData(user)
      } 
   })  
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({user});
      if (user){
        this.renderUserData(user)
      }
    }) 
  }

  renderUserData(user){ 
    firebase.database().ref('users/' + user.uid+'/pseudonyme').on("value", snapshot => {
      this.setState({pseudo: snapshot.val()})});
    firebase.database().ref('users/' + user.uid+'/profil_picture').on("value", snapshot => {
      this.setState({imageUri: snapshot.val()})});
    firebase.database().ref('users/' + user.uid+'/description').on("value", snapshot => {
      this.setState({description: snapshot.val()})});
  }

  render() {  
  //si l'utilisateur est connecté il visualise sont profil.
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
                      <Image source ={{uri:this.state.imageUri}}/>
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.nameText}>{this.state.pseudo}</Text>
                    <Text style={styles.descriptionText}>{this.state.description}</Text>
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

