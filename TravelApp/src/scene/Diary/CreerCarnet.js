import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import {ImagePicker} from 'expo'; 

export default class CreerCarnet extends React.Component {
  constructor(props){
    var today = new Date();
    super(props);
    this.state = {
      title :'', 
      image: null, 
      description:'',
      date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(),
      userEmail:'', 
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
      this.setState({image:result.uri});
    }
  };

  _delete(){
    this.setState({image:null});
  }

  _addCarnet = (title,description,date,image,carnetRef) =>{
    if (description === '' || image === null || title === '' ){
        this.setState({message : "Veuillez remplir tout les champs"})
    }
    else{
      var childkey=''
      var user = firebase.auth().currentUser
      var userEmail = user.email
      carnetRef.push({
          titre: title.toString(),
          description : description.toString(),
          date: date.toString(),
          image: image.toString(),
          user : userEmail.toString(),
          pages: title.toString()+'Pages',
      }).then(
        this.carnetRef.limitToLast(1).on('child_added', function(childSnapshot) {
          childkey = childSnapshot.key;
          
         }), 
         this.props.navigation.navigate('EcrirePageScreen', {keyCarnet :childkey})
      )
    }
  }

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
            <Text>{this.state.message}</Text>
            <TouchableOpacity style={styles.btnPick} onPress={()=>this._addCarnet(this.state.title,this.state.description,this.state.date, this.state.image,this.carnetRef)}>
              <Text>Créer une page</Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView> 
        </ViewContainer>
        </ScrollView>
      );
  }
}