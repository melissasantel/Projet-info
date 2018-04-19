import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Button,ScrollView, TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { styles } from '../../styles/styles';
import Icons from 'react-native-vector-icons/Feather';
// affichage profil des autres utilisateur 
export default class UserProfil extends Component {
    constructor() {
        super(); 
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            parametre: false,
            val : 'post',
            idCurrentuser:'',
            userId:'',
            pseudo : '',
            imageUri : '',
            description:'',
            userMail:'',
            postDataSource:ds, 
            carnetDataSource:ds,
        };
        this.renderRow=this.renderRow.bind(this);
        this.pressRow=this.pressRow.bind(this);
    }
 
    
  getPost(){
    this.setState({val:'post'})
  }
  
  getCarnet(){
    this.setState({val:'carnet'})
    var carnetRef = firebase.database().ref('users/'+this.state.userId).child('user_carnet');
    this.CarnetRef(carnetRef);
  }

   componentWillMount() {
    let { params } = this.props.navigation.state; 
    let userId = params ? params.userId : null;
    let idCurrentuser = ''
    idCurrentuser = firebase.auth().currentUser.uid;
    this.setState({userId:userId, idCurrentuser:idCurrentuser});
    this.renderUserData(userId);
    if (this.state.val==='post'){
      var postRef = firebase.database().ref('users/'+userId).child('user_post');
      this.PostRef(postRef);
    }  
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
          _iduser : child.val().user,
          _key: child.key
        }); 
      });
      this.setState({
        postDataSource: this.state.postDataSource.cloneWithRows(post)
      });
    });
  }
  
  pressRow(data){
    const {navigate} = this.props.navigation;
    if (this.state.val === 'post'){
      this.props.navigation.navigate('UserProfil', {userId:data._iduser})
    }
    else {
      this.props.navigation.navigate('UserCarnetScreen',{keyCarnet: data._key, userId : this.state.userId})
    }
  }
  renderRow(data){
    if (this.state.val==='post'){
      return(
        <View style={styles.postContainer}>
          <View style={styles.titreDateContainer}>
            <TouchableOpacity onPress={() => {this.pressRow(data);}}>
              <Text style={styles.postTitle}>{data.author}</Text>
            </TouchableOpacity>
            <Text style={styles.postText}>{data.date}</Text>
          </View>
          <Text style={styles.postText}>{data.location}</Text>
          <View style={styles.postPhotoContainer}>
            <Image source={{uri :data.image}} style={styles.photoPost}></Image>
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
                <TouchableOpacity onPress={() => {this.pressRow(data);}}>
                    <Text style={styles.postTitle}>{data.title}</Text>
                </TouchableOpacity>
                <Text style={styles.CarnetDescrText}>{data.descrip}</Text>
            </View>
      </View>
        )
    }
  }
  

  renderUserData(userId){ 
    firebase.database().ref('users/' + userId +'/pseudonyme').on("value", snapshot => {
      this.setState({pseudo: snapshot.val()})});
    firebase.database().ref('users/' + userId +'/profil_picture').on("value", snapshot => {
      this.setState({imageUri: snapshot.val()})});
    firebase.database().ref('users/' + userId +'/description').on("value", snapshot => {
      this.setState({description: snapshot.val()})});
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.userId !== this.state.idCurrentuser )
    {
      if (this.state.val === 'post'){
        return (
          <ScrollView>
            <ViewContainer>
              <View style={styles.infoContainer}>
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
                <TouchableOpacity style={styles.btnGalerieProfil} onPress={()=>this.getPost()}>
                    <Text>Galerie</Text>
                  </TouchableOpacity>
                <TouchableOpacity style={styles.btnCarnetProfil} onPress={()=>this.getCarnet()}>
                  <Text>Carnets</Text>
                </TouchableOpacity>
              </View>
              <ListView dataSource={this.state.postDataSource}
            renderRow={this.renderRow}/>
            </ViewContainer>
            </ScrollView>
          
        )
      }
      else {
        return (
          <ScrollView>
            <ViewContainer>
              <View style={styles.infoContainer}>
                <View style={styles.ButtonParametersCont}>
                  <Icons  name='settings' type='feather' size={22} color='#A9A9A9' onPress={()=>this.props.navigation.navigate('ParametersScreen')} />
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
                <TouchableOpacity style={styles.btnGalerieProfil} onPress={()=>this.getPost()}>
                    <Text>Galerie</Text>
                  </TouchableOpacity>
                <TouchableOpacity style={styles.btnCarnetProfil} onPress={()=>this.getCarnet()}>
                  <Text>Carnets</Text>
                </TouchableOpacity>
              </View>
              <ListView dataSource={this.state.carnetDataSource}
            renderRow={this.renderRow}/>
            </ViewContainer>
            </ScrollView>
          
        )
      }
    }
    else {
      return (
        this.props.navigation.navigate('ProfilScreen')
      )
     
    }
         
  }
}

