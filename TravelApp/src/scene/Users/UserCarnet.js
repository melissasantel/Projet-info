import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';
// Affichage du carnet de l'utilisateur 
export default class UserCarnet extends React.Component {
    constructor(props){
        super(props);
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = { 
            user:'',
            userId : '',
            CarnetId:'',
            dataSource: ds,
        }
        this.renderRow=this.renderRow.bind(this);
        this.pressRow=this.pressRow.bind(this);
    }

    static navigationOptions ={
        headerTitle: 'Mes pages de carnet',
    };

    componentWillMount(){
        var { params } = this.props.navigation.state; 
        var keyCarnet = params ? params.keyCarnet : null;    
        let useruid = params ? params.userId : null;
        this.setState({userId:useruid,CarnetId:keyCarnet});
        var pageRef = firebase.database().ref('users/'+useruid+'/user_carnet/'+ keyCarnet).child('pages');
        this.getPageCarnet(pageRef);
               
      
    }

// obtenir les données du carnets dans un tableau 
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
        const {navigate} = this.props.navigation;
        this.props.navigation.navigate('UserPageScreen',{keyCarnet: this.state.CarnetId,keyPage: page._key, userId : this.state.userId})
      }
      //affichage tableau 
    renderRow(page){
        return(
        <View style={styles.listCarnetContainer}>
            <View style={styles.infoCarnetContainer}>
                <TouchableOpacity onPress={() => {this.pressRow(page);}}>
                    <Text style={styles.postTitle}>{page.titre}</Text>
                </TouchableOpacity>
                <Text style={styles.CarnetDescrText}>{page.date}</Text>
            </View>
      </View>
        )
    }
   //affichage page
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ViewContainer>
                <ListView dataSource={this.state.dataSource}
                renderRow={this.renderRow} />
            </ViewContainer>
            )
        
       
    }

}