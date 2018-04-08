import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import {ImagePicker} from 'expo'; 
import uuid from 'uuid';

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
      usableCreer:false,
      usablePage:true
  }
  this._pickImage = this._pickImage.bind(this)
  this._delete=this._delete.bind(this)
  this.carnetRef = this.getRef().child('Carnets')
  this._addCarnet=this._addCarnet.bind(this)
  } 
  static navigationOption ={
    headerTitle:'Nouveau carnet',
  };
  componentDidMount() {
    this.setState({user:firebase.auth().currentUser});
    firebase.database().ref('users/' + this.state.user.uid+'/pseudonyme').on("value", snapshot => {
      this.setState({author: snapshot.val()})});
  }

  getRef(){
    return firebase.database().ref();
  }

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

  _delete(){
    // Create a reference to the file to delete
    var Ref = firebase.app()
      .storage("gs://travelapp-29172.appspot.com")
      .ref('CarnetImages/')
      .child(this.state.image);

    // Delete the file
    Ref.delete().then(function() {
      this.setState({image :null});
    }).catch(function(error) {
      console.log(error.message)
  // Uh-oh, an error occurred!
  });
}

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
      updates['/Carnets/' + newPostKey]=postData;
      updates['/users/'+this.state.user.uid+'/user_carnet/'+newPostKey]=postData; 
      return firebase.database().ref().update(updates);
    }
  }

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

  render() {
    const {navigate} = this.props.navigation;
    let {image} = this.state;
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <ViewContainer>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.label}>Titre du carnet :</Text>
          <TextInput 
                    onChangeText={(text)=>this.setState({title: text})}
                    value={this.state.title}
                    returnKeyType="next"
                    autoCapitalize="sentences"
                    onSubmitEditing={()=> this.descriptionInput.focus()}
                    autoCorrect={false}
                    style={styles.inputCarnet}
            />
            <View style={styles.PickContainer}>
            <Text style={styles.label}>Choisir une couverture</Text>
            <TouchableOpacity style={styles.btnPick}
            onPress={this._pickImage}>
              <Text > Choisir </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.couvertureContainer}>
              { image &&
              <Image source={{uri :image}} style={styles.couverturePicker} />}
              <TouchableOpacity style={styles.btnPick}
              onPress={()=>this._delete.bind(this)}>
                <Text>Supprimer</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Description du contenu :</Text>
            <TextInput 
                    onChangeText={(text)=>this.setState({description: text})}
                    value={this.state.description}
                    returnKeyType="go"
                    autoCapitalize="sentences"
                    style={styles.inputCarnet}
                    ref={(input) =>this.descriptionInput = input}
            />
            <View style={styles.PickContainer}>
            <TouchableOpacity disabled={this.state.usableCreer}falsee={styles.btnPick} onPress={()=>this._addCarnet(this.state.title,this.state.description,this.state.date, this.state.image,this.carnetRef)}>
              <Text>Créer mon carnet</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={this.state.usablePage}falsee={styles.btnPick} onPress={()=>this.props.navigation.navigate('EcrirePageScreen', {keyCarnet:this.state.chilkey})}>
              <Text>Créer ma page</Text>
            </TouchableOpacity>

            </View>
          </KeyboardAvoidingView> 
        </ViewContainer>
        </ScrollView>
      );
  }
}
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