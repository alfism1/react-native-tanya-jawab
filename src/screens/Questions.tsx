/* eslint-disable react-native/no-inline-styles */
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { shuffleArray } from '../lib/utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface QuestionsProps {
  route: RouteProp<RootStackParamList, 'Questions'>;
}

type AnsweredIndex = { index: number; isCorrect: boolean };

const PRIMARY_COLOR = '#2563eb'; // bold blue
const CARD_BG = '#fff';
const CARD_RADIUS = 16;
const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 4,
};

const Questions: FC<QuestionsProps> = ({ route }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredIndexes, setAnsweredIndexes] = useState<AnsweredIndex[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.chapterTitle,
      headerTitleAlign: 'center',
    });
  }, [navigation, route.params.chapterTitle]);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [activeIndex]);

  const questions = route.params.questions;

  const shuffledQuestions = useMemo(() => {
    return shuffleArray([...questions]).map(q => {
      const shuffledOptions = shuffleArray([...q.options]);

      return {
        ...q,
        options: shuffledOptions,
        answer: q.answer, // still works if answer is value-based, not index-based
      };
    });
  }, [questions]);

  const handleBack = () => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(prev + 1, shuffledQuestions.length - 1));
  };

  const handleGetFinalScore = () => {
    const correctAnswerCount = answeredIndexes.filter(
      answer => answer.isCorrect,
    ).length;
    const finalScore = (correctAnswerCount / shuffledQuestions.length) * 10;

    return Alert.alert(
      'Skor anda',
      `${correctAnswerCount} / ${shuffledQuestions.length} = ${finalScore}`,
    );
  };

  const currentQuestion = shuffledQuestions[activeIndex];

  const checkIsAnswered =
    answeredIndexes.find(
      answeredIndex => answeredIndex.index === activeIndex,
    ) !== undefined;

  const isAllAnswered = () =>
    answeredIndexes.length === shuffledQuestions.length;

  const submitAnswer = useCallback(() => {
    if (!selectedAnswer) {
      return Alert.alert('Anda belum memilih jawaban.');
    }

    if (checkIsAnswered) {
      return Alert.alert('Jawaban sudah dikunci dan tidak bisa diubah.');
    }

    let answer = false;
    if (selectedAnswer === currentQuestion.answer) {
      answer = true;
    }

    setAnsweredIndexes(prev => [
      ...prev,
      { index: activeIndex, isCorrect: answer },
    ]);
  }, [activeIndex, checkIsAnswered, currentQuestion.answer, selectedAnswer]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginBottom: 16,
          }}
        >
          {Array.from({ length: shuffledQuestions.length }, (_, i) => {
            const answered = answeredIndexes.find(data => data.index === i);
            const isCorrect = answered && answered?.isCorrect;
            const isWrong = answered && !answered?.isCorrect;
            return (
              <Pressable
                key={i}
                style={[
                  styles.dot,
                  activeIndex === i && styles.dotActive,
                  isCorrect && styles.dotCorrect,
                  isWrong && styles.dotWrong,
                ]}
                onPress={() => setActiveIndex(i)}
              />
            );
          })}
        </View>

        <ScrollView style={{ flexGrow: 1 }}>
          <Text style={styles.question}>{currentQuestion.question}</Text>

          <View style={styles.optionsWrapper}>
            {currentQuestion.options.map((option, i) => {
              const answered = answeredIndexes.find(
                data => data.index === activeIndex,
              );
              const isSelected = !checkIsAnswered && selectedAnswer === option;
              const isCorrect =
                checkIsAnswered &&
                answered?.isCorrect &&
                currentQuestion.answer === option;
              const isWrong =
                checkIsAnswered &&
                !answered?.isCorrect &&
                currentQuestion.answer === option;
              return (
                <Pressable
                  key={i}
                  style={[
                    styles.option,
                    isSelected && styles.selectedOption,
                    isCorrect && styles.correctAnswer,
                    isWrong && styles.wrongAnswer,
                  ]}
                  onPress={() => setSelectedAnswer(option)}
                  disabled={checkIsAnswered}
                >
                  <Text
                    style={[
                      { fontSize: 16 },
                      (isCorrect || isWrong) && { color: 'white' },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                styles.actionButton,
                styles.backButton,
                pressed && styles.buttonPressed,
                activeIndex <= 0 && styles.buttonDisabled,
              ]}
              disabled={activeIndex <= 0}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>Kembali</Text>
            </Pressable>
            <Pressable
              onPress={checkIsAnswered ? handleNext : submitAnswer}
              style={({ pressed }) => [
                styles.actionButton,
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>{checkIsAnswered ? 'Selanjutnya' : 'Jawab'}</Text>
            </Pressable>
          </View>

          {isAllAnswered() && (
            <View style={styles.secondaryButtonGroup}>
              <Pressable
                onPress={handleGetFinalScore}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={[styles.buttonText, styles.backButtonText]}>Hitung Skor</Text>
              </Pressable>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={[styles.buttonText, styles.backButtonText]}>Coba lagi</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsWrapper: {
    marginTop: 8,
    gap: 12,
  },
  option: {
    backgroundColor: CARD_BG,
    borderRadius: CARD_RADIUS,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
    ...CARD_SHADOW,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: '#e0e7ff',
  },
  correctAnswer: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  wrongAnswer: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d5db',
    ...CARD_SHADOW,
  },
  primaryButton: {
    backgroundColor: PRIMARY_COLOR,
    // shadowOpacity: 0.12,
    shadowRadius: 10,
    // elevation: 6,
  },
  backButton: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  backButtonText: {
    color: '#222',
  },
  primaryButtonText: {
    color: '#fff',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  secondaryButtonGroup: {
    marginTop: 24,
    gap: 14,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d5db',
    ...CARD_SHADOW,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dotActive: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: '#dbeafe',
  },
  dotCorrect: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  dotWrong: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
});
