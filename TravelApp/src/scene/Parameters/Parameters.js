// Page de paramètre
//Ici la possibilité de se déconnecter, de mettre un compote privée ou non , modifier le profil, 
//changer le mot de passe .. 
import * as firebase from 'firebase';
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'; 
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
        }catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <ViewContainer>
                <TouchableOpacity style={styles.buttonParameter} onPress={() => this.signOutUser()}>
                    <Text style={styles.buttonParameterText}>Se déconnecter</Text>
                    <Text>{this.state.message}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter}>
                    <Text style={styles.buttonParameterText}>Compte privé</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.passwordUdapte()} style={styles.buttonParameter}>
                    <Text style={styles.buttonParameterText}>Changer le mot de passe</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.profilPicturUdapte()} style={styles.buttonParameter}>
                    <Text style={styles.buttonParameterText}>Changer de photos de profil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.descriptionUdapte()} style={styles.buttonParameter}>
                    <Text style={styles.buttonParameterText}>Changer la description</Text>
                </TouchableOpacity>
            </ViewContainer>
        )
    
    }
    
}