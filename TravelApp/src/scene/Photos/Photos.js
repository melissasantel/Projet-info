import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import {ImagePicker} from 'expo';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';

//TODO enregistré les images dans la BDD et les associées à un utilisateurs.
//Les ajoutées aux postes cf sur Gaetan 

export default class Photo extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        image: null,
    }
    this._pickImage = this._pickImage.bind(this)
    this._takeImage = this._takeImage.bind(this)
    //this._startAgain = this._startAgain.bind(this)
  }
  _pickImage= async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3],
    });

    console.log(result);

    if(!result.cancelled){
      this.setState({image:result.uri});
    }
  };

 _takeImage = async() =>{
   let result1 = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [4,3],
   });

   console.log(result1);

   if(!result1.cancelled)
   {
     this.setState({image:result1.uri});
   }

 };
 /*_startAgain (){
    this.setState({image :null});
};*/
  
  render() {
    let {image} = this.state;
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
      return (
        <ViewContainer>
          <StatusbarBackground/>
          <View style={styles.imagePickerContainer}>
          { image &&
          <Image source={{uri :image}} style={styles.imagePicker} />}
          </View>
          <TouchableOpacity style={styles.buttonAnnuler}>
              <Text style={styles.buttonTextImage}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPublier}>
              <Text style={styles.buttonTextImage}>Publier</Text>
          </TouchableOpacity>
        </ViewContainer>
      )
    } 
    
  };

};


