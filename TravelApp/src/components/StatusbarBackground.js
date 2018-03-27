//Gestion de la barre de status du téléphonne
import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';


export default class StatusbarBackground extends Component {
  render() {
    return (
      <View style={styles.statusbarBackground}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusbarBackground : {
    height : 20,
  }
})