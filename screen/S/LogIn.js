import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBtn from '../../components/ui/CustomBtnNav';

const defaultProfile = require('../../assets/ui/profile.png');

const LogIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedUsername) setUsername(savedUsername);
      if (savedImage) setProfileImage(savedImage);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        await AsyncStorage.setItem('profileImage', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSignIn = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      navigation.navigate('TabNav');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <MainLayout>
      <View style={styles.content}>
        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          <Image
            source={profileImage ? {uri: profileImage} : defaultProfile}
            style={styles.profileImage}
          />
          {/* <View style={styles.imageOverlay}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </View> */}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <CustomBtn onPress={handleSignIn} title={'Sign in'} />
      </View>
    </MainLayout>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 40,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 60,
    // borderWidth: 2,
    // borderColor: '#FFD700',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 60,
    width: '50%',
    // marginHorizontal: 40,
  },
  changePhotoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
});
