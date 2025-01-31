import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';

import {useAppContext} from '../../store/context';
import GoBack from '../../components/icon/GoBack';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const LEVELS = {
  1: {clouds: 9, speed: 0.6, description: 'Clouds move slowly'},
  2: {clouds: 15, speed: 0.9, description: 'Clouds at different heights'},
  3: {clouds: 20, speed: 1.0, description: 'Bonus clouds +3 ⭐️'},
  4: {clouds: 25, speed: 1.2, description: 'Thunderclouds -3 ⭐️'},
  5: {clouds: 30, speed: 1.5, description: 'Stars +5 ⭐️'},
  6: {clouds: 35, speed: 1.9, description: 'Increased difficulty'},
  7: {clouds: 40, speed: 2.2, description: 'Expert level'},
  8: {clouds: 50, speed: 2.6, description: 'Cloud master'},
  9: {clouds: 60, speed: 2.9, description: 'Sky conqueror'},
  10: {clouds: 75, speed: 3.2, description: 'Final challenge'},
};

const CLOUD_WIDTH = 120;
const JUMP_HEIGHT = 420;
const GRAVITY = 2;
const SUN_SIZE = 70;
const STAR_SIZE = 50;
const MIN_CLOUD_HEIGHT = SCREEN_HEIGHT - 650; // Higher position for clouds
const MAX_CLOUD_HEIGHT = SCREEN_HEIGHT - 450;
console.log(MIN_CLOUD_HEIGHT, 'MIN_CLOUD_HEIGHT');
console.log(MAX_CLOUD_HEIGHT, 'MAX_CLOUD_HEIGHT');

