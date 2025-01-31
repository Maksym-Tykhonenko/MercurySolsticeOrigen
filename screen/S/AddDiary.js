import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';
import {moodRecommendations} from '../../data/diaryMood';
import GoBack from '../../components/icon/GoBack';

const AddDiary = ({route, navigation}) => {
  const {mood} = route.params;
  const [diaryText, setDiaryText] = useState('');
  const {saveDiaryEntry} = useAppContext();

  // Memoize the random recommendation so it doesn't change on re-renders
  const recommendation = useMemo(() => {
    const recommendations = moodRecommendations[mood.name] || [];
    if (recommendations.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    return recommendations[randomIndex];
  }, [mood.name]); // Only recalculate if mood changes

  const handleAddToDiary = async () => {
    if (diaryText.trim()) {
      try {
        const success = await saveDiaryEntry(mood, diaryText.trim());
        if (success) {
          console.log('Diary entry saved successfully');
          Keyboard.dismiss();
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error saving diary entry:', error);
        // Optionally show error message to user
      }
    }
  };

  return (
    <MainLayout>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={mood.image} style={styles.moodEmoji} />

          <Text style={styles.title}>{recommendation}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              placeholder="Why do I feel this way today?..."
              placeholderTextColor="#666"
              value={diaryText}
              onChangeText={setDiaryText}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <TouchableOpacity onPress={handleAddToDiary}>
            <LinearGradient
              colors={['#91203E', '#691B3B']}
              style={styles.addButton}>
              <Text style={styles.buttonText}>Add to diary</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
          <GoBack />
        </KeyboardAvoidingView>
      {/* </TouchableWithoutFeedback> */}
    </MainLayout>
  );
};

export default AddDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '20%',
    alignItems: 'center',
  },
  moodEmoji: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#4A4A4A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  addButton: {
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
