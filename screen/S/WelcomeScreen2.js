import {StyleSheet, Text, View, Image} from 'react-native';
import CustomBtn from '../../components/ui/CustomBtnNav';
import MainLayout from '../../components/Layout/MainLayout';
import {WELCOME_TEXT} from '../../data/welcomeText';

const WelcomeScreen2 = ({navigation}) => {
  return (
    <MainLayout>
      <View style={styles.content}>
        <Image
          source={require('../../assets/ui/Sun.png')}
          style={styles.sunImage}
        />
        <Text style={styles.title}>MERCURY</Text>
        <Text style={styles.subtitle}>SOLSTICE</Text>

        <Text style={styles.description}>{WELCOME_TEXT}</Text>

        <CustomBtn
          onPress={() => navigation.navigate('LogIn')}
          title={'Begin'}
        />
      </View>
    </MainLayout>
  );
};

export default WelcomeScreen2;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    opacity: 0.9,
  },
});
