//Page d'authentification
import * as firebase from 'firebase';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity,StatusBar} from 'react-native';
import StatusbarBackground from '../../components/StatusbarBackground';
import ViewContainer from '../../components/ViewContainer';
import { styles } from '../../styles/styles';
import Profil from '../Profil/Profil';
import Signup from '../Register/Register';

export default class Loggin extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '', 
            password:'', 
            user :null ,
            error: '',
            registry: false,
            connexion: false,
        }
         
        this._login = this._login.bind(this)
        this._register = this._register.bind(this)
        
    }
    //Fonction permettant de se connecter à l'application en recherchant les informations dans firebase
    _login() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=> this.setState({error:'',user : firebase.auth().currentUser}))
        .catch(function(error){
            //Gestion des erreurs
            console.log(error.code)
            console.log(error.message)
            
        });
    }
    
    _register (){
        this.setState({registry : true})
    }
    render() {
        if (this.state.registry)
        {
           return <Signup/>;
        }
    
        if (this.state.registry === false) {
            return (

            <ScrollView contentContainerStyle={styles.contentContainer}>
            <ViewContainer>
                <StatusbarBackground/>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image 
                        style={styles.logo}
                        source={require('../../image/map.png')}/>
                        <Text style={styles.title}>TravelApp</Text>
                    </View>
                    <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <TextInput 
                    placeholder="EMAIL"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({email: text})}
                    value={this.state.email}
                    onFocus={this.onFocus}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}/>
                    <TextInput 
                    onChangeText={(text)=>this.setState({password: text})}
                    value={this.state.password}
                    placeholder="MOT DE PASSE"
                    placeholderTextColor='#66CDAA'
                    returnKeyType="go"
                    secureTextEntry
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) =>this.passwordInput = input}
                    />
                    <Text style={styles.errorText}>{this.state.error}</Text>
                    <TouchableOpacity style={styles.buttonLogIn} onPress={() => this._login()}>
                        <Text style={styles.buttonTextLogIn}>CONNEXION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style= {styles.buttonRegister} onPress={() =>this._register()}>
                        <Text style={styles.buttonTextRegister}>CRÉER UN COMPTE !</Text>
                    </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView> 
            </ViewContainer>
            </ScrollView>
        );
    }
    }
}

