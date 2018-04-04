import React, { Component } from 'react'
import {
   View,
   Switch,
   StyleSheet
} 
from 'react-native'

export default SwitchExample = (props) => {
   return (
      <View style = {styles.container}>
         <Switch
            onValueChange = {props.toggleSwitch1}
            value = {props.switch1Value}/>
         {/*<Switch
            onValueChange = {props.toggleSwitch2}
         value = {props.switch2Value}/>*/}
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      //marginTop: 1,
   }
})