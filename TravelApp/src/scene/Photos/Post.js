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
          author:'',
          location:'',
          uploading:false,
          reussite:false, 
          visible:'',
          user:firebase.auth().currentUser,
          
        }
        this._addPost=this._addPost.bind(this);

    }
    
    static navigationOption ={
        headerTitle:'Nouvelle publication',
      };

    componentDidMount() {
      this.setState({user:firebase.auth().currentUser});
      firebase.database().ref('users/' + this.state.user.uid+'/pseudonyme').on("value", snapshot => {
        this.setState({author: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/visible_account').on("value", snapshot => {
          this.setState({visible: snapshot.val()})});
    }

    _addPost = (description,date,location,imageUri)=>{
      // A post entry.
        var postData = {
          description : description.toString(),
                date: date.toString(),
                location: location.toString(),
                image: imageUri.toString(),
                author : this.state.author,
                visible : this.state.visible,
                user : this.state.user.uid,
        };
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('post').push().key; 
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates={};
        updates['/post/' + newPostKey]=postData;
        updates['/users/'+this.state.user.uid+'/user_post/'+newPostKey]=postData; 
        firebase.database().ref().update(updates);

        this.props.navigation.navigate('HomeScreen')           
    }

    

    render(){
        var { params } = this.props.navigation.state; 
        var imageUri = params ? params.imageUri : null; 
        const {navigate} = this.props.navigation;
        return (
            <ViewContainer>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.imageLegendeCont}>
            <Image source={{uri :imageUri}} style={styles.couvCarnet} />
              <TextInput 
                placeholder="Ajouter une légende"
                onChangeText={(text)=>this.setState({description: text})}
                value={this.state.description}
                returnKeyType="next"
                onSubmitEditing={()=> this.locationInput.focus()}
                autoCorrect={true}
                style={styles.inputPost}/>
          </View>
          <View style={{width:300, height:1, backgroundColor: 'black'}} />
          <View style={styles.imageLegendeCont}>
            <Text style={styles.labelPost}>Ajouter un lieu:</Text>
            <TextInput
              placeholder="Lieu .."
              onChangeText={(text)=>this.setState({location: text})}
              value={this.state.location}
              returnKeyType="go"
              autoCorrect={true}
              style={styles.inputPost}
              ref={(input) =>this.locationInput = input}/>
          </View>
              <TouchableOpacity style={styles.btnPost}
                onPress={() => {this._addPost(this.state.description,this.state.date,this.state.location,imageUri)}}>
                <Text style={styles.btnTextPost}>PUBLIER</Text>
              </TouchableOpacity>
          </KeyboardAvoidingView> 
        </ViewContainer>
        )
    }
}
