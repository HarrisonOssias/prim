import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const usrName = data.usrName;
const passwrd = data.paswd;


export default class Loginform extends Component {

    constructor(props){
        super(props);
        this.state = {
            usr: "1",
            pass:"fata"
        };
     }
    render(){
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder="username or email" 
                    style={styles.input}
                    onChangeText={(name)=>this.setState({usr: name }) }
                />
                <TextInput 
                    placeholder="password" 
                    style={styles.input} 
                    onChangeText={(code)=>this.setState({pass: code }) }
                />
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => {
                        navigate('Home') 
                    }
                    }
                >  
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            
        ); 
        
    }       
}

const styles = StyleSheet.create({
    
});