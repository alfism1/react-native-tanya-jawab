import { FC, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface CardProps {
  title: string;
  description: string;
  meta: ReactNode;
  onPress?: () => void;
}

const Card: FC<CardProps> = ({ title, description, meta, onPress }) => {
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
    scale.value = withSpring(0.97); // Shrink effect
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
      style={styles.container}
    >
      <Animated.View style={[animatedStyle, styles.animatedContainer]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.meta}>{meta}</View>
      </Animated.View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  animatedContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
  meta: {
    marginTop: 8,
  },
});