const Game = ({navigation}) => {
  const {saveGameProgress, totalScore} = useAppContext();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clouds, setClouds] = useState([]);
  const [collectedStars, setCollectedStars] = useState(new Set());
  const [cloudsGenerated, setCloudsGenerated] = useState(0);
  const sunPosition = useRef(
    new Animated.ValueXY({
      x: SCREEN_WIDTH / 6,
      y: SCREEN_HEIGHT - 300,
    }),
  ).current;
  const jumpAnimation = useRef(null);
  const isJumping = useRef(false);
  const gameLoop = useRef(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [pendingScore, setPendingScore] = useState(null);
  // console.log(totalScore);
  // Get current level settings with safety check
  const levelSettings = LEVELS[currentLevel] || LEVELS[1];

  // Add debug logging
  useEffect(() => {
    console.log('Current Level:', currentLevel);
    console.log('Level Settings:', levelSettings);
    console.log('Clouds Generated:', cloudsGenerated);
    console.log('Current game state:', {
      score,
      totalScore,
      pendingScore,
      currentLevel,
    });
  }, [
    currentLevel,
    levelSettings,
    cloudsGenerated,
    score,
    totalScore,
    pendingScore,
  ]);

  const spawnNewCloud = () => {
    const randomHeight =
      MIN_CLOUD_HEIGHT + Math.random() * (MAX_CLOUD_HEIGHT - MIN_CLOUD_HEIGHT);
    setCloudsGenerated(prev => prev + 1);

    return {
      id: Date.now() + Math.random(),
      x: SCREEN_WIDTH + CLOUD_WIDTH,
      y: randomHeight,
      type: Math.random() > 0.8 ? 'bonus' : 'normal',
      hasStar: Math.random() > 0.5, // 50% chance to have a star
    };
  };

  // Initialize game with clouds based on current level
  useEffect(() => {
    if (isPlaying && !gameEnded) {
      setCurrentLevel(0);
      setCloudsGenerated(0);
      setScore(0);

      const initialClouds = Array(LEVELS[1].clouds)
        .fill()
        .map((_, index) => ({
          ...spawnNewCloud(),
          id: Date.now() + index,
          x: SCREEN_WIDTH + CLOUD_WIDTH * 2 * index,
          hasStar: Math.random() > 0.5,
        }));

      setClouds(initialClouds);
      startGameLoop();
    }
    return () => {
      if (gameLoop.current) cancelAnimationFrame(gameLoop.current);
    };
  }, [isPlaying]);

  const checkStarCollision = (sunX, sunY, starX, starY) => {
    // Much larger vertical hit box for better collection at all heights
    const horizontalHitDistance = 60;
    const verticalHitDistance = 180; // Increased vertical hit distance

    const xDiff = Math.abs(sunX - starX);
    const yDiff = Math.abs(sunY - starY);

    // Debug collision
    // console.log('Sun position:', { x: sunX, y: sunY });
    // console.log('Star position:', { x: starX, y: starY });
    // console.log('Differences:', { xDiff, yDiff });

    return xDiff < horizontalHitDistance && yDiff < verticalHitDistance;
  };

  const startGameLoop = () => {
    const updateGame = () => {
      setClouds(prevClouds => {
        const newClouds = prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x - levelSettings.speed,
        }));

        const filteredClouds = newClouds.filter(
          cloud => cloud.x > -CLOUD_WIDTH,
        );

        // Add new cloud if needed, maintaining level cloud count
        if (filteredClouds.length < levelSettings.clouds) {
          const lastCloud = filteredClouds[filteredClouds.length - 1];
          if (!lastCloud || lastCloud.x < SCREEN_WIDTH - CLOUD_WIDTH * 2) {
            filteredClouds.push(spawnNewCloud());
          }
        }

        // Check for star collection
        filteredClouds.forEach(cloud => {
          if (cloud.hasStar && !collectedStars.has(cloud.id)) {
            const starX = cloud.x + CLOUD_WIDTH / 2;
            const starY = cloud.y - STAR_SIZE / 2;

            if (
              checkStarCollision(
                sunPosition.x._value + SUN_SIZE / 2,
                sunPosition.y._value + SUN_SIZE / 2,
                starX,
                starY,
              )
            ) {
              setCollectedStars(prev => new Set([...prev, cloud.id]));
              // Update score and queue the save
              setScore(prevScore => {
                const newScore = prevScore + 10;
                setPendingScore(newScore);
                return newScore;
              });
            }
          }
        });

        return filteredClouds;
      });

      // Apply gravity if not jumping
      if (!isJumping.current) {
        sunPosition.y.setValue(
          Math.min(sunPosition.y._value + GRAVITY, SCREEN_HEIGHT - 300),
        );
      }

      gameLoop.current = requestAnimationFrame(updateGame);
    };

    gameLoop.current = requestAnimationFrame(updateGame);
  };

  const handleJump = () => {
    if (isJumping.current) return;

    isJumping.current = true;
    Animated.sequence([
      // Jump up
      Animated.timing(sunPosition.y, {
        toValue: sunPosition.y._value - JUMP_HEIGHT,
        duration: 500,
        useNativeDriver: true,
      }),
      // Fall down
      Animated.timing(sunPosition.y, {
        toValue: sunPosition.y._value,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isJumping.current = false;
    });
  };

  // Star collection without immediate save
  const handleStarCollection = cloudId => {
    console.log('Star collected!');
    setCollectedStars(prev => new Set([...prev, cloudId]));
    setScore(prevScore => prevScore + 10);
  };

  // Save progress when level changes
  useEffect(() => {
    const saveLevelProgress = async () => {
      if (currentLevel > 1 && score > 0) {
        // Only save if we've progressed past level 1
        console.log('Saving progress for completed level:', {
          currentLevel: currentLevel - 1, // Save for completed level
          scoreToSave: score,
        });

        try {
          const newTotalScore = await saveGameProgress(score, currentLevel - 1);
          console.log('Level progress saved successfully:', {
            levelCompleted: currentLevel - 1,
            scoreAdded: score,
            newTotalScore,
          });
        } catch (error) {
          console.error('Error saving level progress:', error);
        }
      }
    };

    saveLevelProgress();
  }, [currentLevel]); // Trigger on level change

  // Check for level progression
  useEffect(() => {
    const maxLevel = Object.keys(LEVELS).length;
    if (cloudsGenerated >= levelSettings.clouds && currentLevel < maxLevel) {
      console.log(
        `Level ${currentLevel} completed! Clouds generated: ${cloudsGenerated}`,
      );
      setCurrentLevel(prev => Math.min(prev + 1, maxLevel));
      setCloudsGenerated(0);
    }
  }, [cloudsGenerated, currentLevel, levelSettings.clouds]);

  // Game end handling
  const handleGameEnd = async () => {
    if (!gameEnded && isPlaying) {
      setIsPlaying(false);
      setGameEnded(true);

      // Save final level progress
      console.log('Saving final game stats:', {
        finalLevel: currentLevel,
        finalScore: score,
        totalScoreBeforeEnd: totalScore,
      });

      try {
        const newTotalScore = await saveGameProgress(score, currentLevel);
        console.log('Final game stats saved:', {
          finalScore: score,
          finalLevel: currentLevel,
          newTotalScore,
        });

        Alert.alert(
          'Game Over!',
          `Level Reached: ${currentLevel}\nScore: ${score}\nTotal Score: ${newTotalScore}`,
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      } catch (error) {
        console.error('Error saving final game stats:', error);
      }
    }
  };

  // Call handleGameEnd when appropriate (e.g., collision with enemy, game completion)
  useEffect(() => {
    if (currentLevel === Object.keys(LEVELS).length) {
      // Game completed - all levels finished
      handleGameEnd();
    }
  }, [currentLevel]);

  // Add game over condition for no more clouds - only check if game is actually playing
  useEffect(() => {
    if (clouds.length === 0 && isPlaying && cloudsGenerated > 0) {
      handleGameEnd();
    }
  }, [clouds, isPlaying, cloudsGenerated]);

  return (
    // <MainLayout>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.soundButton}>
          <Image
            source={require('../../assets/icons/sound.png')}
            style={styles.soundIcon}
          />
        </TouchableOpacity> */}
        <Text style={styles.levelText}>Level {currentLevel}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
          <Image
            source={require('../../assets/game/star.png')}
            style={styles.starIcon}
          />
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {clouds.map(cloud => (
          <View
            key={cloud.id}
            style={[styles.cloudContainer, {left: cloud.x, top: cloud.y}]}>
            <Image
              source={
                cloud.type === 'bonus'
                  ? require('../../assets/game/clouds/bonus.png')
                  : require('../../assets/game/clouds/normal.png')
              }
              style={styles.cloud}
            />
            {cloud.hasStar && !collectedStars.has(cloud.id) && (
              <Image
                source={require('../../assets/game/star.png')}
                style={styles.cloudStar}
              />
            )}
          </View>
        ))}
        <Animated.Image
          source={require('../../assets/ui/Sun.png')}
          style={[
            styles.sun,
            {
              transform: [
                {translateX: sunPosition.x},
                {translateY: sunPosition.y},
              ],
            },
          ]}
        />
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.jumpButton} onPress={handleJump}>
          <Image
            source={require('../../assets/game/jump.png')}
            style={styles.jumpIcon}
          />
        </TouchableOpacity>
      </View>
      <GoBack />
    </View>
    // </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5C', // Dark blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust for status bar
    paddingBottom: 10,
    zIndex: 1,
  },
  soundButton: {
    width: 44,
    height: 44,
    backgroundColor: '#91203E',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  levelText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFDD56',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scoreText: {
    fontSize: 20,
    color: '#FFDD56',
    marginRight: 8,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  cloudContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  cloud: {
    width: CLOUD_WIDTH,
    height: 60,
    resizeMode: 'contain',
  },
  cloudStar: {
    position: 'absolute',
    top: -STAR_SIZE,
    width: STAR_SIZE,
    height: STAR_SIZE,
    resizeMode: 'contain',
  },
  sun: {
    width: SUN_SIZE,
    height: SUN_SIZE,
    position: 'absolute',
    resizeMode: 'contain',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    // paddingBottom: 20,
  },
  jumpButton: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jumpIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Game;
