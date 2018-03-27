//Permet d'insérer la barre de status dans une vue
import React, {Component} from 'react';
import {StyleSheet, View, Text } from 'react-native';


export default class StatusbarBackGround extends Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
