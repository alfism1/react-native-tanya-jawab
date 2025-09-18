import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import tw from 'twrnc';

type SplashProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const Splash: React.FC<SplashProps> = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={tw.style('h-1/2', { aspectRatio: 1 })}
      />

      <Text style={tw`text-2xl text-center mb-10 mt-4`}>Instructions</Text>

      <View
        style={tw`bg-purple-500 p-2 rounded h-30 w-80 items-center justify-center`}
      >
        <Text style={tw`text-white text-lg`}>
          Each Quiz Has Four Options Quiz
        </Text>
        <Text style={tw`text-white text-lg`}>
          Progress Will be Shown At Top
        </Text>
        <Text style={tw`text-white text-lg`}>
          Score Would Be Shown At The End
        </Text>
      </View>

      <Pressable
        style={tw`bg-purple-500 mt-10 px-6 py-1  rounded`}
        onPress={() => navigation.navigate('Topics')}
      >
        <Text style={tw`text-white text-lg`}>Start</Text>
      </Pressable>

      <Pressable
        style={tw`bg-purple-500 mt-10 px-6 py-1  rounded`}
        onPress={() => navigation.navigate('Sample')}
      >
        <Text style={tw`text-white text-lg`}>Sample</Text>
      </Pressable>
    </View>
  );
};

export default Splash;
