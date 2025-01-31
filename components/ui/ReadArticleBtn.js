import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const ReadArticleBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Article')}>
      <LinearGradient
        colors={['#DE5378', '#91203E']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <Text style={styles.buttonText}>Read Article</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ReadArticleBtn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DE5378',
    // paddingHorizontal: 30,
    // paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    // Button shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 1.0,
    shadowRadius: 9.9,
    elevation: 8, // for Android
    innerShadow: {
      shadowColor: '#FBFBFB',
      shadowOffset: {
        width: 1,
        height: 4,
      },
      shadowOpacity: 1.0,
      shadowRadius: 9.9,
    },
    marginVertical: 30,
  },
  buttonText: {
    paddingVertical: 16,
    paddingHorizontal: 64,
    color: '#001432',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#FBFBFB',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 6.5,
  },
});
