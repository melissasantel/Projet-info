import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
import Icons from 'react-native-vector-icons/Feather';

export default class Pages extends React.Component {
    constructor() {
        super();     
        this.state = {
            titre: '',
            texte: '',
            weather : '',
            location : '',
            date: '',
            image: '',
            nameWeather:'',
        };
        
    }
    static navigationOptions = {
            headerTitle:null,
        
    };

    componentWillMount() {
        var { params } = this.props.navigation.state; 
        var keyPage = params ? params.keyPage : null;
        var keyCarnet = params ? params.keyCarnet :null;
        let userId=''; 
        userId=firebase.auth().currentUser.uid;
        console.log(userId)
        console.log(keyCarnet)
        console.log(keyPage)
        this.renderUserData(keyCarnet,keyPage, userId)
    }
    
    renderUserData(keyCarnet,keyPage, id){ 
        let weather='';
        firebase.database().ref('users/'+id+'/user_carnet/'+ keyCarnet+'/pages/'+keyPage+'/titre').on("value", snapshot => {
          this.setState({titre: snapshot.val()})});
        firebase.database().ref('users/'+id+'/user_carnet/'+ keyCarnet+'/pages/'+keyPage+'/texte').on("value", snapshot => {
          this.setState({texte: snapshot.val()})});
        firebase.database().ref('users/'+id+'/user_carnet/'+ keyCarnet+'/pages/'+keyPage+'/weather').on("value", snapshot => {
          weather = snapshot.val()});
        firebase.database().ref('users/'+id+'/user_carnet/'+ keyCarnet+'/pages/'+keyPage+'/location').on("value", snapshot => {
        this.setState({location: snapshot.val()})});
        firebase.database().ref('users/'+id+'/user_carnet/'+ keyCarnet+'/pages/'+keyPage+'/date').on("value", snapshot => {
        this.setState({date: snapshot.val()})});
        firebase.database().ref('users/'+id+'/user_carnet/'+ keyCarnet+'/pages/'+keyPage+'/image').on("value", snapshot => {
        this.setState({image: snapshot.val()})});
        
        if(weather==='sun'){
            this.setState({nameWeather:'sun'})
        }
        if(weather === 'cloud'){
            this.setState({nameWeather:'cloud'})
        }
        if(weather === 'rain'){
            this.setState({nameWeather:'cloud-rain'})
        }
        if(weather === 'snow') {
            this.setState({nameWeather:'cloud-snow'})
        }
      }
     

    render(){
        // pour weather voir comment faire navigation
        return (
            <ScrollView>
            <ViewContainer>
            <View style={styles.postContainer}>
                <View style={styles.imagePageContainer}>
                    <Image source={{uri :this.state.image}} style={styles.imagePage} />}
                </View>
                <Text style={styles.labelPost}>Titre : {this.state.titre}  </Text> 
                <Text style={styles.labelPost}>Date : {this.state.date}</Text>
                <View style={styles.pickContainer}> 
                    <Text style={styles.labelPost}>Weather : </Text>  
                    <Icons name={this.state.nameWeather} type='feather' size={22} color='#66CDAA'/>
                </View>
                    <Text style={styles.labelPost}>Location: {this.state.location} </Text> 
                <Text>{this.state.texte}</Text>
            </View>
            </ViewContainer>
            </ScrollView>
        )
    }
}