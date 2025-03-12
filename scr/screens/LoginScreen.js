import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            {/* ช่องกรอก Email */}
            <View style={styles.inputContainer}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* ช่องกรอก Password */}
            <View style={styles.inputContainer}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: "#333",
    },
});

export default LoginScreen;
