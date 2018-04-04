import * as firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';


export default class UpdateEmail extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            user: firebase.auth().currentUser,
            email:'',
        }
    }

    static navigationOptions ={
        headerTitle : 'Adresse e-mail',
    
    }
    componentDidMount(){
        this.setState({user:firebase.auth().currentUser});
        if (this.state.user){
            this.setState({email: this.state.user.email})
        }
    }
    updateUserEmail(email){
        //Update user's email
            user.updateEmail(email).then(function() {
                console.log('Successful')
                this.props.navigation.navigate('ProfilSsetUp')
            }).catch(function(error) {
                // An error happened.
                console.log(error.message)
            });
    }

    render(){
        return (
            <ViewContainer>
                <View style={styles.setUpContainer}>
                    <Ionicons name='ios-mail' size={25} color='#A9A9A9'/>
                    <TextInput 
                        placeholder="E-mail"
                        onChangeText={(text)=>this.setState({email: text})}
                        value={this.state.email}
                        returnKeyType="go"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputParameters}/>
                </View>
                 <View style={styles.setUpContainer}>
                    <TouchableOpacity style={styles.btnPick}
                    onPress={()=> this.updateUserEmail(this.state.email)}>
                        <Text>Enregistrer</Text> 
                    </TouchableOpacity>
                </View>
            </ViewContainer>

        )
    }
}