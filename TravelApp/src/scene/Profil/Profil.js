import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button,ScrollView, TouchableOpacity, ListView } from 'react-native';
import Loggin from '../Authentification/Authentification';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';
import Icons from 'react-native-vector-icons/Feather';

//TODO afficher les photos et les carnets en ligne comme sur instagram 
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
            postDataSource:'',
            dsref:ds,
        };
        this.renderRow=this.renderRow.bind(this);
    }

    static navigationOptions ={
      header: null
    };
    
  getPostOrCarnet(){
    if (this.state.val === 'post'){
      this.setState({val:'carnet'})
    }
    else
    this.setState({val:'post'})
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
            this.setState({userIdentifiant:userId, userMail:userEmail})
            this.renderUserData(user);
            if (this.state.val==='post'){
            var postRef = firebase.database().ref('users/'+userId).child('user_post');
            this.getPost(postRef);
            }
            /*if (this.state.val==='carnet'){
              var carnetRef = firebase.database().ref('users/'+userId).child('user_carnet');
              this.getPost(carnetRef);
            }*/
        } 
   })  
  }

  componentWillMount(){
    var userId='';
    var userEmail='';
    firebase.auth().onAuthStateChanged((user)=>{
        this.setState({user})
        if(user){
            userId = firebase.auth().currentUser.uid;
            userEmail = firebase.auth().currentUser.email
            this.setState({userIdentifiant:userId, userMail:userEmail})
            this.renderUserData(user);
            if (this.state.val==='post'){
            var postRef = firebase.database().ref('users/'+userId).child('user_post');
            this.getPost(postRef);
            }
            if (this.state.val==='carnet'){
              var carnetRef = firebase.database().ref('users/'+userId).child('user_carnet');
              this.getPost(carnetRef);
            }
        } 
   })  
  }

  getPost(Ref){
    if (this.state.val==='post'){
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
        postDataSource: this.state.dsref.cloneWithRows(post)
      });
    });
    }
    else{
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
            postDataSource: this.state.dsref.cloneWithRows(carnets)
          });
    }); 
    }
  }
  
  pressRow(post){
    console.log(post);
  }
  renderRow(data){
    if (this.state.val==='post'){
      return(
        <View style={styles.postContainer}>
          <TouchableOpacity onPress={() => {this.pressRow(data);}}>
            <Text style={styles.postTitle}>{data.author}</Text>
          </TouchableOpacity>
            <Text style={styles.postText}>{data.location}</Text>
            <Text style={styles.postText}>{data.date}</Text>
          
          <View style={styles.postPhotoContainer}>
          {/*/<Image source={{uri :data.image}} style={styles.photoPost}></Image>*/}
          </View>
          <Text style={styles.postText}>{data.descrip}</Text>
        </View>
      ) 
    }
    else{
      return(
        <View style={styles.listCarnetContainer}>
            <View style={styles.carnetCouvContainer}>
                <Image source={{uri :data.photo}} style={styles.couvCarnet}></Image>
            </View>
            <View style={styles.infoCarnetContainer}>
                <TouchableOpacity onPress={() => {this.pressRowCarnet(data);}}>
                    <Text style={styles.postTitle}>{data.title}</Text>
                </TouchableOpacity>
                <Text style={styles.CarnetDescrText}>{data.descrip}</Text>
                <Icons name='trash-2' type='feather' size={22} color='#A9A9A9' onPress={() => this.deleteFile(data._key) } />
            </View>
      </View>
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
  
    if (this.state.user){
          const {navigate} = this.props.navigation;
          return (
              <ViewContainer>
                <StatusbarBackground/>
                <View style={styles.infoContainer}>
                  <View style={styles.ButtonParametersCont}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ParametersScreen')}>
                      <Text style={styles.buttonParam}>Paramètres</Text>
                    </TouchableOpacity>
                    <Image source={require('../../image/settings-gears.png')}/>
                  </View>
                  <View style={styles.profilPicture}>
                    <View style={styles.profilPictureBorder}>
                      <Image source ={{uri:this.state.imageUri}} style={styles.couverturePicker}/>
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.nameText}>{this.state.pseudo}</Text>
                    <Text style={styles.descriptionText}>{this.state.description}</Text>
                  </View>
                </View>
                <View style={styles.affichageContainer}>
                  <TouchableOpacity style={styles.btnGalerieProfil} onPress={()=>this.getPostOrCarnet()}>
                      <Text>Galerie</Text>
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCarnetProfil} onPress={()=>this.getPostOrCarnet()}>
                    <Text>Carnets</Text>
                  </TouchableOpacity>
                </View>
                <ListView dataSource={this.state.postDataSource}
              renderRow={this.renderRow}/>
              </ViewContainer>
            
          )
        }
        // Si l'utilisateur n'est pas connecté, il est renvoyé vers la page de connexion
        else {
          return <Loggin/>
        } 

}
}

