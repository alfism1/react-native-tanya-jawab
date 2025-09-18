import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import sejarahIndonesiaData from '../configs/sejarah-indonesia.json';
import { ITopic } from '../types/topic';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const sejarahIndonesia: ITopic = sejarahIndonesiaData as ITopic;

const PRIMARY_COLOR = '#2563eb';

const Topics = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>Pilih topik favoritmu!</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* TODO: Update with actual data */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => (
            <View style={{ paddingHorizontal: 16 }} key={index}>
              <Card
                title={`${sejarahIndonesia.topic} - ${index + 1}`}
                description={sejarahIndonesia.description}
                meta={
                  <Text style={styles.meta}>
                    {sejarahIndonesia.chapters.length} Bab
                  </Text>
                }
                onPress={() =>
                  navigation.navigate('Chapters', { topic: sejarahIndonesia })
                }
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Topics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  background: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: PRIMARY_COLOR,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 4,
  },
  meta: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '500',
  },
});
