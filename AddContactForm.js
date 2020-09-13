import React from 'react';
import {StatusBar} from 'expo-status-bar';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Constants from 'expo-constants';

export default class AddContactForm extends React.Component {
    state = {
        name : '',
        phone : '',
        isFormValid : false,
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.name !== prevState.name || this.state.phone !== prevState.phone)
        this.validateForm()
    }

    handelNameChange = name => {
        this.setState({name})
    }

    handelPhoneChange = (phone )=> {
        if(+phone >= 0 && phone.length<=11) {
        this.setState({phone:phone})
        }
    }

    handleSubmit =()=>{
        if(+this.state.phone >=0 && this.state.phone.length === 11 && this.state.name.length >= 3) {
        this.props.onSubmit({name:this.state.name, phone:this.state.phone})
        }
    }

    validateForm =()=> {
        if(+this.state.phone >=0 && this.state.phone.length>=11 && this.state.name.length >= 3) {
            return (this.setState({
                isFormValid:true
            }))
        } else {
            return (this.setState({
                isFormValid:false
            }))
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style ={styles.container} >
                <TextInput onChangeText={this.handelNameChange} style={styles.input} value ={this.state.name} placeholder = "Name" />
                <TextInput onChangeText={this.handelPhoneChange} style={styles.input} value = {this.state.phone} placeholder = "Phone" keyboardType = "numeric" />
                <View style={styles.btn} >
                    <Button  title ='Submit' onPress = {this.handleSubmit} disabled = {!this.state.isFormValid}/>
                </View>
                
                <StatusBar/>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        paddingTop : Constants.statusBarHeight,
        justifyContent : 'center'
    },
    input : {
        padding : 5,
        borderColor : 'black',
        borderWidth : 1,
        marginTop : 20,
        marginEnd : 20,
        marginStart : 20, 
        borderRadius : 3
    },
    btn : {
        margin : 20
    }
})