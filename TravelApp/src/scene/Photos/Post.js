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
          users:null,
          location:'',
          uploading:false,
          image:null,
          
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
    _addPost = (description,date,location,imageUri,userEmail,postRef) =>{
        this._handleImagePicked(imageUri)
        .then(
            postRef.push({
                description : description.toString(),
                date: date.toString(),
                location: location.toString(),
                image:this.state.image,
                user : userEmail.toString(),
            })
        )

        
        
    }
    _handleImagePicked = async imageUri => {
        try {
          this.setState({ uploading: true });
          console.log(imageUri)
          if (imageUri){
            uploadUrl = await uploadImageAsync(imageUri);
            this.setState({ image: uploadUrl });
          }
          
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };
    

    render(){
        const { params } = this.props.navigation.state; 
        const imageUri = params ? params.imageUri : null;
        const userEmail = params ? params.userEmail : null; 
        
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
                onPress={() => {this._addPost(this.state.description,this.state.date,this.state.location,imageUri,userEmail,this.postRef)}}>
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
      .storage()
      .ref()
      .child('images');
  
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
  }