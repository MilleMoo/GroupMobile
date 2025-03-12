import React ,{ useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity } from "react-native"
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/Fontisto";


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
            <View style = {{ justifyContent: "center", alignItems: "center" }}>
                <Text style= {{ fontSize: 30, color: "white", fontWeight: "bold" }}>
                    Login
                </Text>
            </View>
            <View style = {style.inputContainer}>
                <TextInput
                    style = {style.button} // เปลี่ยนสีเส้นขอบเมื่อมี error
                    placeholder = "Username" // ถ้ามี error ให้ขึ้นข้อความแทน
                    value = {Username}
                    onChangeText = {setUsername}
                />
        <Icon name = "user" size = {20} color = "white" style = {style.iconemail}/>    
        </View>
        <View style = {style.inputContainer}>
                <TextInput
                    style = {style.button} // เปลี่ยนสีเส้นขอบเมื่อมี error
                    placeholder = "Username" // ถ้ามี error ให้ขึ้นข้อความแทน
                    value = {Password}
                    onChangeText = {setPassword}
                />
            <Icon name = "lock" size = {20} color = "white" style = {style.iconemail}/>    
        </View>
        
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={handleLogin}>
                    <View style={style.Login}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, }}>
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={style.FPassword}>
                        <Text style={{ color: "white",fontSize: 20, }}>
                            Forgot Password
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "flex-end",marginTop: 50,}}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <View style={style.FPassword}>
                            <Text style={{ color: "white",fontSize: 20, }}>
                                Sign Up
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
        backgroundColor: "#1a649a"
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
    button: {
        width: "100%",
        borderRadius: 5,
        marginVertical: "15",
        backgroundColor: "rgba(240, 233, 233, 0.25)", // ทำให้โปร่งใส่
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
    },
    buttonRegis: {
        paddingVertical: 15, // เพิ่ม ระยะห่างด้านบน-ล่างให้มันเท่ากัน paddingTop กับ paddingButton
        paddingHorizontal: 20, // เพิ่ม ระยะห่างซ้าย-ขวาให้มันเท่ากัน paddingRight กับ paddingLeft
        borderRadius: 25, //ทำให้เป็นกลม ๆ 
        marginVertical: 5, // เพิ่ม ระยะห่างด้านบน-ล่างให้มันเท่ากัน marginTop กับ marginButton 1
        width: "40%",
        alignSelf: "center",
        backgroundColor: "rgba(43, 175, 43, 0.5)", // ทำให้โปร่งใส่
    },
    error:{
        color: "red",
        marginVertical: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        position: "absolute",
        left: 340,
    },
    iconemail: {
        position: "absolute",
        left: 370,
    },
    inputError: {
        borderColor: "red", // เปลี่ยนเส้นขอบเป็นสีแดง
        borderWidth: 1,
    },
})

export default LoginScreen
