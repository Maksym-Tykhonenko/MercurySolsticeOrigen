import {
  StyleSheet,
  Text,
  View,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import {useState} from 'react';
import {useAppContext} from '../../store/context';
import {
  playBackgroundMusic,
  pauseBackgroundMusic,
} from '../../components/sound/SetSound';

const Settings = () => {
  const {resetGameProgress, isMusicEnable, setIsMusicEnable} = useAppContext();
  // const [isMusicEnable, setIsMusicEnable] = useState(true);
  console.log(isMusicEnable);

  const handleMusicToggle = async value => {
    setIsMusicEnable(value);
    if (value) {
      await playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Game Progress',
      'Are you sure you want to reset all game progress? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetGameProgress();
            Alert.alert('Success', 'Game progress has been reset');
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <MainLayout>
      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Background Sound</Text>
          <Switch
            value={isMusicEnable}
            onValueChange={handleMusicToggle}
            trackColor={{false: '#FFFFFF', true: '#790122'}}
            thumbColor={'#00254F'}
          />
        </View>

        {/* Reset Progress Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetProgress}>
          <Text style={styles.resetButtonText}>Reset Game Progress</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  settingsSection: {
    flex: 1,
    justifyContent: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FE9F50',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 10,
    },
  },
  settingLabel: {
    color: '#000',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#91203E',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
