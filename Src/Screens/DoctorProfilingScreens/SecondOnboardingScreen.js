import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import Images from './Images';
const SecondOnboardScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('ThirdOnboardScreen');
  };

  const handleSkip = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.onboarding2} 
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          AI Based Support For Medical Diagnosis And Medical Prognosis
        </Text>

        {/* Pagination dots */}
        <View style={styles.pagination}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === 1 && styles.secondDot // Apply special style for the second dot
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
            style={styles.skipButton}
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
    width: 349,
    height: 349,
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
    color: '#003056'
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
  secondDot: {
    backgroundColor: '#F86D6D', // Special color for the second dot
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

export default SecondOnboardScreen;
