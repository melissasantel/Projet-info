import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';


export default class UpdatePassword extends Component {

    updateUserEmail(){
        //Update user's email
            user.updateEmail(this.state.email).then(function() {
                // Update successful.
            }).catch(function(error) {
                // An error happened.
                console.log(error.message)
            });
        }
    render(){
        return (
            <ViewContainer>
            <Text>Modifier le mot de passe</Text>
            <TextInput 
                            placeholder="Mot de passe"
                            onChangeText={(text)=>this.setState({password: text})}
                            value={this.state.password}
                            returnKeyType="go"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputParameters}
                            ref={(input) =>this.passwordInput = input}/>
        </ViewContainer>
        )
    }
}
