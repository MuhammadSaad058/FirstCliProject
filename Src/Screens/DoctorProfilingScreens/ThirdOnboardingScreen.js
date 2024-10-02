import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton'; // Import CustomButton
import Images from './Images';
const ThirdOnboardScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleSkip = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.onboarding3}
          style={styles.image}
          
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Let's Enjoin Hands In A Better Healthcare Future For Our Community
        </Text>

        <View style={styles.pagination}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === 2 && styles.thirdDot
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={handleNext}
            title="Next"
          />
          <CustomButton
            onPress={handleSkip}
            title="Skip"
            style={styles.skipButton} // Applying the skipButton style
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: 315,
    height: 366,
    resizeMode: 'contain',
  },
  contentContainer: {
    height:370,
    padding: 25,
    backgroundColor: 'white',
    borderTopEndRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: '#003056',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  thirdDot: {
    backgroundColor: '#F86D6D', 
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  skipButton: {
    marginTop: 10,
  },
});

export default ThirdOnboardScreen;
