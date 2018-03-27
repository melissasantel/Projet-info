import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';

export default class Acceuil extends React.Component {
  render() {
    return (
      <ViewContainer>
        <StatusbarBackground/>
        <Text>Ici on peut voir les utilisateurs de l'application</Text>
      </ViewContainer>
    );
  }
}