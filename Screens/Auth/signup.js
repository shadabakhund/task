import React, { Component } from 'react'
import { TextInput, View, Button, Text, StyleSheet } from 'react-native';
import  * as firebase from 'firebase'

export class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <View>
                <TextInput
                    style={styles.txtinput}
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    style={styles.txtinput}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style={styles.txtinput}
                    placeholder="password"
                    secureTextEntry
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    txtinput:{
        fontSize:18,
        marginTop: 20,
        marginLeft: 12,
    }
})
export default signup