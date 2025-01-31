import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {articlesData} from '../../data/articlesData';
import {useAppContext} from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../../components/icon/GoBack';

const Article = ({navigation}) => {
  const {totalScore, deductScore} = useAppContext();
  const SCORE_TO_UNLOCK = 1500;
  const [unlockedArticles, setUnlockedArticles] = useState(new Set());

  // Load unlocked articles from storage on mount
  useEffect(() => {
    loadUnlockedArticles();
  }, []);

  const loadUnlockedArticles = async () => {
    try {
      const saved = await AsyncStorage.getItem('unlockedArticles');
      if (saved) {
        setUnlockedArticles(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Error loading unlocked articles:', error);
    }
  };

  const saveUnlockedArticles = async newSet => {
    try {
      await AsyncStorage.setItem(
        'unlockedArticles',
        JSON.stringify([...newSet]),
      );
    } catch (error) {
      console.error('Error saving unlocked articles:', error);
    }
  };

  const handleArticlePress = async (article, index) => {
    const requiredScore = SCORE_TO_UNLOCK;

    console.log('Attempting to open article:', {
      articleId: article.id,
      totalScore,
      requiredScore,
      isUnlocked: unlockedArticles.has(article.id),
    });

    if (totalScore >= requiredScore && !unlockedArticles.has(article.id)) {
      console.log('Unlocking article:', article.id);

      // Deduct score first
      const newTotalScore = await deductScore(SCORE_TO_UNLOCK);
      console.log('Score deducted:', {
        deducted: SCORE_TO_UNLOCK,
        newTotalScore,
      });

      // Then unlock the article
      const newUnlockedArticles = new Set(unlockedArticles);
      newUnlockedArticles.add(article.id);
      setUnlockedArticles(newUnlockedArticles);
      await saveUnlockedArticles(newUnlockedArticles);

      // Here you can add navigation to article detail screen
      // navigation.navigate('ArticleDetail', { article });
    } else if (unlockedArticles.has(article.id)) {
      // Navigate to article detail if already unlocked
      // navigation.navigate('ArticleDetail', { article });
      console.log('Opening unlocked article:', article.id);
    } else {
      console.log(
        'Not enough score to unlock article:',
        article.id,
        'Required:',
        requiredScore,
        'Current:',
        totalScore,
      );
    }
  };

  const renderArticleBox = (article, index) => {
    const isUnlocked = unlockedArticles.has(article.id);
    const requiredScore = SCORE_TO_UNLOCK;
    const canUnlock = totalScore >= requiredScore;

    return (
      <TouchableOpacity
        key={article.id}
        style={styles.articleBox}
        onPress={() => navigation.navigate('ReadArticleDetails', {article})}
        disabled={!canUnlock && !isUnlocked}>
        <Image
          source={require('../../assets/ui/book.png')}
          style={styles.bookImage}
        />
        <TouchableOpacity
          onPress={() => handleArticlePress(article, index)}
          style={[
            styles.scoreButton,
            isUnlocked ? styles.unlockedButton : styles.lockedButton,
          ]}>
          {isUnlocked ? (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Read</Text>
              <Image
                source={require('../../assets/ui/star.png')}
                style={styles.starIcon}
              />
            </View>
          ) : (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{requiredScore}</Text>
              <Image
                source={require('../../assets/ui/lock.png')}
                style={styles.lockIcon}
              />
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Total Score Display */}
      <View style={styles.headerScore}>
        <Text style={styles.totalScoreText}>{totalScore}</Text>
        <Image
          source={require('../../assets/ui/star.png')}
          style={styles.headerStarIcon}
        />
      </View>

      {/* Articles Grid */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.articlesGrid}>
          {articlesData.map((article, index) =>
            renderArticleBox(article, index),
          )}
        </View>
        <View style={{height: 70}} />
      </ScrollView>
      <View style={{height: 120}} />
      <GoBack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5C',
  },
  headerScore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: '15%',
  },
  totalScoreText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  headerStarIcon: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    padding: 16,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  articleBox: {
    width: '43%',
    aspectRatio: 1,
    backgroundColor: '#1E4B8C',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bookImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  scoreButton: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  unlockedButton: {
    backgroundColor: '#91203E',
  },
  lockedButton: {
    backgroundColor: '#91203E',
    opacity: 0.7,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  lockIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
});

export default Article;
