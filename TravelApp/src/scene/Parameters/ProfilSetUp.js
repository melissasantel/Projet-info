import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';
import SwitchButton from '../../components/SwitchButton';
import { ScrollView } from 'react-native-gesture-handler';
import {ImagePicker} from 'expo'; 
import uuid from 'uuid';
// Page de modification du profil de l'utilisateur 
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
    //réccupération des données dans la bdd
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
    // mise en place d'un bouton switch 
    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        console.log('Switch 1 is: ' + value)
    }
    //sélectionner des photos dans la librairie
    _pickImage= async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4,3],
        });
    
        console.log(result);
    
        if(!result.cancelled){
          this._handleImagePicked(result.uri);
        }
      };
      // Fonction permettant de modifier les données de l'utilsateur dans la bdd
    updateUserData(pseudo,profil_picture,visible,description){
        var userId= this.state.user.uid;
        firebase.database().ref('users/'+ userId).update({
            pseudonyme: pseudo.toString(), 
            profil_picture: profil_picture.toString(),
            visible_account:visible.toString(),
            description: description.toString(),
        }).then(
            this.props.navigation.navigate('ProfilScreen')
        )
    }
    // réccupération de l'url de l'image sauvergarder dans le storage de firebase
    _handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
          if (!pickerResult.cancelled){
            uploadUrl = await uploadImageAsync(pickerResult);
            this.setState({ profil_picture: uploadUrl});
        
          }
        } catch (e) {
          console.log(e);
          alert("Le chargement de l'image n'a pas réussis, désolé :(");
        } finally {
          this.setState({ uploading: false });
        }
      };
    //Affichage de la page 
render() {
    const {navigate} = this.props.navigation;
    let {profil_picture} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ViewContainer>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.profilPicture}>
                        <View style={styles.profilPictureBorder}>
                        { profil_picture &&
                        <Image source ={{uri:profil_picture}} style={styles.couverturePicker}/>}
                        </View>
                        <TouchableOpacity onPress={this._pickImage}>
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
                        />
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
async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .app()
      .storage("gs://travelapp-29172.appspot.com")
      .ref('ProfilImage/')
      .child(uuid.v4())
  
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
  }
