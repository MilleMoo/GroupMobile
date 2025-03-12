import React ,{ useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity } from "react-native"
import axios from "axios";


const LoginScreen = ({ navigation }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await LoginUser(Username, Password);
            Alert.alert("Login Successful", `Token: ${response}`);
            navigation.navigate("Home");

        } catch (error) {
            Alert.alert("login Failed!", error.message)
        }
    }
    return (
        <View style={style.container}>
            <TextInput
                style={style.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={Username}
                />
            <TextInput
                style={style.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={Password}
                secureTextEntry
            />
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity >
                    <View style={style.Login}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, }}>
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={style.FPassword}>
                        <Text style={{ color: "black",fontSize: 20, }}>
                            Forgot Password
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "flex-end",marginTop: 50,}}>
                <TouchableOpacity >
                        <View style={style.FPassword}>
                            <Text style={{ color: "black",fontSize: 20, }}>
                                Register New
                            </Text>
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#1a649a "
    },
    input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    Login:{
        borderRadius: 50,
        borderWidth: 1,
        height: 50,
        width: 130,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "auto",
        fontSize: 10,
        marginTop: 30,
        marginLeft: 40,
        backgroundColor: "#275b81 ",
        borderColor: "white",
    },
    FPassword:{
        borderRadius: 50,
        height: 50,
        width: 170,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "auto",
        fontSize: 10,
        marginTop: 30,
        marginLeft: 50,
    },
})

export default LoginScreen