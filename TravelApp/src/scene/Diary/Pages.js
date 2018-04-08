import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';

export default class Pages extends React.Component {
    constructor() {
        super();
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;
        var titrePage = params ? params.titre :null;
        this.state = {
            titre: '',
            texte: '',
            weather : '',
            location : '',
            date: '',
            image: '',
        };
        
    }
    static navigationOptions ={
      header: null 

    };

    componentDidMount() {
        var { params } = this.props.navigation.state; 
        var keyPage = params ? params.keyPage : null;
        this.renderUserData(keyPage)
    }
    
    renderUserData(key){ 
        firebase.database().ref('Carnets/' + key+'/titre').on("value", snapshot => {
          this.setState({titre: snapshot.val()})});
        firebase.database().ref('Carnets/' + key+'/texte').on("value", snapshot => {
          this.setState({texte: snapshot.val()})});
        firebase.database().ref('Carnets/' + key+'/weather').on("value", snapshot => {
          this.setState({weather: snapshot.val()})});
        firebase.database().ref('Carnets/' + key+'/location').on("value", snapshot => {
        this.setState({location: snapshot.val()})});
        firebase.database().ref('Carnets/' + key+'/date').on("value", snapshot => {
        this.setState({date: snapshot.val()})});
        firebase.database().ref('Carnets/' + key+'/image').on("value", snapshot => {
        this.setState({image: snapshot.val()})});
      }

    render(){
        // pour weather voir comment faire navigation
        return (
            <ViewContainer>
            <StatusbarBackground/>
            <Text>Titre :  </Text>
            <Text>{this.state.titre}</Text>
            <Text>Date : {this.state.date}</Text>    
            <Text>Weather : {this.state.weather} </Text>  
            <Icons name='sun' type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'sun'})} />
            <Icons name='cloud' type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'cloud'})} />
            <Icons name='cloud-rain' type='feather' size={22} color='#66CDAA' onPress={() =>this.setState({weather : 'rain'})} />
            <Icons name='cloud-snow' type='feather' size={22} color='#66CDAA' onPress={() => this.setState({weather : 'snow'})} />
            <Text>Location: </Text> 
            <Text>{this.state.location}</Text>
            <Text>{this.state.texte}</Text>
            </ViewContainer>
        )
    }
}