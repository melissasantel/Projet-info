import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
import Icons from 'react-native-vector-icons/Feather';

//Affichage des pages du carnet sélectionné
export default class DetailsCarnet extends React.Component {
    constructor(props){
        super(props);
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = { 
            user:'',
            userId : '',
            CarnetId:'',
            dataSource: ds,
        }
        this.deleteFile=this.deleteFile.bind(this);
        this.renderRow=this.renderRow.bind(this);
        this.pressRow=this.pressRow.bind(this);
    }

    static navigationOptions ={
        headerTitle: 'Mes pages',
    };

    // réccupère les données avant le chargement de la page
    componentWillMount(){
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;    
        let useruid='';
        useruid = firebase.auth().currentUser.uid;
            console.log(useruid)
            this.setState({userId:useruid,CarnetId:keyCarnet});
            var pageRef = firebase.database().ref('users/'+useruid+'/user_carnet/'+ keyCarnet).child('pages');
            this.getPageCarnet(pageRef);            
      
    }

    //supression d'une page du carnet 
    deleteFile(keyPage){
        let ref = firebase.database().ref('users/'+this.state.userId+'/user_carnet/'+ this.state.CarnetId).child('pages/'+keyPage);
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
    //obtenir les carnets de la bdd pour les ranger dans une liste
    getPageCarnet(Ref){
        Ref.on('value',(snap) => {
            let pages =[];
            snap.forEach((child) => {
                pages.push({
                    titre: child.val().titre,
                    date: child.val().date,
                    _key: child.key
                });
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(pages)
              });
        });
        
    }
    //permet d'accéder à une page du carnet
    pressRow(page){
        const {navigate} = this.props.navigation;
        this.props.navigation.navigate('PageScreen',{keyCarnet: this.state.CarnetId,keyPage: page._key})
      }
      //affichage de la liste des carnets
    renderRow(page){
        return(
        <View style={styles.listCarnetContainer}>
            <View style={styles.infoCarnetContainer}>
                <TouchableOpacity onPress={() => {this.pressRow(page);}}>
                    <Text style={styles.postTitle}>{page.titre}</Text>
                </TouchableOpacity>
                <Text style={styles.CarnetDescrText}>{page.date}</Text>
                <Icons name='trash-2' type='feather' size={24} color='skyblue' onPress={() => this.deleteFile(page._key) }/>
            </View>
      </View>
        )
    }
   //affichage de la page 
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ViewContainer>
                <View style={styles.btnCreerContainer}>
                    <Icons name='file-plus'style={styles.iconCarnet} type='feather' size={24} color='skyblue' onPress={()=>this.props.navigation.navigate('EcrirePageScreen', {keyCarnet:this.state.CarnetId})} />
                </View>
                <ListView dataSource={this.state.dataSource}
                renderRow={this.renderRow} />
            </ViewContainer>
            )
        
       
    }

}