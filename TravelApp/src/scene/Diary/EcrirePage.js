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
          texte:'',
          weather:'',
          location:'',
          image:'',
          date:today.getDate().toString()+'/'+parseInt(today.getMonth()+1).toString()+'/'+today.getFullYear(), 
      }
        
      } 
      static navigationOption ={
        header:'Nouvelle page',
      };

    render() {
       
          return (
              <ViewContainer>
                  <StatusbarBackground/>
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
                    ref={(input) =>this.textInput = input}
       />           
                  
                  </ViewContainer>

          )
    }
}