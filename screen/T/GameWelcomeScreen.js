import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import CustomBtn from '../../components/ui/CustomBtnNav';
import ReadArticleBtn from '../../components/ui/ReadArticleBtn';

const GameWelcomeScreen = ({navigation}) => {
  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sunContainer}>
          <Image
            source={require('../../assets/ui/Sun.png')}
            style={styles.sunImage}
          />
        </View>

        {/* Instructions Text */}
        <Text style={styles.instructionsText}>
          Jump on clouds and collect stars.{'\n'}
          Press on jump button on the screen to jump{'\n'}
          and catch the star on cloud!{'\n'}
          Earn star points for every cloud you find star.{'\n\n'}
          Ready to conquer the sky?
        </Text>

        {/* Time to Shine Button */}

        <CustomBtn
          onPress={() => navigation.navigate('Game')}
          title="Time to shine"
        />
        <CustomBtn onPress={() => navigation.navigate('About')} title="About" />

        {/* Radiance Depot Button */}
        <ReadArticleBtn />
      </ScrollView>
      <View style={{height: 90}} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#002B5C', // Dark blue background
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  sunContainer: {
    marginBottom: 20,
  },
  sunImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  instructionsText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default GameWelcomeScreen;
