import React from 'react';
import { StyleSheet, Text, View, Image, Animated, KeyboardAvoidingView, TextInput} from 'react-native';
import {Button, Header, Badge} from 'react-native-elements';
//import LoginForm from './Loginform';


export default function App() {
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <TextInput placeholder="Friend" style={styles.FFinder}/>
          <TextInput placeholder="Amount" style={styles.FFinder}/>
    
          <View style={styles.leafContainer}>
            <Image
              style={{width: 125, height: 105}}
              source={require('./img/Leaf.png')}
            />
          </View>
          <Button style={styles.reward}
          title="Reward Friend"
          type = "solid"
          onPress={() => console.log("2")}
          />
          <Text style={styles.LeafCount} h2>Leaf Pile : 42</Text>

          <Text style={styles.location} h3>Latitude:43.255722</Text>
          <Text style={styles.location} h3>Longitude:-79.87110</Text>
          <Text style={styles.points} h4>You earned 3 points today!</Text>
        
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01a3a4',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
  },
  leafContainer: {
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right:0 ,
    paddingTop: 30,
  },
  image:{
    alignItems: 'center',
    width: 100,
    height: 200,
  },
  LeafCount: {
    fontStyle: 'italic',
    color: '#5f27cd',
    fontSize: 40,
    position: 'absolute',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
  },
  reward: {
    height: 200,
    width: 280,
    left: 50,
    right: 50,
    top: 70,
    borderRadius:10,
  },
  FFinder: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 80,
    top: 50,
    bottom: 0,
    left: 50,
    borderRadius: 10,
    right: 50,
    width: 280,
  },
  location: {
    fontStyle: 'italic',
    color: '#5f27cd',
    fontSize: 27,
    left: 60,
    bottom: 80,
  },
  points: {
    fontStyle: 'italic',
    color: '#5f27cd',
    fontSize: 20,
    left: 60,
    bottom: 50,
  }
 
});
