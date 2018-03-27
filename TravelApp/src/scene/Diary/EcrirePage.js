import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import CreerNouveau from './CreerCarnet';


export default class EcrirePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          page:'', 
      }
        
      } 
      static navigationOption ={
        header:null,
      };
//TODO  Utilisateur peut écrire sur sont carnet, se géolocaliser... 
    render() {
       
          return (
              <ViewContainer>
                  <StatusbarBackground/>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreerNouveau')}>
                      <Text>Creer un carnet</Text>
                  </TouchableOpacity>

                  <Text>Page : </Text>
            <TextInput 
                    placeholder="Ecriver votre première page"
                    placeholderTextColor='#66CDAA'
                    onChangeText={(text)=>this.setState({page: text})}
                    value={this.state.page}
                    returnKeyType="next"
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) =>this.pageInput = input}
            />
                  <Text>Page</Text>
                  </ViewContainer>

          )
    }
}