import React, {Component} from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity,Image} from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import {firebaseRef} from '../../services/Firebase';
import { styles } from '../../styles/styles';

export default class Acceuil extends React.Component {
  constructor(){
    super(); 
    let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state={
      postDataSource:ds
      
    }
    this.postRef=this.getRef().child('post').orderByChild('visible').equalTo('true');

    this.renderRow=this.renderRow.bind(this);
  }

  static navigationOptions ={
    headerTitle : 'Travel App',

  };

  getRef(){
    return firebaseRef.database().ref();
  }

  componentWillMount(){
    this.getPost(this.postRef);
  }

  componentDidMount(){
    this.getPost(this.postRef);
  }

  getPost(postRef){
    postRef.on('value', (snap)=>{
      let post=[];
      snap.forEach((child) => {
        post.push({
          title: child.val().author,
          location:child.val().location,
          date : child.val().date,
          photo: child.val().image,
          descrip: child.val().description,
          userId: child.val().user,
          _key: child.key
        }); 
      });
      this.setState({
        postDataSource: this.state.postDataSource.cloneWithRows(post)
      });
    });
  }
  
  renderRow(post){
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.postContainer}>
        <View style={styles.titreDateContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfilScreen',{userId:post.userId})}>
            <Text style={styles.postTitle}>{post.title}</Text>
          </TouchableOpacity>
          <Text>{post.date}</Text>
        </View>
        <Text>{post.location}</Text>
        <View style={styles.postPhotoContainer}>
          <Image source={{uri :post.photo}} style={styles.photoPost}></Image>
        </View>
        <Text style={styles.postText}>{post.descrip}</Text>
      </View>
      
    )

  }

  render() {
    return (
      <ViewContainer>
        <ListView dataSource={this.state.postDataSource}
        renderRow={this.renderRow}/>
      </ViewContainer>
    );
  }
}
