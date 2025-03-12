import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Switch, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [name, setName] = useState("Red Hulk");
    const [username, setUsername] = useState("@General_Ross");
    const [profileImage, setProfileImage] = useState("https://cdn.marvel.com/content/1x/349red_com_crd_01.png");

    const toggleSwitch = () => setIsDarkMode(!isDarkMode);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "We need access to your photos to upload an image.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            {/* Toggle Switch */}
            <View style={styles.header}>
                <Switch value={isDarkMode} onValueChange={toggleSwitch} />
            </View>

            {/* Profile Picture */}
            <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <Text style={styles.editText}>Edit Photo</Text>
            </TouchableOpacity>

            {/* Editable Name & Username */}
            <View style={[styles.profileCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <TextInput
                    style={[styles.input, isDarkMode ? styles.darkText : styles.lightText]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                    placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
                />
                <TextInput
                    style={[styles.input, isDarkMode ? styles.darkText : styles.lightText]}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
    },
    lightContainer: {
        backgroundColor: "#ffffff",
    },
    darkContainer: {
        backgroundColor: "#121212",
    },
    header: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#ccc",
    },
    editText: {
        color: "#007bff",
        marginBottom: 10,
        textAlign: "center"
    },
    profileCard: {
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        marginTop: 10,
    },
    lightCard: {
        backgroundColor: "#f5f5f5",
    },
    darkCard: {
        backgroundColor: "#1e1e1e",
    },
    input: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        borderBottomWidth: 1,
        width: "100%",
        marginVertical: 5,
    },
    lightText: {
        color: "#000",
    },
    darkText: {
        color: "#fff",
        borderBottomColor: "#444",
    },
});

export default ProfileScreen;
