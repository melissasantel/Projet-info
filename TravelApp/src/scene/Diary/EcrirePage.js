import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput,
   KeyboardAvoidingView,TouchableOpacity, Keyboard } from 'react-native';
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
          userId:'',
          childKey:'',
          image:null,
          date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(), 
        }
        this._addPage=this._addPage.bind(this)
      } 
      static navigationOption ={
        headerTitle:'Nouvelle page',
      };
      componentWillMount(){
        let useruid='';
        useruid = firebase.auth().currentUser.uid;
        this.setState({userId:useruid});
              console.log('salut')
              console.log(useruid);
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
        Ref.delete()
        .then(
          this.setState({image :null})
        )
        .catch(function(error) {
          console.log(error.message)
      // Uh-oh, an error occurred!
      });
    }

  _addPage(titre,texte,weather,location,image,date, keyCarnet){
    if (titre === '' || texte === '' ){
        this.setState({usableCreer:false,usablePage:true})
        alert("Veuillez remplir tous les champs titre et texte")
    }
    else{
      var pageData = {
        titre: titre.toString(),
        texte: texte.toString(),
        weather : weather.toString(),
        location : location.toString(),
        date: date.toString(),
        image: image.toString(),
      };
    
      // Get a key for a new Post.
      var newPageKey = firebase.database().ref('users/'+this.state.userId+'/user_carnet/'+keyCarnet).child('pages').push().key; 
      this.setState({childKey:newPageKey})
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates={};
      updates['/users/'+this.state.userId+'/user_carnet/'+keyCarnet+'/pages/'+newPageKey]=pageData; 
      firebase.database().ref().update(updates);
      this.props.navigation.navigate('DetailsCarnetScreen', {keyCarnet:keyCarnet})
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
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;
        var titreCarnet = params ? params.titre : null;
        let {image} = this.state;
          return (
            <ScrollView 
            contentContainerStyle={styles.contentContainer}>
              <ViewContainer>
                  <KeyboardAvoidingView behavior="padding" style={styles.container}>
                  <Text style={styles.labelPost}>Choisir une couverture</Text>
                  <View style={styles.imagePageContainer}>
                    { image &&
                    <Image source={{uri :image}} style={styles.imagePage} />}
                  </View>
                  <View style={styles.pickContainer}>
                    <TouchableOpacity style={styles.btnPickPage}
                    onPress={this._pickImage}>
                      <Text > Choisir </Text>
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.btnPickPage}
                                      onPress={()=>this._delete.bind(this)}>
                      <Text>Supprimer</Text>
                  </TouchableOpacity>
                  </View>
                  <Text style={styles.labelPost}>Date : {this.state.date}</Text>
                  <View style={styles.PickContainer}>
                    <Text style={styles.labelPost}>Titre :</Text>
                    <TextInput
                      placeholder='Mon titre'
                      onChangeText={(text)=>this.setState({titre: text})}
                      value={this.state.titre}
                      returnKeyType="next"
                      autoCapitalize="sentences"
                      autoCorrect={true}
                      style={styles.inputPost}
                    />
                    </View>                  
                  
                  <View style={styles.PickContainer}>
                    <Text style={styles.labelPost}>Weather :</Text>  
                    <Icons name='sun' style={styles.iconPage} type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'sun'})} />
                    <Icons name='cloud' style={styles.iconPage} type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'cloud'})} />
                    <Icons name='cloud-rain' style={styles.iconPage} type='feather' size={22} color='#66CDAA' onPress={() =>this.setState({weather : 'rain'})} />
                    <Icons name='cloud-snow' style={styles.iconPage} type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'snow'})} />
                    <Text style={styles.weatherStyle}>{this.state.weather}</Text>
                  </View>
                  <View style={styles.PickContainer}>
                    <Text style={styles.labelPost}>Location: </Text>
                    <TextInput
                        placeholder='Paris,France'
                        onChangeText={(text)=>this.setState({location: text})}
                        value={this.state.location}
                        returnKeyType="next"
                        autoCapitalize="sentences"
                        autoCorrect={true}
                        style={styles.inputPost}
                      /> 
                  </View>
                  <Text style={styles.labelPost}>Texte: </Text>  
                  <TextInput style={{
                    height:100,
                    margin:20, 
                    padding:10,
                    borderColor:'#fff',
                    }}
                    placeholder="Ecrivez vos premières lignes"
                    editable = {true}
                    multiline = {true}
                    returnKeyType='done'
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    onChangeText={(text) => this.setState({texte: text})}
                    value={this.state.texte}
                    onSubmitEditing={Keyboard.dismiss}
                  />           
                  <TouchableOpacity style={styles.btnPickPage}
                  onPress={()=>this._addPage(this.state.titre,this.state.texte,this.state.weather,this.state.location,this.state.image, this.state.date, keyCarnet)}>
                      <Text>Enregistrer ma page</Text>
                  </TouchableOpacity>
                  </KeyboardAvoidingView>
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