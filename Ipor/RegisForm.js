import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/Fontisto";
import { registerUser } from "../../service/Api";

const RegisForm = ({ navigation }) => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });
  const userData = {
    Username: UserName,
  };

  const handleCheck = (field, value) => {
    switch (field) {
      case "Username":
        setUserName(value);
        setErrors((prevErrors) => ({ ...prevErrors, UserName: "" }));
        break;
      case "Password":
        setPassword(value);
        setErrors((prevErrors) => ({ ...prevErrors, Password: "" }));
        break;
      case "Email":
        setEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, Email: "" }));
        break;
      default:
        break;
    }
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "UserName":
        if (!value) error = "กรุณากรอกชื่อผู้ใช้";
        break;
      case "Email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]{10}$/;
        if (!value) {
          error = "กรุณากรอกอีเมลหรือเบอร์โทร";
        } else if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          error = "กรุณากรอกอีเมลหรือเบอร์โทรที่ถูกต้อง";
        }
        break;
      case "Password":
        if (!value) error = "กรุณากรอกรหัสผ่าน";
        break;
      case "ConfirmPassword":
        if (!value) {
          error = "กรุณากรอกรหัสผ่านอีกครั้ง";
        } else if (value !== Password) {
          error = "รหัสผ่านไม่ตรงกัน";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error;
  };

  const checkAll = () => {
    const usernameCheck = validateField("UserName", UserName);
    const emailCheck = validateField("Email", Email);
    const passwordCheck = validateField("Password", Password);
    const confirmPasswordCheck = validateField(
      "ConfirmPassword",
      ConfirmPassword
    );

    if (
      !usernameCheck &&
      !emailCheck &&
      !passwordCheck &&
      !confirmPasswordCheck
    ) {
      Alert.alert("Register:", "SUCCESS!!");
      return true;
    }
    Alert.alert("Register Failed");
    return false;
  };

  const handleRegister = async () => {
    try {
      if (checkAll()) {
        await registerUser(UserName, Email, Password);
        navigation.navigate("Profile", { user: userData });
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  // const backgroundImageUri = "https://i.pinimg.com/736x/4c/99/3d/4c993d398afa2c5c8c648ee70e4cf077.jpg";

  return (
    <View style={styles.container}>
      <Text style={styles.headers}>Create Your Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.button, errors.UserName && styles.inputError]} // เปลี่ยนสีเส้นขอบเมื่อมี error
          placeholder={errors.UserName ? errors.UserName : "Full Name"} // ถ้ามี error ให้ขึ้นข้อความแทน
          placeholderTextColor={errors.UserName ? "red" : "white"} // ถ้ามี error ให้เปลี่ยนเป็นสีแดง
          value={UserName}
          onChangeText={(newValue) => handleCheck("Username", newValue)}
          onBlur={() => validateField("UserName", UserName)}
        />
        <Icon name="user" size={20} color="white" style={styles.iconemail} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.button, errors.Email && styles.inputError]} // เปลี่ยนสีเส้นขอบเมื่อมี error
          placeholder={errors.Email ? "" : "Phone or Email"} // ถ้ามี error ให้ขึ้นข้อความแทน
          placeholderTextColor="white"
          value={Email}
          onChangeText={(newValue) => {
            handleCheck("Email", newValue);
            validateField("Email", newValue);
          }}
        />
        <Icon1 name="email" size={20} color="white" style={styles.iconemail} />

        {/* แสดงข้อความผิดพลาดแยกต่างหาก */}
        {errors.Email ? (
          <Text style={styles.errorText}>{errors.Email}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.button, errors.Password && styles.inputError]} // เปลี่ยนสีเส้นขอบเมื่อมี error
          placeholder={errors.Password ? errors.Password : "Password"} // ถ้ามี error ให้ขึ้นข้อความแทน
          placeholderTextColor={errors.Password ? "red" : "white"} // ถ้ามี error ให้เปลี่ยนเป็นสีแดง
          value={Password}
          onChangeText={(newValue) => handleCheck("Password", newValue)}
          onBlur={() => validateField("Password", Password)}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="white" style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.button, errors.ConfirmPassword && styles.inputError]} // เปลี่ยนสีเส้นขอบเมื่อมี error
          placeholder={
            errors.ConfirmPassword ? errors.ConfirmPassword : "Confirm Password"
          } // ถ้ามี error ให้ขึ้นข้อความแทน
          placeholderTextColor={errors.ConfirmPassword ? "red" : "white"} // เปลี่ยนสี placeholder เป็นสีแดงถ้ามี error
          value={ConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          onBlur={() => validateField("ConfirmPassword", ConfirmPassword)}
        />
        <Icon name="lock" size={20} color="white" style={styles.icon} />
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={[
          styles.buttonRegis,
          { backgroundColor: "rgba(249, 255, 249, 0.25)" },
        ]}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <View style={styles.signInContainer1}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signInButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  headers: {
    fontSize: 34,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
    marginBottom: 80,
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
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRegis: {
    paddingVertical: 15, // เพิ่ม ระยะห่างด้านบน-ล่างให้มันเท่ากัน paddingTop กับ paddingButton
    paddingHorizontal: 20, // เพิ่ม ระยะห่างซ้าย-ขวาให้มันเท่ากัน paddingRight กับ paddingLeft
    borderRadius: 25, //ทำให้เป็นกลม ๆ
    marginVertical: 30, // เพิ่ม ระยะห่างด้านบน-ล่างให้มันเท่ากัน marginTop กับ marginButton 1
    width: "40%",
    backgroundColor: "rgba(43, 175, 43, 0.5)", // ทำให้โปร่งใส่
  },
  error: {
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
    left: 340,
  },
  inputError: {
    borderColor: "red", // เปลี่ยนเส้นขอบเป็นสีแดง
    borderWidth: 1,
  },
  signInContainer: {
    flexDirection: "row", // จัดให้ข้อความอยู่ในแนวนอน
    justifyContent: "center", // จัดให้อยู่ตรงกลาง
    marginTop: 10,
    left: 120,
  },
  signInContainer1: {
    flexDirection: "row", // จัดให้ข้อความอยู่ในแนวนอน
    justifyContent: "center", // จัดให้อยู่ตรงกลาง
    marginTop: 15,
    left: -60,
  },

  signInText: {
    fontSize: 14,
    color: "white",
  },

  signInButton: {
    fontSize: 16,
    color: "#00BFFF", // สีฟ้าเพื่อให้ดูเหมือนลิงก์
    fontWeight: "bold",
    marginLeft: 5, // เพิ่มระยะห่างจากข้อความ "Already have an account?"
  },
});

export default RegisForm;