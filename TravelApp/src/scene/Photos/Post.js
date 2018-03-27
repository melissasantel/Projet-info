import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,KeyboardAvoidingView, TextInput} from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';

//mettre la date du jour avec datepicker sur nmp
//https://www.npmjs.com/package/react-native-datetime

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          description :'',  
          date:'',
          users:null,
          location:'',
          
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
    _addPost = (description,date,location,contenue,userId,postRef) =>{
        postRef.push({
            description : description.toString(),
            date: date.toString(),
            location: date.toString(),
            contenue:contenue.toString(),
            user : userId.toString(),
        })
    }

    render(){
        const { params } = this.props.navigation.state; 
        const imageUri = params ? params.imageUri : null;
        const userId = params ? params.userId : null; 
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
                onPress={() => {this._addPost(this.state.description,this.state.date,this.state.location,imageUri,userId,this.postRef)}}>
                <Text style={styles.btnTextPost}>PUBLIER</Text>
              </TouchableOpacity>
          </KeyboardAvoidingView> 
        </ViewContainer>
        )
    }
}