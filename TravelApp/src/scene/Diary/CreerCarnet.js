import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import {ImagePicker} from 'expo';

//Entrer les données dans la bases de données. 

export default class CreerCarnet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date:'',
      user:'',
      userEmail:'',
      title :'', 
      image: null, 
      description:'',        
  }
  this._pickImage = this._pickImage.bind(this)
  this._delete=this._delete.bind(this)
  this.carnetRef = this.getRef().child('Carnets');
  this._addCarnet=this._addCarnet.bind(this);
  } 

  static navigationOption ={
    headerTitle:'Création',
  };

  componentDidMount() {
    this.setState({user:firebase.auth().currentUser});
        if (this.state.user){
            this.setState({userEmail: this.state.user.email})
        }  
  } 

  getRef(){
    return firebase.database().ref();
  }

  _addCarnet = (description,date,location,contenue,userEmail,postRef) =>{
    carnetRef.push({
        description : description.toString(),
        date: date.toString(),
        location: date.toString(),
        contenue:contenue.toString(),
        user : userId.toString(),
    })
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

  //TODO Creer un carnet : Titre, description, photo de couverture suivant pour écrire une page
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
                    returnKeyType="next"
                    onSubmitEditing={()=> this.pageInput.focus()}
                    style={styles.inputCarnet}
                    ref={(input) =>this.descriptionInput = input}
            />
            <View style={styles.PickContainer}>
            <TouchableOpacity style={styles.btnPick} onPress={()=>this.props.navigation.navigate('EcrirePageScreen')}>
              <Text>Créer une page</Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView> 
        </ViewContainer>
        </ScrollView>
      );
  }
}