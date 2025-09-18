import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface AnimatedButtonProps {
  onPress?: () => void;
  text?: string;
}

const AnimatedButton: FC<AnimatedButtonProps> = ({ onPress, text }) => {
  const scale = useSharedValue<number>(1);
  // const rotation = useSharedValue<number>(0); // Rotation value

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        // { rotateZ: `${rotation.value}rad` }, // Apply rotation
      ],
    };
  });

  // Handle button press
  const handlePressIn = () => {
    scale.value = withSpring(0.9); // Shrink effect
    // rotation.value = withSpring(Math.PI / 12);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1); // Return to normal size
    // rotation.value = withSpring(0); // Reset rotation
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.buttonText}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
