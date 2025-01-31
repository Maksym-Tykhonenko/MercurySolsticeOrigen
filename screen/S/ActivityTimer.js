import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  ScrollView,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/Layout/MainLayout';
import CurrentDate from '../../components/ui/CurrentDate';
import {useAppContext} from '../../store/context';
import GoBack from '../../components/icon/GoBack';

const ActivityTimer = ({route}) => {
  const {title} = route.params;
  const TOTAL_SECONDS = 45 * 60; // 45 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const progressRef = useRef();
  const timerRef = useRef(null);

  // Get context functions
  const {saveTimer, timerHistory} = useAppContext();

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;
  };

  const handleTimerComplete = async () => {
    try {
      const completedDuration = TOTAL_SECONDS - timeLeft;
      if (completedDuration > 0) {
        // Vibrate when timer completes
        Vibration.vibrate([0, 500, 200, 500]); // Pattern: wait 0ms, vibrate 500ms, wait 200ms, vibrate 500ms

        await saveTimer(title, completedDuration);
        console.log('Timer saved successfully:', {
          title,
          duration: completedDuration,
          history: timerHistory[title],
        });
      }
    } catch (error) {
      console.error('Error saving timer:', error);
    }
  };

  const toggleTimer = () => {
    if (!isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const resetTimer = async () => {
    clearInterval(timerRef.current);
    // Save the timer if it was running and some time has passed
    if (isPlaying || timeLeft < TOTAL_SECONDS) {
      await handleTimerComplete();
    }
    setIsPlaying(false);
    setTimeLeft(TOTAL_SECONDS);
    progressRef.current?.reAnimate(0);
  };

  useEffect(() => {
    progressRef.current?.animate(calculateProgress(), 300);
    if (timeLeft === 0) {
      handleTimerComplete();
    }
  }, [timeLeft]);

  // Cleanup and save on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        handleTimerComplete();
      }
    };
  }, []);

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={{paddingTop: '15%'}}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.container}> */}
        <View style={styles.dateWrapper}>
          <CurrentDate />
        </View>

        <View style={styles.titleContainer}>
          <LinearGradient
            colors={['#FFDD56', '#FE9F50']}
            style={styles.titleButton}>
            <Text style={styles.titleText}>{title}</Text>
          </LinearGradient>
        </View>

        <View style={styles.timerWrapper}>
          {/* <LinearGradient
            colors={['#2D60E3', '#19357D']}
            style={styles.timerContainer}> */}
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              ref={progressRef}
              size={280}
              width={15}
              fill={0}
              rotation={0}
              tintColor="#91203E"
              backgroundColor="#A2FEFB8F"
              lineCap="round">
              {() => (
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              )}
            </AnimatedCircularProgress>

            <View style={styles.controlsContainer}>
              <TouchableOpacity onPress={toggleTimer}>
                <LinearGradient
                  colors={['#FFDD56', '#FE9F50']}
                  style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>
                    {isPlaying ? '⏸' : '▶️'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={resetTimer}>
                <LinearGradient
                  colors={['#FFDD56', '#FE9F50']}
                  style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>⏹</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {/* </LinearGradient> */}
        </View>
        {/* </View> */}
      </ScrollView>
      <GoBack />
      <View style={{margin: 60}} />
    </MainLayout>
  );
};

export default ActivityTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dateWrapper: {
    // position: 'absolute',
    // top: 70,
    // left: 0,
    // right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  timerWrapper: {
    marginHorizontal: 20,
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    backgroundColor: '#2D60E3',
  },
  timerContainer: {
    borderRadius: 20,
    // padding: 20,
    // alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    // top: -25,
    zIndex: 1,
    marginVertical: 20,
  },
  titleButton: {
    // borderRadius: 25,
    width: '45%',
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
  },
  titleText: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    color: '#001432',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#A9B2F6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 11,
    elevation: 11,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.75,
    shadowRadius: 14.5,
    elevation: 14.5,
    padding: 20,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFDD56',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 20,
    marginTop: 20,
    width: '80%',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonText: {
    fontSize: 24,
    color: '#001432',
  },
});
