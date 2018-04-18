import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button,ScrollView, TouchableOpacity, ListView, Alert } from 'react-native';
import Loggin from '../Authentification/Authentification';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';
import Icons from 'react-native-vector-icons/Feather';

export default class Profil extends Component {
    constructor() {
        super();
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            parametre: false,
            val : 'post',
            user: '',
            userId:'',
            pseudo : '',
            imageUri : '',
            description:'',
            userMail:'',
            postDataSource:ds, 
            carnetDataSource:ds,
        };
        this.renderRow=this.renderRow.bind(this);
    }

    static navigationOptions ={
      header: null
    };
    
  getPost(){
    this.setState({val:'post'})
  }
  getCarnet(){
    this.setState({val:'carnet'})
    var carnetRef = firebase.database().ref('users/'+this.state.userId).child('user_carnet').orderByChild('user_carnet/date');
    this.CarnetRef(carnetRef);

  }

    getRef(){
      return firebase.database().ref();
    }

   componentDidMount() {
    var userId='';
    var userEmail='';
    this.setState({val:'post'})
    firebase.auth().onAuthStateChanged((user)=>{
        this.setState({user})
        if(user){
            userId = firebase.auth().currentUser.uid;
            userEmail = firebase.auth().currentUser.email
            this.setState({userId:userId, userMail:userEmail})
            this.renderUserData(user);
            if (this.state.val==='post'){
            var postRef = firebase.database().ref('users/'+userId).child('user_post').orderByChild('date');
            this.PostRef(postRef);
            }
        } 
   })  
  }
  
  CarnetRef(Ref){
    Ref.on('value',(snap) => {
      let carnets =[];
      snap.forEach((child) => {
          carnets.push({
              title: child.val().titre,
              photo: child.val().image,
              descrip: child.val().description,
              _key: child.key
          });
      });
      this.setState({
          carnetDataSource: this.state.carnetDataSource.cloneWithRows(carnets)
        });
    }); 
  }

  PostRef(Ref){
    Ref.on('value', (snap)=>{
      let post=[];
      snap.forEach((child) => {
        post.push({
          author: child.val().author,
          location:child.val().location,
          image: child.val().image,
          descrip: child.val().description,
          date : child.val().date,
          _key: child.key
        }); 
      });
      this.setState({
        postDataSource: this.state.postDataSource.cloneWithRows(post)
      });
    });
  }
  
  pressRow(post){
    console.log(post);
  }
  renderRow(data){
    if (this.state.val==='post'){
      return(
        <View style={styles.postContainer}>
        <View style={styles.trashContainer}>
          <Icons name='trash-2' type='feather' size={24} color='skyblue' onPress={() => this.deleteFile(data._key) } />
        </View>
        <View style={styles.titreDateContainer}>
            <Text style={styles.postTitle}>{data.author}</Text>
          <Text>{data.date}</Text>
        </View>
        <Text>{data.location}</Text>
        <View style={styles.postPhotoContainer}>
          <Image source={{uri :data.image}} style={styles.photoPost}></Image>
        </View>
        <Text style={styles.postText}>{data.descrip}</Text>
      </View>
      ) 
    }
    else{
      return(
        <View style={styles.postContainer}>
        <View style={styles.trashContainer}>
          <Icons name='trash-2' type='feather' size={24} color='skyblue' onPress={() => this.deleteFile(data._key) } />
        </View>
        <TouchableOpacity onPress={() => {this.pressRowCarnet(data);}}>
                    <Text style={styles.postTitle}>{data.title}</Text>
                </TouchableOpacity>
            <View style={styles.postPhotoContainer}>
                <Image source={{uri :data.photo}} style={styles.photoPost}></Image>
            </View>
            <View style={styles.infoCarnetContainer}>
                
                <Text style={styles.CarnetDescrText}>{data.descrip}</Text>
            </View>
      </View>
        )
    }
  }

  deleteFile(key){
    if (this.state.val==='carnet'){
      let ref = firebase.database().ref('users/'+this.state.userId).child('/user_carnet/'+key);
      Alert.alert(
          // This is Alert Dialog Title
          'Suppression du carnet',
          // This is Alert Dialog Message. 
          'Êtes-vous sûr de vouloir supprimer ce carnet ?',
          [
            //First Cancel Button in Alert Dialog.
            {text: 'Annuler', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
            //Second OK Button in Alert Dialog
            {text: 'OK', onPress: () => {ref.remove()}},  
          ]
        )
    }
    if (this.state.val==='post'){
      let ref = firebase.database().ref('users/'+this.state.userId).child('/user_post/'+key);
      let ref1=firebase.database().ref().child('post/'+key)
      Alert.alert(
          // This is Alert Dialog Title
          'Suppression du carnet',
          // This is Alert Dialog Message. 
          'Êtes-vous sûr de vouloir supprimer ce post ?',
          [
            //First Cancel Button in Alert Dialog.
            {text: 'Annuler', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
            //Second OK Button in Alert Dialog
            {text: 'OK', onPress: () => {ref.remove(),ref1.remove()}},  
          ]
        )
        
    }
  }
  

  renderUserData(user){ 
    firebase.database().ref('users/' + user.uid+'/pseudonyme').on("value", snapshot => {
      this.setState({pseudo: snapshot.val()})});
    firebase.database().ref('users/' + user.uid+'/profil_picture').on("value", snapshot => {
      this.setState({imageUri: snapshot.val()})});
    firebase.database().ref('users/' + user.uid+'/description').on("value", snapshot => {
      this.setState({description: snapshot.val()})});
  }

  render() {  
  //si l'utilisateur est connecté il visualise sont profil.
  const {navigate} = this.props.navigation;
    if (this.state.user && this.state.val === 'post'){
          return (
            <ScrollView>
              <ViewContainer>
                <StatusbarBackground/>
                <View style={styles.infoContainer}>
                  <View style={styles.pickContainer}>
                    <View style={styles.profilPicture}>
                      <View style={styles.profilPictureBorder}>
                        <Image source ={{uri:this.state.imageUri}} style={styles.couverturePicker}/>
                      </View>
                    </View>
                  </View>
                  <View style={styles.nameparaContainer}>
                    <Text style={styles.nameText}>{this.state.pseudo}</Text>
                      <Icons  name='settings' type='feather' size={22} color='#A9A9A9' onPress={()=>this.props.navigation.navigate('ParametersScreen')} />
                  </View>
                  <View style={styles.description}>
                    
                    <Text style={styles.descriptionText}>{this.state.description}</Text>
                  </View>
                </View>
                <View style={styles.affichageContainer}>
                  <TouchableOpacity style={styles.btnGalerieProfil} onPress={()=>this.getPost()}>
                      <Text>Ma galerie</Text>
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCarnetProfil} onPress={()=>this.getCarnet()}>
                    <Text>Mes carnets</Text>
                  </TouchableOpacity>
                </View>
                <ListView dataSource={this.state.postDataSource}
              renderRow={this.renderRow}/>
              </ViewContainer>
              </ScrollView>  
          )
        }
        if (this.state.user && this.state.val === 'carnet'){
          return (
            <ScrollView>
              <ViewContainer>
                <StatusbarBackground/>
                <View style={styles.infoContainer}>
                  <View style={styles.pickContainer}>
                    <View style={styles.profilPicture}>
                      <View style={styles.profilPictureBorder}>
                        <Image source ={{uri:this.state.imageUri}} style={styles.couverturePicker}/>
                      </View>
                    </View>
                  </View>
                  <View style={styles.nameparaContainer}>
                    <Text style={styles.nameText}>{this.state.pseudo}</Text>
                    <View style={styles.paramContainerIcon}>
                      <Icons  name='settings' type='feather' size={22} color='#A9A9A9' onPress={()=>this.props.navigation.navigate('ParametersScreen')} />
                  </View>
                  </View>
                  <View style={styles.description}>
                    
                    <Text style={styles.descriptionText}>{this.state.description}</Text>
                  </View>
                </View>
                <View style={styles.affichageContainer}>
                  <TouchableOpacity style={styles.btnGalerieProfil} onPress={()=>this.getPost()}>
                      <Text>Ma galerie</Text>
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCarnetProfil} onPress={()=>this.getCarnet()}>
                    <Text>Mes carnets</Text>
                  </TouchableOpacity>
                </View>
                <ListView dataSource={this.state.carnetDataSource}
              renderRow={this.renderRow}/>
              </ViewContainer>
              </ScrollView>
            
          )
        }
        // Si l'utilisateur n'est pas connecté, il est renvoyé vers la page de connexion
        else {
          return <Loggin/>
        } 

}
}

