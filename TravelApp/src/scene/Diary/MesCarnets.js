import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView, Alert } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
import Icons from 'react-native-vector-icons/Feather';

//Affichage des carnets de l'utilisateur
export default class MesCarnets extends React.Component {
    constructor(props){
        super(props);
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = { 
            user :'',
            userIdentifiant:'',
            carnetDataSource: ds,
        }
        this.deleteFile=this.deleteFile.bind(this);
        this.renderRow=this.renderRow.bind(this);
        this.pressRow=this.pressRow.bind(this);
    }

    static navigationOptions ={
        headerTitle: 'Carnets de voyage',
    };

// Récupération des données avant le chargement de la page
    componentWillMount(){ 
        var userId='';
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                userId = firebase.auth().currentUser.uid;
                this.setState({userIdentifiant:userId})
                var carnetRef = firebase.database().ref('users/'+userId).child('user_carnet');
                this.getCarnet(carnetRef);
            }
        })
    }

    componentDidMount() {
        var userId='';
        firebase.auth().onAuthStateChanged((user)=>{
            this.setState({user})
            if(user){
                userId = firebase.auth().currentUser.uid;
                this.setState({userIdentifiant:userId})
                var carnetRef = firebase.database().ref('users/'+userId).child('user_carnet');
                this.getCarnet(carnetRef);
            }
        })
        
    }
    //permet de supprimer un carnet de la bdd
    deleteFile(keyCarnet){
        let ref = firebase.database().ref('users/'+this.state.userIdentifiant).child('/user_carnet/'+keyCarnet);
        Alert.alert(
            // This is Alert Dialog Title
            'Suppression du carnet',
            // This is Alert Dialog Message. 
            'Êtes-vous sûr de vouloir supprimer ce carnet ?',
            [
              //First Cancel Button in Alert Dialog.
              {text: 'Annuler', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
              //Second OK Button in Alert Dialog
              {text: 'OK', onPress: () => {ref.remove()}},  
            ]
          )
       
    }
    // récupération de tout les carnets de l'utilisateur et rangement dans une liste
    getCarnet(carnetsRef){
        carnetsRef.on('value',(snap) => {
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
    //permet d'accéder aux détails d'un carnet, cad l'ensemble de ses pages
    pressRow(carnet){
        this.props.navigation.navigate('DetailsCarnetScreen',{keyCarnet: carnet._key})
      }
      //affichage de la liste de carnet
    renderRow(carnet){
        return(
        <View style={styles.listCarnetContainer}>
            <View style={styles.imageLegendeCont}>
                <Image source={{uri :carnet.photo}} style={styles.couvCarnet}></Image>
                <View style={styles.infoCarnetContainer}>
                    <TouchableOpacity onPress={() => {this.pressRow(carnet);}}>
                        <Text style={styles.postTitle}>{carnet.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.CarnetDescrText}>{carnet.descrip}</Text>
                    <View style={styles.PickContainer}>
                        <Icons name='file-plus'style={styles.iconCarnet} type='feather' size={24} color='skyblue' onPress={()=>this.props.navigation.navigate('EcrirePageScreen', {keyCarnet:carnet._key})} />
                        <Icons name='trash-2' style={styles.iconCarnet} type='feather' size={24} color='skyblue' onPress={() => this.deleteFile(carnet._key) } /> 
                    </View>
                </View>
            </View>
      </View>
        )
    }
   //affichage de la page
    render() {
        if (this.state.user){

            const {navigate} = this.props.navigation;
            return (
                <ViewContainer>
                    <View style={styles.btnCreerContainer}>
                        <Text style={styles.btnTextPost}>NOUVEAU CARNET   </Text>
                        <Icons name='plus-circle' type='feather' size={24} color='skyblue' onPress={()=>this.props.navigation.navigate('CreerCarnetScreen')} />
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