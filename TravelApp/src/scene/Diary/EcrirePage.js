import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import Icons from 'react-native-vector-icons/Feather';


export default class EcrirePage extends React.Component {
    constructor(props){
        var today = new Date();
        super(props);
        
        this.state = {
          titre:'',
          texte:'',
          weather:'',
          location:'',
          image:'',
          date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(), 
        }
        this._addPage=this._addPage.bind(this)
      } 
      static navigationOption ={
        headerTitle:'Nouvelle page',
      };

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

    render() {
        const {navigate} = this.props.navigation;
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;
        var titreCarnet = params ? params.titre : null;
          return (
              <ViewContainer>
                  <StatusbarBackground/>
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
                    maxLength = {40}
                    multiline = {true}
                    numberOfLines = {20}
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    style={styles.input}
                    onChangeText={(text) => this.setState({texte: text})}
                    value={this.state.texte}
       />           
                  <TouchableOpacity onPress={()=>this._addPage(this.state.titre,this.state.texte,this.state.weather,this.state.location,this.state.image, this.state.date)}>
                      Enregistrer ma page
                  </TouchableOpacity>
                  </ViewContainer>

          )
    }
}