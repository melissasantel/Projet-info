import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView, Alert } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
import Icons from 'react-native-vector-icons/Feather';


export default class MesCarnets extends React.Component {
    constructor(props){
        super(props);
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = { 
            user :null,
            carnetDataSource: ds,
        }
        this.carnetsRef= this.getRef().child('Carnets');
        this.deleteFile=this.deleteFile.bind(this);
        this.renderRow=this.renderRow.bind(this);
        this.pressRow=this.pressRow.bind(this);
    }

    static navigationOptions ={
        headerTitle: 'Carnets de voyage',
    };

    getRef(){
        return firebase.database().ref();
    }

    componentWillMount(){
        this.getCarnet(this.carnetsRef);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            this.setState({user});
        }), 
        this.getCarnet(this.carnetsRef)
    }
    deleteFile(keyCarnet){
        let ref = firebase.database().ref().child('Carnets/'+keyCarnet);
        Alert.alert(
            // This is Alert Dialog Title
            'Suppression du carnet',
            // This is Alert Dialog Message. 
            'Êtes-vous sûr de vouloir supprimer ce carnet ?',
            [
              //First Cancel Button in Alert Dialog.
              {text: 'Annuler', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
              //Second OK Button in Alert Dialog
              {text: 'OK', onPress: () => ref.remove()},  
            ]
          )
       
    }
    getCarnet(carnetsRef){
        carnetsRef.on('value',(snap) => {
            let carnets =[];
            snap.forEach((child) => {
                carnets.push({
                    title: child.val().titre,
                    photo: child.val().couverture,
                    descrip: child.val().description,
                    _key: child.key
                });
            });
            this.setState({
                carnetDataSource: this.state.carnetDataSource.cloneWithRows(carnets)
              });
        });
        
    }
    pressRow(carnet){
        console.log(carnet);
        this.props.navigation.navigate('DetailsCarnetScreen',{keyCarnet: carnet._key})
      }
    renderRow(carnet){
        return(
        <View style={styles.listCarnetContainer}>
            <View style={styles.carnetCouvContainer}>
                <Image source={{uri :carnet.photo}} style={styles.couvCarnet}></Image>
            </View>
            <View style={styles.infoCarnetContainer}>
                <TouchableOpacity onPress={() => {this.pressRow(carnet);}}>
                    <Text style={styles.postTitle}>{carnet.title}</Text>
                </TouchableOpacity>
                <Text style={styles.CarnetDescrText}>{carnet.descrip}</Text>
                <Icons name='trash-2' type='feather' size={22} color='#A9A9A9' onPress={() => this.deleteFile(carnet._key) } />
                <Icons name='file-plus' type='feather' size={22} color='#A9A9A9' onPress={()=>this.props.navigation.navigate('EcrirePageScreen', {keyCarnet:carnet._key})} />
            </View>
      </View>
        )
    }
   
    render() {
        if (this.state.user){

            const {navigate} = this.props.navigation;
            return (
                <ViewContainer>
                    <View style={styles.btnCreerContainer}>
                        <Text style={styles.btnCreer}>Créer un carnet </Text>
                        <Icons name='plus-circle' type='feather' size={22} color='#A9A9A9' onPress={()=>this.props.navigation.navigate('CreerCarnetScreen')} />
                   </View>
                    <ListView dataSource={this.state.carnetDataSource}
                    renderRow={this.renderRow} />
                    </ViewContainer>
            )
        }
        else {
            return (
            <ViewContainer>
                <StatusbarBackground/>
                <View style={styles.informationContainer}>
                <Image style={styles.logoImage} source={require('../../image/journal2.png')}/>
                <Text 
                style={styles.informationMessage}>Vous devez vous connecter pour accéder à vos carnet de voyages !
                </Text>
                </View>
             </ViewContainer>
            )
        }
       
    }
}