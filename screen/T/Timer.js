import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import CustomBtn from '../../components/ui/CustomBtnNav';
import CurrentDate from '../../components/ui/CurrentDate';

const Timer = ({navigation}) => {
  const handleActivity = ({title}) => {
    navigation.navigate('ActivityTimer', {title});
  };
  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={styles.container}> */}
          <View style={styles.dateWrapper}>
            <CurrentDate />
          </View>
          <Text style={styles.title}>Select your field of activity</Text>
          <View style={styles.timerContainer}>
            <View style={styles.buttonGroup}>
              <CustomBtn
                title={'Work'}
                onPress={() => handleActivity({title: 'Work'})}
              />
              <CustomBtn
                title={'Relaxation'}
                onPress={() => handleActivity({title: 'Relaxation'})}
              />
              <CustomBtn
                title={'Activities'}
                onPress={() => handleActivity({title: 'Activities'})}
              />
            </View>
          </View>
        {/* </View> */}
      </ScrollView>
    </MainLayout>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  dateWrapper: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    color: '#FFDD56',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 40,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonGroup: {
    gap: 30,
  },
});
