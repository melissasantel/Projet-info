import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import {ImagePicker} from 'expo';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';
import uuid from 'uuid';

//Page permettant de prendre des photos
export default class Photo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        user:null,
        image: null,
    }
    this._pickImage = this._pickImage.bind(this)
    this._takeImage = this._takeImage.bind(this)
    this._removePictures = this._removePictures.bind(this)
  }

  static navigationOptions ={
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
        this.setState({user});
    }) 
  }
// Choisir une image dans la librairie
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
// Prendre une photo avec la caméra
 _takeImage = async() =>{
   let result1 = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [4,3],
   });

   console.log(result1);

   if(!result1.cancelled)
   {
    this._handleImagePicked(result1.uri);
   }

 };
 // supprimer la photo choisit
 _removePictures(){
   var uri = this.state.image; 
   this.setState({image : null})
    // Create a reference to the file to delete
    var Ref = firebase.app()
      .storage("gs://travelapp-29172.appspot.com")
      .ref()
      .child('PostImage/'+ uri);

    // Delete the file
    Ref.delete().then(function() {
      this.setState({image :null});
    }).catch(function(error) {
      console.log(error.message)
  // Uh-oh, an error occurred!
});
  
};
//réccupérer l'url de l'image enregistré dans le storage
_handleImagePicked = async pickerResult => {
  try {
    this.setState({ uploading: true });
    if (!pickerResult.cancelled){
      uploadUrl = await uploadImageAsync(pickerResult);
      this.setState({ image: uploadUrl});
  
    }
  } catch (e) {
    console.log(e);
    alert("Le chargement de l'image n'a pas réussis, désolé :(");
  } finally {
    this.setState({ uploading: false });
  }
};
// affichage
  render() {
    const {navigate} = this.props.navigation;

    let {image} = this.state;
    // si l'utilisateur n'est pas connecté
    if (this.state.user=== null){
      return(
        <ViewContainer>
          <StatusbarBackground/>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={require('../../image/photo-camera2.png')}/>
          </View>
            <Text 
            style={styles.informationMessage}>
            Vous devez vous connecter pour publier des photos !
            </Text>
        </ViewContainer>
  

      )
    }
    //si l'utilisateur est connecté
    if (this.state.user){
      //si il n'y a pas d'image sélectionné
    if (image ===null) {
      return (
        <ViewContainer>
          <StatusbarBackground/>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={require('../../image/photo-camera2.png')}/>
          </View>
          <View style={styles.buttonImageContainer}>
            <Text style={{textAlign:'center', marginTop:20, marginBottom :20}}>Ici vous pouvez rajouter vos photos et vidéos pour agrémenter vos histoires !</Text>
            <TouchableOpacity style={styles.buttonImage} onPress={this._pickImage}>
              <Text style={styles.buttonTextImage}> Photo/vidéo de la bibliothèques </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonImage} onPress={this._takeImage}>
              <Text style={styles.buttonTextImage}>Prendre une photo/Video</Text>
            </TouchableOpacity>
          </View>
        </ViewContainer>
  
      );
    }
    else {
      //si il y a une image 
      return (
        <ViewContainer>
          <StatusbarBackground/>
          <View style={styles.imagePickerContainer}>
          { image &&
          <Image source={{uri :image}} style={styles.imagePicker} />}
          </View>
          <View style={styles.btnPostContainer}>
            <TouchableOpacity style={styles.btnPost}
            onPress={this._removePictures}>
                <Text style={styles.btnTextPost}>ANNULER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPost}
            onPress={()=>{this.props.navigation.navigate('PostScreen', {imageUri: this.state.image});}}>
                <Text style={styles.btnTextPost}>SUIVANT</Text>
            </TouchableOpacity>
          </View>
        </ViewContainer>
      )
    } 
  }
    
  };

}
async function uploadImageAsync(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase
    .app()
    .storage("gs://travelapp-29172.appspot.com")
    .ref('PostImage/')
    .child(uuid.v4())

  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}


