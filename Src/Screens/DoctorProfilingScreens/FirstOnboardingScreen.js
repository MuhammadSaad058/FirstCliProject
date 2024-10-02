import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import Images from './Images';
const FirstOnboardScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('SecondOnboardScreen');
  };

  const handleSkip = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.onboarding1} 
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Hassle Free Appointment Booking Facility For Online And In Person Consultation
        </Text>

        {/* Pagination dots */}
        <View style={styles.pagination}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === 0 && styles.firstDot // Apply special style for the first dot
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
    marginTop:30,
    width: 301,
    height: 295,
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
    color: '#003056',
    lineHeight:24.2
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
  firstDot: {
    backgroundColor: '#F86D6D', // Special color for the first dot
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

export default FirstOnboardScreen;
