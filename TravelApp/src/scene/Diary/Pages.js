import * as firebase from 'firebase';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ListView } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import StatusbarBackground from '../../components/StatusbarBackground';

export default class Pages extends React.Component {
    render(){
        return (
            <Text> Pages du carnets sélectionnés</Text>
        )
    }
}