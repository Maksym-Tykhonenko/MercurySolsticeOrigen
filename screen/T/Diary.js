import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import DiaryIcon from '../../components/icon/DiaryIcon';

const moods = [
  {id: 1, name: 'Joy', image: require('../../assets/mood/joy.png')},
  {
    id: 2,
    name: 'Confidence',
    image: require('../../assets/mood/confidence.png'),
  },
  {id: 3, name: 'Calm', image: require('../../assets/mood/calm.png')},
  {id: 4, name: 'Fatigue', image: require('../../assets/mood/fatigue.png')},
  {id: 5, name: 'Anxiety', image: require('../../assets/mood/anxiety.png')},
  {id: 6, name: 'Sadness', image: require('../../assets/mood/sadness.png')},
];

const MoodEmoji = ({mood, onPress}) => {
  const swayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(swayAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(swayAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const swayInterpolation = swayAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 5], // Adjust these values to control sway distance
  });

  return (
    <TouchableOpacity style={styles.moodItem} onPress={onPress}>
      <Animated.View
        style={{
          transform: [{translateX: swayInterpolation}],
        }}>
        <Image source={mood.image} style={styles.moodEmoji} />
      </Animated.View>
      <Text style={styles.moodText}>{mood.name}</Text>
    </TouchableOpacity>
  );
};

const Diary = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelection = mood => {
    console.log(mood);
    setSelectedMood(mood);
    navigation.navigate('AddDiary', {mood});
  };

  const renderMoodGrid = () => {
    return (
      <View style={styles.moodGrid}>
        <View style={styles.moodRow}>
          {moods.slice(0, 3).map(mood => (
            <MoodEmoji
              key={mood.id}
              mood={mood}
              onPress={() => handleMoodSelection(mood)}
            />
          ))}
        </View>
        <View style={{borderWidth: 1, borderColor: '#91203E'}} />
        <View style={styles.moodRow}>
          {moods.slice(3, 6).map(mood => (
            <MoodEmoji
              key={mood.id}
              mood={mood}
              onPress={() => handleMoodSelection(mood)}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <DiaryIcon />
        <Text style={styles.title}>
          Please select one of the moods{'\n'}by tapping the corresponding
          emoji.
        </Text>
        {renderMoodGrid()}
      </ScrollView>
      <View style={{height: 105}} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: '30%',
    // height:'100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 32,
  },
  moodGrid: {
    gap: 40,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  moodItem: {
    alignItems: 'center',
    gap: 8,
  },
  moodEmoji: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  moodText: {
    color: '#FFDD56',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Diary;
