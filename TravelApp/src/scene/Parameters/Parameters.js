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
        
        /*.then(()=> this.setState({ authentification: false, message:'Vous êtes maintenant déconnecté', user : null}))
        .catch(function(error){
            //Gestion des erreurs
            console.log(error.code)
            console.log(error.message)
        });
    }*/

    render() {
        return (
            <ViewContainer>
                <StatusbarBackground/>
                <TouchableOpacity style={styles.buttonParameter} onPress={() => this.signOutUser()}>
                    <Text style={styles.buttonTextLogIn}>Se déconnecter</Text>
                    <Text>{this.state.message}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter}>
                    <Text style={styles.buttonTextLogIn}>Compte privé</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter}>
                    <Text style={styles.buttonTextLogIn}>Changer le mot de passe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter}>
                    <Text style={styles.buttonTextLogIn}>Changer de photos de profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonParameter}>
                    <Text style={styles.buttonTextLogIn}>Changer la description</Text>
                </TouchableOpacity>
            </ViewContainer>
        )
    
    }
    
}