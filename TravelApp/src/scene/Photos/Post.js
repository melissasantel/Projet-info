import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,KeyboardAvoidingView, TextInput} from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';

export default class Post extends React.Component {
    constructor(props){
        var today = new Date();
        super(props);
        this.state = {
          description :'',
          date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(),
          users:'',
          location:'',
          uploading:false,
          image:'',
          reussite:'false'
          
        }
        this.postRef= this.getRef().child('post');
        this._addPost=this._addPost.bind(this);

    }
    
    static navigationOption ={
        headerTitle:'Nouvelle publication',
      };

    getRef(){
        return firebase.database().ref();
    }
// A voir pourquoi ça fonctionne pas - lancer la fonction d'ajout post dans firebase
// quelques seconde après pour avoir le temps d'avoir l'image dans la le state
    _addPost = (description,date,location,imageUri,userEmail) =>{
        const postRef = this.postRef
        this._handleImagePicked(imageUri)
          if (this.state.reussite){
            console.log('salut'),
              postRef.push({
                description : description.toString(),
                date: date.toString(),
                location: location.toString(),
                image: this.state.image,
                user : userEmail.toString(),
            })
          }
          else {
            alert('Une erreur est apparue')
          }
        /*.then(
          this.props.navigation.navigate('HomeScreen')
        )  */           
    }

    _handleImagePicked = async imageUri => {
        try {
          this.setState({ uploading: true });
          if (imageUri){
            uploadUrl = await uploadImageAsync(imageUri);
            this.setState({ image: uploadUrl});
            if (this.state.image){
              this.setState({reussite:true})
            }
          }
        } catch (e) {
          console.log(e);
          alert("Le chargement de l'image n'a pas réussis, désolé :(");
        } finally {
          this.setState({ uploading: false });
        }
      };
    

    render(){
        var { params } = this.props.navigation.state; 
        var imageUri = params ? params.imageUri : null;
        var userEmail = params ? params.userEmail : null; 
        var {navigate} = this.props.navigation;
        return (
            <ViewContainer>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Image source={{uri :imageUri}} style={styles.couvCarnet} />
          <TextInput 
                    placeholder="Ajouter une légende"
                    placeholderTextColor='#A9A9A9'
                    onChangeText={(text)=>this.setState({description: text})}
                    value={this.state.description}
                    returnKeyType="next"
                    onSubmitEditing={()=> this.locationInput.focus()}
                    autoCorrect={false}
                    style={styles.inputCarnet}
            />
            <View style={styles.PickContainer}>
            <Text style={styles.label}>Ajouter une localisation</Text>
            <TextInput
                onChangeText={(text)=>this.setState({location: text})}
                value={this.state.location}
                returnKeyType="go"
                autoCorrect={false}
                style={styles.inputCarnet}
                ref={(input) =>this.locationInput = input}
                >
            </TextInput>
            </View>
              <TouchableOpacity style={styles.btnPost}
                onPress={() => {this._addPost(this.state.description,this.state.date,this.state.location,imageUri,userEmail)}}>
                <Text style={styles.btnTextPost}>PUBLIER</Text>
              </TouchableOpacity>
          </KeyboardAvoidingView> 
        </ViewContainer>
        )
    }
}
async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .app()
      .storage("gs://travelapp-29172.appspot.com")
      .ref()
      .child('images')
  
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
  }