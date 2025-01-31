import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import GoBack from '../../components/icon/GoBack';

const About = () => {
  return (
    <MainLayout>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.mainTitle}>Cloud Game Rules</Text>
          <Text style={styles.welcomeText}>
            Welcome to the Star Collector! ☀️
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Objective:</Text>
            <Text style={styles.text}>
              Guide your sun through the sky, jumping to catch stars above the
              clouds. Collect as many stars as possible to earn points and
              complete levels.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Play:</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Tap the jump button to make your sun bounce upward
              </Text>
              <Text style={styles.bulletPoint}>
                • Stars appear above the moving clouds
              </Text>
              <Text style={styles.bulletPoint}>
                • Catch stars to earn points
              </Text>
              <Text style={styles.bulletPoint}>
                • Complete levels to save your scores
              </Text>
              <Text style={styles.bulletPoint}>
                • Use saved scores to unlock special articles (1500 points per
                article)
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Important to Know:</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Your level progress saves only when you complete the level
              </Text>
              <Text style={styles.bulletPoint}>
                • Leaving a level mid-game will reset that level's score
              </Text>
              <Text style={styles.bulletPoint}>
                • Total score accumulates only from completed levels
              </Text>
              <Text style={styles.bulletPoint}>
                • Each article requires 1500 points to unlock
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Level Progression:</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                Level 1: 9 clouds - Slow cloud movement
              </Text>
              <Text style={styles.bulletPoint}>
                Level 2: 15 clouds - Moderate speed
              </Text>
              <Text style={styles.bulletPoint}>
                Level 3: 20 clouds - Increased challenge
              </Text>
              <Text style={styles.bulletPoint}>
                Level 4: 25 clouds - Faster movement
              </Text>
              <Text style={styles.bulletPoint}>
                Level 5: 30 clouds - Advanced speed
              </Text>
              <Text style={styles.bulletPoint}>
                Level 6: 35 clouds - Expert pace
              </Text>
              <Text style={styles.bulletPoint}>
                Level 7: 40 clouds - Master level
              </Text>
              <Text style={styles.bulletPoint}>
                Level 8: 50 clouds - Elite challenge
              </Text>
              <Text style={styles.bulletPoint}>
                Level 9: 60 clouds - Champion speed
              </Text>
              <Text style={styles.bulletPoint}>
                Level 10: 75 clouds - Ultimate test
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Remember:</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Complete levels to save your scores
              </Text>
              <Text style={styles.bulletPoint}>
                • Collected points only count after finishing a level
              </Text>
              <Text style={styles.bulletPoint}>
                • Use your saved points wisely to unlock articles
              </Text>
            </View>
          </View>

          <Text style={styles.goodLuck}>Good luck collecting stars! ⭐️</Text>
        </ScrollView>
      </SafeAreaView>
      <View style={{height: 120}} />
      <GoBack />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFDD56',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  bulletPoints: {
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 5,
  },
  goodLuck: {
    fontSize: 20,
    color: '#FFDD56',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
});

export default About;
