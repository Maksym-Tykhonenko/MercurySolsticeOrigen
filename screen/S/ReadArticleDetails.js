import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import Sound from 'react-native-sound';
import GoBack from '../../components/icon/GoBack';

const Sun = require('../../assets/ui/Sun.png');

const ReadArticleDetails = ({route}) => {
  const {article} = route.params;
  console.log(article);
  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <Image source={Sun} style={styles.sunImage} />
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.text}>{article.text}</Text>
        <Text style={styles.tip}>TIP: {article.tip}</Text>
      </ScrollView>
      <GoBack />
    </MainLayout>
  );
};

export default ReadArticleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 50,
  },
  sunImage: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFF47C',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#FFF',
    // textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  tip: {
    fontSize: 18,
    color: '#FFF',
    // textAlign: 'center',
    marginHorizontal: 20,
  },
});
