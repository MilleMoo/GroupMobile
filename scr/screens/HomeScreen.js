import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MyButton from "./MyButton";
import Entypo from '@expo/vector-icons/Entypo';

const HomeScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={["#1E90FF", "#00BFFF"]} style={styles.container}>
            <Text style={styles.welcomeText}>Welcome</Text>
            
            <Entypo name="book" size={200} color="black" />

            <Text style={styles.companyName}>Your Company</Text>
            <Text style={styles.tagline}>your tagline here</Text>

         
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

       
            <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate("Register")}>
                <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign up</Text>
            </TouchableOpacity>

  
            <Text style={styles.socialText}>Sign in with Social Media</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    companyName: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
    },
    tagline: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 30,
    },
    button: {
        width: "80%",
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E90FF",
    },
    signUpButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#fff",
    },
    signUpButtonText: {
        color: "#fff",
    },
    socialText: {
        marginTop: 20,
        fontSize: 14,
        color: "#fff",
    },
});

export default HomeScreen;
