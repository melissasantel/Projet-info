//Définition d'une vue par default
import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

export default class ViewContainer extends Component {
    render() {
        return (
            <View style={styles.ViewContainer}>
                {this.props.children}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#fff',
      borderColor:'transparent',
    },
  });