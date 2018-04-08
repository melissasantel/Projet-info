import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import Icons from 'react-native-vector-icons/Feather';
import {ImagePicker} from 'expo'; 
import uuid from 'uuid';


export default class EcrirePage extends React.Component {
    constructor(props){
        var today = new Date();
        super(props);
        
        this.state = {
          titre:'',
          texte:'',
          weather:'',
          location:'',
          image:null,
          date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(), 
        }
        this._addPage=this._addPage.bind(this)
      } 
      static navigationOption ={
        headerTitle:'Nouvelle page',
      };
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

      _addPage(titre,texte,weather,location,image,date){
        let pageCarnetPath= "Carnets/"+keyCarnet+"pages";
        let pageRef= firebase.database().ref(pageCarnetPath);
        pageRef.push({
            titre: titre.toString(),
            texte: texte.toString(),
            weather : weather.toString(),
            location : location.toString(),
            date: date.toString(),
            image: image.toString(),
        }).then(
            this.props.navigation.navigate('DetailsCarnets', {keyCarnet :keyCarnet})
        )

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
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;
        var titreCarnet = params ? params.titre : null;
        let {image} = this.state;
          return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <ViewContainer>
                  <StatusbarBackground/>
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
                  <Text>Titre :  </Text>
                  <TextInput
                    onChangeText={(text)=>this.setState({titre: text})}
                    value={this.state.titre}
                    returnKeyType="next"
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    style={styles.input}
                  />
                  <Text>Date : {this.state.date}</Text>    
                  <Text>Weather :  </Text>  
                  <Icons name='sun' type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'sun'})} />
                  <Icons name='cloud' type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'cloud'})} />
                  <Icons name='cloud-rain' type='feather' size={22} color='#66CDAA' onPress={() =>this.setState({weather : 'rain'})} />
                  <Icons name='cloud-snow' type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'snow'})} />
                  <Text>Location: </Text> 
                  <TextInput
                    placeholder="Ecrivez vos premières lignes"
                    editable = {true}
                    //maxLength = {40}
                    multiline = {true}
                    numberOfLines = {10}
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    onChangeText={(text) => this.setState({texte: text})}
                    value={this.state.texte}
       />           
                  <TouchableOpacity onPress={()=>this._addPage(this.state.titre,this.state.texte,this.state.weather,this.state.location,this.state.image, this.state.date)}>
                      Enregistrer ma page
                  </TouchableOpacity>
              </ViewContainer>
            </ScrollView>

          )
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