import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, Switch, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from "@expo/vector-icons";
import { updateBioInDatabase, GetUserName } from "../../service/Api"; // Import API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const ProfileScreen = ({ route }) => {
    const { user } = route.params || {}; 
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [username, setUsername] = useState(user.Username || ""); 
    const [profileImage, setProfileImage] = useState("https://cdn.marvel.com/content/1x/349red_com_crd_01.png");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Load dark mode preference from AsyncStorage
        const loadDarkMode = async () => {
            const storedMode = await AsyncStorage.getItem('darkMode');
            if (storedMode !== null) {
                setIsDarkMode(JSON.parse(storedMode)); // Set the mode based on the stored value
            }
        };

        loadDarkMode();
        fetchUserData();
    }, []);

    useEffect(() => {
        // Save dark mode preference to AsyncStorage
        const saveDarkMode = async () => {
            await AsyncStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        };

        saveDarkMode();
    }, [isDarkMode]);

    const toggleSwitch = () => setIsDarkMode(!isDarkMode);

    const fetchUserData = async () => {
        try {
            const data = await GetUserName(username);
            console.log("Update response:", data); 
            if (data != null) {
                setName(data.username);
                setEmail(data.email);
                setBio(data.Bio);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

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

    const [bio, setBio] = useState("");  // Bio State
    const [isEditingBio, setIsEditingBio] = useState(false);

    const updateBio = async () => {
        try {
            const response = await updateBioInDatabase(username, bio); // ส่ง username และ bio ไปที่ API
            if (response.message === "Bio updated successfully") {
                setIsEditingBio(false); // ปิดโหมดการแก้ไข
                Alert.alert("Success", "Bio updated successfully!");
            } else {
                throw new Error('Error updating bio');
            }
        } catch (error) {
            console.error("Error updating bio:", error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.header}>
                <Switch value={isDarkMode} onValueChange={toggleSwitch} />
            </View>
    
            <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <Text style={styles.editText}>Edit Photo</Text>
            </TouchableOpacity>
    
            <View style={[styles.profileCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <View style={styles.nameContainer}>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, isDarkMode ? styles.darkText : styles.lightText]}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter name"
                            placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
                            autoFocus
                            onBlur={() => setIsEditing(false)}
                        />
                    ) : (
                        <TouchableOpacity style={styles.nameRow} onPress={() => setIsEditing(true)}>
                            <Text style={[styles.input, isDarkMode ? styles.darkText : styles.lightText]}>
                                {name}
                            </Text>
                            <MaterialIcons name="edit" size={20} color={isDarkMode ? "#aaa" : "#555"} />
                        </TouchableOpacity>
                    )}
                </View>
    
                <Text style={[styles.username, isDarkMode ? styles.darkText : styles.lightText]}>
                    {username}
                </Text>
                <Text style={[styles.username, isDarkMode ? styles.darkText : styles.lightText]}>
                    {Email}
                </Text>
            </View>
    
            {/* Bio Section */}
            <View style={[styles.profileCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <View style={styles.bioContainer}>
                    {isEditingBio ? (
                        <TextInput
                            style={[styles.bioInput, isDarkMode ? styles.darkText : styles.lightText]}
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Enter bio"
                            placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
                            autoFocus
                            multiline
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setIsEditingBio(true)}>
                            <Text style={[styles.bioText, isDarkMode ? styles.darkText : styles.lightText]}>
                                {bio || "Tap to add bio"}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {isEditingBio && (
                        <TouchableOpacity style={styles.updateButton} onPress={updateBio}>
                            <Text style={styles.updateButtonText}>Update Bio</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: "center", 
        paddingTop: 50 
    },
    lightContainer: { 
        backgroundColor: "#ffffff" 
    },
    darkContainer: { 
        backgroundColor: "#121212" 
    },
    header: { 
        position: "absolute", 
        top: 10, 
        right: 10, 
        padding: 10 
    },
    profileImage: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: "#ccc" 
    },
    editText: { 
        color: "#007bff", 
        textAlign: "center" 
    },
    profileCard: { 
        alignItems: "center", 
        padding: 20, 
        borderRadius: 10, 
        width: "90%", 
        marginTop: 10, 
    },
    nameContainer: { 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        width: "100%" 
    },
    nameRow: { 
        flexDirection: "row", 
        alignItems: "center" 
    },
    input: { 
        fontSize: 18, 
        fontWeight: "bold", 
        textAlign: "center", 
        flex: 1 
    },
    username: { 
        fontSize: 16, 
        color: "gray", 
        marginTop: 5 
    },
    lightText: {
        color: "#000",
    },
    darkText: {
        color: "#fff",
    },
    lightCard: {
        backgroundColor: "#f5f5f5",
    },
    darkCard: {
        backgroundColor: "#1e1e1e",
    },
    bioContainer: {
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    bioText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        flexWrap: "wrap",
        width: "80%",
    },
    bioInput: {
        fontSize: 14,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "gray",
        width: "80%",
        padding: 5,
        flexWrap: "wrap",
    },
    updateButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default ProfileScreen;
