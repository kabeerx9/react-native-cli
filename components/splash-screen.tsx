import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

export const SplashScreen = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressAnim2 = useRef(new Animated.Value(0)).current;

  // Create spinning animation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Create progress bar animations
  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width / 2, width / 2],
  });

  const progressInterpolate2 = progressAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [-width / 2, width / 2],
  });

  useEffect(() => {
    // Initial fade and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Spinning animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Progress bar animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim2, {
          toValue: 1,
          duration: 1200,
          delay: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim2, {
          toValue: 0,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Main content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Text style={styles.logo}>🚀</Text>
        <Text style={styles.appName}>MyApp</Text>

        {/* Loading spinner */}
        <Animated.View style={[styles.spinner, {transform: [{rotate: spin}]}]}>
          <View style={styles.spinnerInner} />
        </Animated.View>

        <Text style={styles.loadingText}>Loading Discussion Dashboard</Text>

        {/* Progress bars */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progress,
                {transform: [{translateX: progressInterpolate}]},
              ]}
            />
          </View>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progress,
                {transform: [{translateX: progressInterpolate2}]},
              ]}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a365d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  loadingText: {
    color: '#cbd5e0',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4299e1',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  spinnerInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4299e1',
    position: 'absolute',
    top: 6,
    left: 6,
  },
  progressContainer: {
    width: width * 0.7,
    gap: 10,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(203, 213, 224, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#4299e1',
  },
});
