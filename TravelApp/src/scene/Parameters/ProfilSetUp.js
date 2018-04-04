import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';
import SwitchButton from '../../components/SwitchButton';
import { ScrollView } from 'react-native-gesture-handler';


export default class ProfilSetUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo:'', 
            email:'',
            error: '',  
            profil_picture:'',
            user: firebase.auth().currentUser,
            switch1Value: true,
            message: '', 
        }
    }

    static navigationOptions ={
        headerTitle : 'Modifier le profil',
    
    }

    componentDidMount() {
        this.setState({user:firebase.auth().currentUser});
            if (this.state.user){
                this.renderUserData(this.state.user)
            }
        
    }

    renderUserData(user){ 
        firebase.database().ref('users/' + user.uid+'/pseudonyme').on("value", snapshot => {
          this.setState({pseudo: snapshot.val()})});
        console.log(this.state.pseudo),
        firebase.database().ref('users/' + user.uid+'/profil_picture').on("value", snapshot => {
          this.setState({profil_picture: snapshot.val()})});
        firebase.database().ref('users/' + user.uid+'/description').on("value", snapshot => {
          this.setState({description: snapshot.val()})});
        this.setState({
            email : user.email, 
        })
      }

    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        console.log('Switch 1 is: ' + value)
    }

   

    updateUserData(pseudo,profil_picture,visible,description){
        var userId= this.state.user.uid;
        var updateData ={
            pseudonyme: pseudo.toString(), 
            profil_picture: profil_picture.toString(),
            visible_account:visible.toString(),
            description: description.toString(),
        };
        var updates={};
        updates['users/'+ userId] = updateData;
        return firebase.database().ref().update(updates);
        this.setState({message:'Les modifications ont été réalisé'})
    }
     
    
render() {
    const {navigate} = this.props.navigation;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ViewContainer>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.profilPicture}>
                        <View style={styles.profilPictureBorder}>
                        <Image source ={{uri:this.state.profil_picture}}/>
                        </View>
                        <TouchableOpacity>
                            <Text>Modifier la photo de profil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.setUpContainer}>
                        <Text style={styles.lblSetUp}>Pseudo :</Text>
                        <TextInput 
                            placeholder="Pseudo.."
                            onChangeText={(text)=>this.setState({pseudo: text})}
                            value={this.state.pseudo}
                            returnKeyType="next"
                            onSubmitEditing={()=> this.firstNameInput.focus()}
                            autoCapitalize="none" 
                            autoCorrect={false}
                            style={styles.inputParameters}/>
                    </View>
                    <View style={styles.setUpContainer}>
                    <Text style={styles.lblSetUp}>Description :</Text>
                    <TextInput 
                        placeholder="Légende.."
                        onChangeText={(text)=>this.setState({description: text})}
                        value={this.state.description}
                        returnKeyType="go"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        style={styles.inputParameters}
                        ref={(input) =>this.pseudoInput = input}/>
                    </View>
                    <View style={styles.setUpContainer}>
                        <Text style={styles.lblSetUp}>Email :</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('UdapteEmailScreen')}>
                           <Text style={styles.inputParameters}>{this.state.email}</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.setUpContainer}>
                        <Text style={styles.lblSetUp}>Compte privé :</Text>
                        <SwitchExample
                            toggleSwitch1 = {this.toggleSwitch1}
                            switch1Value = {this.state.switch1Value}/>
                    </View>
                    <View style={styles.setUpContainer}>
                        <TouchableOpacity style={styles.btnPick}
                            onPress={()=> this.updateUserData(this.state.pseudo,this.state.profil_picture,this.state.switch1Value, this.state.description)}>
                            <Text>Enregistrer</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.setUpContainer}>
                        <Text>{this.state.message}</Text> 
                    </View>
                    </KeyboardAvoidingView>
                </ViewContainer>
            </ScrollView>
         
        )
    }
}

