import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import {
  EditUserName,
  GetUserName,
  updateProfileImage,
} from "../../service/Api"; // ✅ เพิ่ม updateProfileImage()
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ route }) => {
  const { user } = route.params || {};
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [username, setUsername] = useState(user.Username || "");
  const [profileImage, setProfileImage] = useState(
    "https://cdn.marvel.com/content/1x/349red_com_crd_01.png"
  );
  const [isEditing, setIsEditing] = useState(false);

  const toggleSwitch = () => setIsDarkMode(!isDarkMode);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData(); // ✅ ดึงข้อมูลใหม่ทุกครั้งที่เข้าโปรไฟล์
    }, [username])
  );

 const fetchUserData = async () => {
   try {
     const data = await GetUserName(username);
     if (data) {
       setName(data.username);
       setEmail(data.email);
       setProfileImage(data.profileImage); // ✅ ดึงรูปโปรไฟล์ล่าสุด
     }
   } catch (error) {
     console.error("Fetch error:", error);
   }
 };

  const updateNameInDatabase = async (newName) => {
    try {
      const response = await EditUserName(username, newName);

      console.log("Update response:", response.data);

      setName(newName);
      setUsername(newName);
      Alert.alert("Success", "Name updated successfully!");
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Could not update name"
      );
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your photos to upload an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      setProfileImage(newImage); // ✅ เปลี่ยนรูปใน UI ทันที
      await updateUserProfileImage(newImage); // ✅ บันทึกลงฐานข้อมูล
    }
  };

  const updateUserProfileImage = async (newImage) => {
    try {
      await updateProfileImage(username, newImage); // ✅ อัปเดตไปที่ฐานข้อมูล
      Alert.alert("Success", "Profile image updated!");
    } catch (error) {
      console.error("Update profile image error:", error);
      Alert.alert("Error", "Could not update profile image");
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.header}>
        <Switch value={isDarkMode} onValueChange={toggleSwitch} />
      </View>

      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.editText}>Edit Photo</Text>
      </TouchableOpacity>

      <View
        style={[
          styles.profileCard,
          isDarkMode ? styles.darkCard : styles.lightCard,
        ]}
      >
        <View style={styles.nameContainer}>
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
              autoFocus
              onBlur={() => {
                setIsEditing(false);
                updateNameInDatabase(name);
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.nameRow}
              onPress={() => setIsEditing(true)}
            >
              <Text
                style={[
                  styles.input,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
              >
                {name}
              </Text>
              <MaterialIcons
                name="edit"
                size={20}
                color={isDarkMode ? "#aaa" : "#555"}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text
          style={[
            styles.username,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {username}
        </Text>
        <Text
          style={[
            styles.username,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {Email}
        </Text>
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
    borderWidth: 2,
    borderColor: "#ccc",
  },
  editText: {
    color: "#007bff",
    textAlign: "center",
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
    width: "100%",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  username: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
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
});

export default ProfileScreen;
