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
            nameWeather:'',
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
        
        if(weather === sun){
            this.setState(nameWeather:'sun')
        }
        if(weather === cloud){
            this.setState(nameWeather:'cloud')
        }
        if(weather === rain){
            this.setState(nameWeather:'cloud-rain')
        }
        else {
            this.setState(nameWeather:'cloud-snow')
        }
      }
     

    render(){
        // pour weather voir comment faire navigation
        return (
            <ViewContainer>
            <StatusbarBackground/>
            <View style={styles.imagePageContainer}>
                <Image source={{uri :this.state.image}} style={styles.imagePage} />}
            </View>
            <View style={styles.pickContainer}>
                <Text style={styles.labelPost}>Titre :  </Text>
                <Text style={styles.labelPost}>{this.state.titre}</Text>
            </View>
            <Text style={styles.labelPost}>Date : {this.state.date}</Text>
            <View style={styles.pickContainer}> 
                <Text style={styles.labelPost}>Weather : {this.state.weather} </Text>  
                <Icons name={this.state.nameWeather} type='feather' size={22} color='#66CDAA'/>
            </View>
            <View style={styles.pickContainer}>
                <Text style={styles.labelPost}>Location: </Text> 
                <Text style={styles.labelPost}>{this.state.location}</Text>
            </View>
            <Text>{this.state.texte}</Text>
            </ViewContainer>
        )
    }
}