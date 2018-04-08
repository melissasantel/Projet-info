//Ici la possibilité de se déconnecter, de mettre un compote privée ou non , modifier le profil, 
//changer le mot de passe .. 
import * as firebase from 'firebase';
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native'; 
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
import ViewContainer from '../../components/ViewContainer';

export default class Parameters extends Component {
    constructor(props){
        super(props)

        this.state={
            message:'',
            authentification: true,
        }
        
    }
    static navigationOptions ={
        headerTitle : 'Paramètres',
    
      };
   componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            this.setState({user});
        })
    }
 
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('ProfilScreen');
        }catch(e){
            console.log(e);
        }
    }
    deleteAccount(){
        this.state.user.delete().then(function() {
            console.log('delete user')
            let ref = firebase.database().ref().child('users/'+this.state.user.uid);
            ref.remove();
            this.props.navigation.navigate('ProfilScreen')
          })
          .catch(function(error) {
            // An error happened.
            console.log(error.message)
            alert('Une erreur est apparue. Déconnectez-vous puis reconnectez-vous avant de réessayer')
          });
    }

    ShowAlertDialog = () => {
        Alert.alert(
            // This is Alert Dialog Title
            'Suppression de compte',
            // This is Alert Dialog Message. 
            'Êtes-vous sûr de vouloir supprimer votre compte ?',
            [
              //First Cancel Button in Alert Dialog.
              {text: 'Annuler', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
              //Second OK Button in Alert Dialog
              {text: 'OK', onPress: () => {this.deleteAccount()}},  
            ]
          )
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ViewContainer>
                <TouchableOpacity style={styles.buttonParameter} onPress={() => this.signOutUser()}>
                    <Text style={styles.buttonParameterText}>Se déconnecter</Text>
                    <Text>{this.state.message}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter} onPress={() =>this.props.navigation.navigate('ProfilSetUpScreen')}>
                    <Text style={styles.buttonParameterText}>Modifier le profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter} onPress={() =>this.ShowAlertDialog()}>
                    <Text style={styles.buttonParameterText}>Supprimer mon compte</Text>
                    <Text>{this.state.message}</Text>
                </TouchableOpacity>
                
            </ViewContainer>
        )
    
    }
    
}