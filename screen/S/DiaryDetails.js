import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import GoBack from '../../components/icon/GoBack';

const DiaryDetails = () => {
  const {diaryEntries} = useAppContext();
  const [selectedEntry, setSelectedEntry] = useState(null);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderDiaryEntry = entry => (
    <TouchableOpacity key={entry.id} onPress={() => setSelectedEntry(entry)}>
      <LinearGradient
        colors={['rgba(73, 96, 174, 0.5)', 'rgba(25, 53, 125, 0.5)']}
        style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <Image source={entry.mood.image} style={styles.moodEmoji} />
          <View style={styles.headerText}>
            <Text style={styles.moodText}>{entry.mood.name}</Text>
            <Text style={styles.dateText}>{formatDate(entry.date)}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.entryText} numberOfLines={2}>
          {entry.text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderDetailModal = () => (
    <Modal
      visible={selectedEntry !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setSelectedEntry(null)}>
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setSelectedEntry(null)}>
        <Pressable style={styles.modalContent}>
          <LinearGradient
            colors={['#2D60E3', '#19357D']}
            style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Image
                source={selectedEntry?.mood.image}
                style={styles.modalEmoji}
              />
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalMoodText}>
                  {selectedEntry?.mood.name}
                </Text>
                <Text style={styles.modalDateText}>
                  {selectedEntry && formatDate(selectedEntry.date)}
                </Text>
              </View>
            </View>
            <View style={styles.modalDivider} />
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalEntryText}>{selectedEntry?.text}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedEntry(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Your Diary Entries</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.entriesContainer}>
            {diaryEntries.length > 0 ? (
              diaryEntries
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(renderDiaryEntry)
            ) : (
              <Text style={styles.emptyText}>
                No diary entries yet. Start by adding your mood and thoughts!
              </Text>
            )}
          </View>
        </ScrollView>
        {renderDetailModal()}
      </View>
      <GoBack />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: '20%',
  },
  scrollView: {
    flex: 1,
  },
  entriesContainer: {
    gap: 20,
    paddingBottom: 20,
  },
  entryCard: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'rgba(73, 96, 174, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  moodEmoji: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 15,
  },
  entryText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalContainer: {
    // padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  modalEmoji: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalMoodText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 8,
    padding: 10,
  },
  modalDateText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  modalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalEntryText: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 28,
    padding: 10,
  },
  closeButton: {
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DiaryDetails;
