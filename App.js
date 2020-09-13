import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button , FlatList, SectionList} from 'react-native';
import Constants from 'expo-constants'

import contacts, {compareNames} from './contacts'
import ContactList from './ContactList'
import AddContactForm from './AddContactForm';

export default class App extends React.Component {
  state = {
    showForm : false,
    showContacts : true,
    contacts : contacts,
  }

  onToggle = ()=>{
    this.setState(prevState=>({
      showContacts : !prevState.showContacts,
    }))
  }

  sort = ()=> {
    this.setState(prevState=>({
      contacts : prevState.contacts.sort(compareNames)
    }))
  }

  showAddForm = ()=>{
    this.setState({
      showForm : true,
    })
  }

  addContact =(newContact)=> {
    this.setState(prevState=>({
      showForm : false,
      contacts : [...prevState.contacts, newContact]
    })
    )
  }
  
  // shorthand
  //renderItem = ({item})=> <Row {...item} /> 
  //same to the above func
  // renderItem = obj => <Row name = {obj.item.name} phone = {obj.item.phone } />
  // renderSectionHeader = obj => <Text>{obj.section.title}</Text>
  
  render () {
    if(this.state.showForm) return <AddContactForm onSubmit={this.addContact}/>

    return (
      <View style={styles.container}>
        <Button title ='toggle contacts' onPress={this.onToggle}/>
        <Button title='Add Contact' onPress ={this.showAddForm} />
        { this.state.showContacts && (
        <ContactList contacts={this.state.contacts} />
        )}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
