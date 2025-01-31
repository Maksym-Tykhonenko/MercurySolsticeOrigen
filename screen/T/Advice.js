import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dailyAdvice} from '../../data/advice';
import MainLayout from '../../components/Layout/MainLayout';

const Advice = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('morning');
  const [selectedAdvice, setSelectedAdvice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPositions, setButtonPositions] = useState({});
  const [sunPosition, setSunPosition] = useState({});
  console.log(buttonPositions);

  const timePeriods = ['morning', 'daytime', 'evening', 'night'];

  const timePositions = {
    morning: {
      buttonPositions: [
        {left: '15%', top: '10%'},
        {left: '45%', top: '25%'},
        {left: '10%', top: '40%'},
        {left: '35%', top: '55%'},
        {left: '47%', top: '80%'},
      ],
      sunPosition: {
        left: '10%',
        top: '80%',
      },
    },
    daytime: {
      buttonPositions: [
        {left: '40%', top: '5%'},
        {left: '10%', top: '20%'},
        {left: '45%', top: '35%'},
        {left: '45%', top: '65%'},
        {left: '10%', top: '80%'},
      ],
      sunPosition: {
        left: '25%',
        top: '50%',
      },
    },
    evening: {
      buttonPositions: [
        {left: '50%', top: '5%'},
        {left: '25%', top: '25%'},
        {left: '45%', top: '45%'},
        {left: '30%', top: '60%'},
        {left: '10%', top: '75%'},
      ],
      sunPosition: {
        left: '20%',
        top: '5%',
      },
    },
    night: {
      buttonPositions: [
        {left: '50%', top: '5%'},
        {left: '20%', top: '25%'},
        {left: '45%', top: '45%'},
        {left: '25%', top: '65%'},
        {left: '45%', top: '85%'},
      ],
      sunPosition: {
        left: '0%',
        top: '100%',
      },
    },
  };

  // Update sun position based on time period
  useEffect(() => {
    const positions = timePositions[selectedPeriod];
    setSunPosition(positions.sunPosition);

    // Set button positions from predefined values
    const newPositions = {};
    dailyAdvice[selectedPeriod].advices.forEach((advice, index) => {
      newPositions[advice.id] = positions.buttonPositions[index];
    });
    setButtonPositions(newPositions);
  }, [selectedPeriod]);

  const renderTimeButtons = () => (
    <View style={styles.timeButtonsContainer}>
      {timePeriods.map(period => (
        <TouchableOpacity
          key={period}
          onPress={() => setSelectedPeriod(period)}>
          <LinearGradient
            colors={
              selectedPeriod === period
                ? ['#FFDD56', '#FE9F50']
                : ['transparent', 'transparent']
            }
            style={[
              styles.timeButton,
              selectedPeriod === period && styles.selectedTimeButton,
            ]}>
            <Text
              style={[
                styles.timeButtonText,
                selectedPeriod === period && styles.selectedTimeButtonText,
              ]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAdviceButtons = () => (
    <ScrollView contentContainerStyle={styles.adviceContainer}>
      {/* <View style={styles.adviceContainer}> */}
      {dailyAdvice[selectedPeriod].advices.map(advice => (
        <TouchableOpacity
          key={advice.id}
          onPress={() => {
            setSelectedAdvice(advice);
            setModalVisible(true);
          }}
          style={[
            styles.adviceButtonWrapper,
            buttonPositions[advice.id] && {
              left: buttonPositions[advice.id].left,
              top: buttonPositions[advice.id].top,
            },
          ]}>
          <LinearGradient
            colors={['#FFDD56', '#FE9F50']}
            style={styles.adviceButton}>
            <Text style={styles.adviceButtonText}>Click on me</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <Animated.Image
        source={require('../../assets/ui/smallSun.png')}
        style={[
          styles.sunImage,
          {
            left: sunPosition.left,
            top: sunPosition.top,
          },
        ]}
      />
      {/* </View> */}
      <View style={{height: 50}} />
    </ScrollView>
  );

  return (
    <MainLayout>
      {/* <LinearGradient colors={['#2D60E3', '#001432']} style={styles.container}> */}
      {renderTimeButtons()}
      {renderAdviceButtons()}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <LinearGradient
              colors={['#2D60E3', '#19357D']}
              style={styles.modalContent}>
              {selectedAdvice && (
                <>
                  <Text style={styles.modalTitle}>
                    "{selectedAdvice.title.toUpperCase()}"
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedAdvice.description}
                  </Text>
                </>
              )}
            </LinearGradient>
            <Image
              source={require('../../assets/ui/smallSun.png')}
              style={styles.modalSun}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <LinearGradient
                colors={['#FFDD56', '#FE9F50']}
                style={styles.closeButtonGradient}>
                <Text style={styles.closeButtonText}>✕</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </LinearGradient> */}

      <View style={{height: 100}} />
    </MainLayout>
  );
};

export default Advice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 70,
  },
  timeButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  selectedTimeButton: {
    borderColor: 'transparent',
  },
  timeButtonText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  selectedTimeButtonText: {
    color: '#001432',
  },
  adviceContainer: {
    // flex: 1,
    // position: 'relative',d
    height: '90%',
  },
  adviceButtonWrapper: {
    position: 'absolute',
    width: 200,
  },
  adviceButton: {
    borderRadius: 25,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.9,
    elevation: 8,
  },
  adviceButtonText: {
    padding: 16,
    color: '#001432',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // paddingVertical: 40,
  },
  modalWrapper: {
    // width: '80%',
    position: 'relative',
  },
  modalContent: {
    borderRadius: 20,
    width: '80%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // height: '60%',
    width: '85%',
    
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 15,
    textAlign: 'center',
    paddingTop: 75,
    paddingHorizontal: 10,
  },
  modalDescription: {
    fontSize: 18,
    color: 'white',
    lineHeight: 24,
    textAlign: 'left',
    padding: 25,
    letterSpacing: 1,
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    zIndex: 1,
    // padding: 25,
  },
  closeButtonGradient: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
  closeButtonText: {
    color: '#001432',
    fontSize: 22,
    fontWeight: '900',
    // padding: 10,
  },
  sunImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    transform: [{translateX: -60}, {translateY: -60}],
  },
  modalSun: {
    position: 'absolute',
    width: 150,
    height: 150,
    transform: [{translateX: -60}, {translateY: -60}],
  },
});
