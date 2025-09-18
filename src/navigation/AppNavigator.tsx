import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Topics from '../screens/Topics';
import { NavigationContainer } from '@react-navigation/native';
import { IQuestion, ITopic } from '../types/topic';
import Chapters from '../screens/Chapters';
import Questions from '../screens/Questions';
import Sample from '../screens/Sample';

export type RootStackParamList = {
  Splash: undefined;
  Topics: undefined;
  Chapters: { topic: ITopic };
  Questions: { chapterTitle: string; questions: IQuestion[] };
  Sample: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Topics"
          component={Topics}
          options={{ headerTitle: 'Daftar Topik' }}
        />
        <Stack.Screen name="Chapters" component={Chapters} />
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={
            {
              // headerBackVisible: false,
            }
          }
        />

        <Stack.Screen name="Sample" component={Sample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
