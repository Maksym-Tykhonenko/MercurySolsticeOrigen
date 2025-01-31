import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CurrentDate = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <LinearGradient
      colors={['#DE5378', '#91203E']}
      style={styles.dateContainer}>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </LinearGradient>
  );
};

export default CurrentDate;

const styles = StyleSheet.create({
  dateText: {
    fontSize: 16,
    color: '#FFF',
    padding: 8,
    borderRadius: '50%',
    fontWeight: 'bold',
  },
  dateContainer: {
    borderColor: '#FFF',
    borderWidth: 1,
    // padding: 10,
    borderRadius: 10,
    // paddingTop:14
  },
});
