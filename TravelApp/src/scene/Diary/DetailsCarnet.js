import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
import Icons from 'react-native-vector-icons/Feather';

export default class DetailsCarnet extends React.Component {
    constructor(props){
        super(props);
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = { 
            user : firebase.auth().currentUser,
            dataSource: ds,
        }
        this.Ref= this.getRef().child('Carnets/'+keyCarnet+'/pages/');
        this.deleteFile=this.deleteFile.bind(this);
        this.renderRow=this.renderRow.bind(this);
        this.pressRow=this.pressRow.bind(this);
    }

    static navigationOptions ={
        headerTitle: 'Détails du carnet',
    };

    getRef(){
        return firebase.database().ref();
    }

    componentWillMount(){
        this.getPageCarnet(this.Ref);
    }

    componentDidMount() {
        user : firebase.auth().currentUser,
        this.getPageCarnet(this.Ref)
    }

    deleteFile(keyPage){
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
    pressRow(page){
        console.log(page);
        this.props.navigation.navigate('PageScreen',{keyPage: page._key, titre:page.titre})
      }
    renderRow(page){
        return(
        <View style={styles.listCarnetContainer}>
            <View style={styles.infoCarnetContainer}>
                <TouchableOpacity onPress={() => {this.pressRow(page);}}>
                    <Text style={styles.postTitle}>{page.titre}</Text>
                </TouchableOpacity>
                <Text style={styles.CarnetDescrText}>{page.date}</Text>
                <Icons name='trash-2' type='feather' size={22} color='#A9A9A9' onPress={() => this.deleteFile(page._key) }/>
            </View>
      </View>
        )
    }
   
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ViewContainer>
                <View style={styles.btnCreerContainer}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreerCarnetScreen')}>
                        <Text style={styles.btnCreer}>Créer </Text>
                    </TouchableOpacity>
                    <Image style={styles.logoAjoutCarnet}
                        source={require('../../image/plus-button.png')}/>
                   </View>
                    <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
                    </ViewContainer>
            )
        
       
    }

}