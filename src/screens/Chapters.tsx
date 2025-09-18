import { RouteProp, useNavigation } from '@react-navigation/native';
import { FC, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ChaptersProps {
  route: RouteProp<RootStackParamList, 'Chapters'>;
}

const Chapters: FC<ChaptersProps> = ({ route }) => {
  const topic = route.params.topic;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      title: topic.topic,
      headerTitleAlign: 'center',
    });
  }, [navigation, topic.topic]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {topic.chapters.map(({ chapter, narration, questions }, index) => (
          <View style={{ paddingHorizontal: 16 }} key={index}>
            <Card
              title={chapter}
              description={narration}
              meta={
                <View
                  style={{
                    marginTop: 12,
                    paddingTop: 16,
                    borderTopWidth: 0.5,
                    borderTopColor: '#cccccc',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.metaContainer}>
                    <Text style={{ fontSize: 20 }}>📔</Text>
                    <Text style={styles.meta}>
                      Selesaikan {questions.length} pertanyaan
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={30} color="#333" />
                </View>
              }
              onPress={() =>
                navigation.navigate('Questions', {
                  chapterTitle: chapter,
                  questions,
                })
              }
            />
          </View>
        ))}
      </ScrollView>

      <Button
        title="Info"
        onPress={() => {
          console.log(123);
        }}
      />

      {/* <Text style={styles.description}>{topic.description}</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    color: '#334155',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 16,
  },
  metaContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 6,
  },
  meta: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '500',
  },
});

export default Chapters;
