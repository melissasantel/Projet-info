//Page d'insciprition
import * as firebase from 'firebase';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, 
    KeyboardAvoidingView, TextInput, TouchableOpacity,StatusBar} from 'react-native';
import StatusbarBackground from '../../components/StatusbarBackground';
import ViewContainer from '../../components/ViewContainer';
import { styles } from '../../styles/styles';
import Authentification from '../Authentification/Authentification';
import Profil from '../Profil/Profil';
import { ScrollView } from 'react-native-gesture-handler';

//Mettre une photo de profil par defaut quand l'utilisateur s'inscrit
export default class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lastName:'', 
            firstName: '',
            pseudo:'', 
            email:'',
            password: '',
            verifyPassword:'',
            error: '',  
            back: false,
            user: null,
            profil_picture:'',
            visible_account:true,
        }
        this._register = this._register.bind(this)  
    }

    //Fonction permettant d'inscrire l'utilisateurs dans Firebase.
    _register() {
        if (this.state.password === this.state.verifyPassword){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then (()=> {
                this.setState({ user : firebase.auth().currentUser, error: ''})
            })
            .catch(function(error) {
                // Gestion des erreurs
                console.log(error.code)
                console.log(error.message)             
        }) 
        } 
        else {
            this.setState ({error: 'Les mots de passes ne sont pas identiques', user: null});     
    }
    if (this.state.user)
    {   
        console.log(user.uid)
        this._writeUserData();
    }
}

//Fonction permettant de rentrer les données de l'utilisateurs dans Firebase.
    _writeUserData(){
        firebase.database().ref ('users/' + user.uid).set({
            nom:this.state.lastName,
            prenom:this.state.firstName,
            pseudonyme: this.state.pseudo,
            mail:this.state.email,
            mdp:this.state.password,
            profil_picture:'',
            visible_account:true,
        });
    }
    _goBback() {
        this.setState({back:true})
    }
    
    render() {
        //const {navigate} = this.props.navigation;

        if ( this.state.back === false && this.state.user === null){
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
            <ViewContainer>
                <StatusbarBackground/>
                
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <TextInput 
                    placeholder="NOM"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({lastName: text})}
                    value={this.state.lastName}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.firstNameInput.focus()}
                    autoCapitalize="none" // voir si c'est maj en début
                    autoCorrect={false}
                    style={styles.input}/>
                    <TextInput 
                    placeholder="PRÉNOM"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({firstName: text})}
                    value={this.state.firstName}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.pseudoInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) =>this.firstNameInput = input}/>
                    <TextInput 
                    placeholder="PSEUDO"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({pseudo: text})}
                    value={this.state.pseudo}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.emailInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) =>this.pseudoInput = input}/>
                    <TextInput 
                    placeholder="EMAIL"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({email: text})}
                    value={this.state.email}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) =>this.emailInput = input}/>
                    <TextInput 
                    placeholder="MOT DE PASSE"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({password: text})}
                    value={this.state.password}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.passwordConfInput.focus()}
                    secureTextEntry
                    style={styles.input}
                    ref={(input) =>this.passwordInput = input}
                    />
                    <TextInput 
                    placeholder="CONFIRMER LE MOT DE PASSE"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({verifyPassword: text})}
                    value={this.state.verifyPassword}
                    secureTextEntry
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) =>this.passwordConfInput = input}/>
                    <Text style={styles.errorText}>{this.state.error}</Text>
                    <TouchableOpacity style={styles.buttonLogIn} onPress={this._register.bind(this)}>
                        <Text style={styles.buttonTextLogIn}>INSCRIPTION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style= {styles.buttonRegister} onPress={() =>this._goBback()}>
                        <Text style={styles.buttonTextRegister}>RETOUR</Text>
                    </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                
            </ViewContainer>
            </ScrollView> 
        );
    }
    if (this.state.back){
        return <Authentification/>;
    }
    if (this.state.user){
        return <Profil/>;
    }
    }
}
