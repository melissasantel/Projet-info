import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';

export default class DetailsCarnet extends React.Component {
    render(){
        return (
            <Text> Pages du carnets sélectionnés</Text>
        )
    }
    /*constructor(props){
        super(props);
        let ds= new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = { 
            user : firebase.auth().currentUser,
            dataSource: ds,
        }
        this.Ref= this.getRef().child('Carnets');

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

    getCarnet(carnetsRef){
        carnetsRef.on('value',(snap) => {
            let carnets =[];
            snap.forEach((child) => {
                carnets.push({
                    title: child.val().titre,
                    photo: child.val().couverture,
                    descrip: child.val().description,
                    nbPages: child.val().nbPage,
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
                <Text style={styles.pagesCarnet}>Pages : {carnet.nbPages}</Text>
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
                    <ListView dataSource={this.state.carnetDataSource}
                    renderRow={this.renderRow} />
                    </ViewContainer>
            )
        
       
    }*/

}