import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import {ImagePicker} from 'expo'; 
import uuid from 'uuid'; 

//Page permettant de créer un carnet 
export default class CreerCarnet extends React.Component {
  constructor(props){
    var today = new Date();
    super(props);
    this.state = {
      user:firebase.auth().currentUser,
      title :'', 
      image: null, 
      description:'',
      date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(),
      author:'', 
      message:'',
      chilkey:'',
  }
  this._pickImage = this._pickImage.bind(this)
  this._delete=this._delete.bind(this)
  this.carnetRef = this.getRef().child('Carnets')
  this._addCarnet=this._addCarnet.bind(this)
  } 
  static navigationOption ={
    headerTitle:'Nouveau carnet',
  };
  //Réccupération des valeurs avant le chargement de la page
  componentDidMount() {
    this.setState({user:firebase.auth().currentUser});
    firebase.database().ref('users/' + this.state.user.uid+'/pseudonyme').on("value", snapshot => {
      this.setState({author: snapshot.val()})});
  }
// obtenir la référence de la base de donnée
  getRef(){
    return firebase.database().ref();
  }
// Fonction permettant de prendre une photo dans la librairie d'image
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
// Fonction permettant de supprimmer l'image prise
  _delete(){
    var uri = this.state.image
    this.setState({image :null})
    // Create a reference to the file to delete
    var Ref = firebase.app()
      .storage("gs://travelapp-29172.appspot.com")
      .ref()
      .child('CarnetImages/' +uri);
    // Delete the file
    Ref.delete()
    .then(
      
    )
    .catch(function(error) {
      console.log(error.message)
  // Uh-oh, an error occurred!
  });
}
// Fonction permettant d'ajouter les informations du nouveau carnet dans la bdd
  _addCarnet = (title,description,date,image,carnetRef) =>{
    this.setState({usableCreer:true,usablePage:false})
    if (description === '' || image === null || title === '' ){
        this.setState({usableCreer:false,usablePage:true})
        alert("Veuillez remplir tous les champs")
    }
    else{
      var user = firebase.auth().currentUser
      var userEmail = user.email
      var postData = {
          titre: title.toString(),
          description : description.toString(),
          date: date.toString(),
          image: image.toString(),
          author : this.state.author,
          pages: [],
      };
      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('Carnets').push().key; 
      this.setState({chilkey:newPostKey})
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates={};
      updates['/users/'+this.state.user.uid+'/user_carnet/'+newPostKey]=postData; 
      firebase.database().ref().update(updates);
      this.props.navigation.navigate('EcrirePageScreen', {keyCarnet:this.state.chilkey})
    }
  }

  //Fonction permettant d'obtenir l'url de la photo enregistré dans le storage de firebase
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

  //Affichage du formulaire
  render() {
    const {navigate} = this.props.navigation;
    let {image} = this.state;
      return (
        <ScrollView>
        <ViewContainer>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.labelPost}>Choisissez une couverture pour votre carnet*</Text>
            <View style={styles.couvertureContainer}>
              { image &&
              <Image source={{uri :image}} style={styles.couverturePicker} />}
            </View>
            <View style={styles.pickContainer}>
              <TouchableOpacity style={styles.btnCarnet} onPress={this._pickImage}>
                <Text style={styles.btnTextCarnet}> CHOISIR </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCarnet} onPress={()=>this._delete.bind(this)}>
                <Text style={styles.btnTextCarnet}>SUPPRIMER</Text>
              </TouchableOpacity>
          </View>
          <Text style={styles.labelPost}>Titre du carnet *:</Text>
          <TextInput 
                    onChangeText={(text)=>this.setState({title: text})}
                    value={this.state.title}
                    maxLength={25}
                    returnKeyType="next"
                    autoCapitalize="sentences"
                    onSubmitEditing={()=> this.descriptionInput.focus()}
                    autoCorrect={false}
                    style={styles.inputCarnet}
            />
            <Text style={styles.labelPost}>Description du contenu *:</Text>
            <TextInput 
                    onChangeText={(text)=>this.setState({description: text})}
                    value={this.state.description}
                    maxLength={25}
                    returnKeyType="go"
                    autoCapitalize="sentences"
                    style={styles.inputCarnet}
                    ref={(input) =>this.descriptionInput = input}
            />
            <View style={styles.btnValContainer}>
            <TouchableOpacity style={styles.btnPost} onPress={()=>this._addCarnet(this.state.title,this.state.description,this.state.date, this.state.image,this.carnetRef)}>
              <Text style={styles.btnTextCarnet}>SUIVANT</Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView> 
        </ViewContainer>
        </ScrollView>
      );
  }
}
// Fonction permettant d'enregistrer l'image dans le storage de firebase
async function uploadImageAsync(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase
    .app()
    .storage("gs://travelapp-29172.appspot.com")
    .ref('CarnetImages/')
    .child(uuid.v4())

  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}