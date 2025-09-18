import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Sample = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      id: 1,
      title: 'Sejarah Indonesia - 1',
      description:
        'Kuis ini menguji pengetahuan tentang sejarah Indonesia, mulai dari kerajaan-kerajaan kuno, masa penjajahan, pergerakan nasional, hingga proklamasi kemerdekaan dan masa Orde Lama serta Orde Baru.',
      chapters: 6,
      difficulty: 'Pemula',
      estimatedTime: '15 menit',
      colors: ['#3B82F6', '#1D4ED8'],
      image:
        'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=200&fit=crop&crop=center',
      icon: 'school',
    },
    {
      id: 2,
      title: 'Sejarah Indonesia - 2',
      description:
        'Kuis ini menguji pengetahuan tentang sejarah Indonesia, mulai dari kerajaan-kerajaan kuno, masa penjajahan, pergerakan nasional, hingga proklamasi kemerdekaan dan masa Orde Lama serta Orde Baru.',
      chapters: 6,
      difficulty: 'Menengah',
      estimatedTime: '20 menit',
      colors: ['#10B981', '#059669'],
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&crop=center',
      icon: 'history',
    },
    {
      id: 3,
      title: 'Sejarah Indonesia - 3',
      description:
        'Kuis ini menguji pengetahuan tentang sejarah Indonesia, mulai dari kerajaan-kerajaan kuno, masa penjajahan, pergerakan nasional, hingga proklamasi kemerdekaan dan masa Orde Lama serta Orde Baru.',
      chapters: 6,
      difficulty: 'Lanjutan',
      estimatedTime: '25 menit',
      colors: ['#8B5CF6', '#7C3AED'],
      image:
        'https://images.unsplash.com/photo-1591696431189-6e7d7cbede8e?w=400&h=200&fit=crop&crop=center',
      icon: 'account-balance',
    },
    {
      id: 4,
      title: 'Sejarah Indonesia - 4',
      description:
        'Kuis ini menguji pengetahuan tentang sejarah Indonesia, mulai dari kerajaan-kerajaan kuno, masa penjajahan, pergerakan nasional, hingga proklamasi kemerdekaan dan masa Orde Lama serta Orde Baru.',
      chapters: 6,
      difficulty: 'Ahli',
      estimatedTime: '30 menit',
      colors: ['#F59E0B', '#D97706'],
      image:
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=200&fit=crop&crop=center',
      icon: 'star',
    },
    {
      id: 5,
      title: 'Sejarah Indonesia - 5',
      description:
        'Kuis ini menguji pengetahuan tentang sejarah Indonesia, mulai dari kerajaan-kerajaan kuno, masa penjajahan, pergerakan nasional, hingga proklamasi kemerdekaan dan masa Orde Lama serta Orde Baru.',
      chapters: 6,
      difficulty: 'Master',
      estimatedTime: '35 menit',
      colors: ['#EF4444', '#DC2626'],
      image:
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=200&fit=crop&crop=center',
      icon: 'emoji-events',
    },
  ];

  const getDifficultyStyle = difficulty => {
    switch (difficulty) {
      case 'Pemula':
        return { backgroundColor: '#DCFCE7', color: '#166534' };
      case 'Menengah':
        return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
      case 'Lanjutan':
        return { backgroundColor: '#E9D5FF', color: '#7C2D12' };
      case 'Ahli':
        return { backgroundColor: '#FED7AA', color: '#9A3412' };
      case 'Master':
        return { backgroundColor: '#FECACA', color: '#991B1B' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#374151' };
    }
  };

  const getDifficultyIcon = difficulty => {
    switch (difficulty) {
      case 'Pemula':
        return 'keyboard-arrow-up';
      case 'Menengah':
        return 'trending-up';
      case 'Lanjutan':
        return 'show-chart';
      case 'Ahli':
        return 'whatshot';
      case 'Master':
        return 'emoji-events';
      default:
        return 'help';
    }
  };

  const renderTopicCard = topic => (
    <TouchableOpacity
      key={topic.id}
      style={styles.topicCard}
      activeOpacity={0.7}
      onPress={() => setSelectedTopic(topic.id)}
    >
      {/* Card Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: topic.image }}
          style={styles.topicImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <MaterialIcons
            name={topic.icon}
            size={24}
            color="white"
            style={styles.topicIcon}
          />
          <View
            style={[styles.topicNumber, { backgroundColor: topic.colors[0] }]}
          >
            <Text style={styles.topicNumberText}>{topic.id}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardContent}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <View
              style={[
                styles.colorIndicator,
                { backgroundColor: topic.colors[0] },
              ]}
            />
            <Text style={styles.topicTitle}>{topic.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>

        {/* Badges */}
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, getDifficultyStyle(topic.difficulty)]}>
            <MaterialIcons
              name={getDifficultyIcon(topic.difficulty)}
              size={12}
              color={getDifficultyStyle(topic.difficulty).color}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.badgeText,
                { color: getDifficultyStyle(topic.difficulty).color },
              ]}
            >
              {topic.difficulty}
            </Text>
          </View>
          <View style={styles.timeBadge}>
            <MaterialIcons
              name="access-time"
              size={12}
              color="#6B7280"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.timeBadgeText}>{topic.estimatedTime}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{topic.description}</Text>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.chaptersInfo}>
            <MaterialIcons
              name="menu-book"
              size={16}
              color="#6B7280"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.chaptersText}>{topic.chapters} Bab</Text>
          </View>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingText}>4.{topic.id + 3}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.random() * 100}%`,
                  backgroundColor: topic.colors[0],
                },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Daftar Topik</Text>
            <Text style={styles.headerSubtitle}>Pilih level yang sesuai</Text>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.heroImageContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=300&fit=crop&crop=center',
                }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.heroOverlay}>
                <View style={styles.quizBadge}>
                  <MaterialIcons
                    name="quiz"
                    size={16}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.quizBadgeText}>
                    Quiz Sejarah Indonesia
                  </Text>
                </View>
                <Text style={styles.mainTitle}>Pilih topik favoritmu!</Text>
                <Text style={styles.subtitle}>
                  Uji pengetahuanmu tentang sejarah Indonesia
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <MaterialIcons name="quiz" size={24} color="#3B82F6" />
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Quiz</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="menu-book" size={24} color="#10B981" />
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Bab</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="people" size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>1.2k</Text>
              <Text style={styles.statLabel}>Siswa</Text>
            </View>
          </View>

          {/* Topics */}
          <View style={styles.topicsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pilih Level Kuis</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            {topics.map(renderTopicCard)}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=100&fit=crop&crop=center',
              }}
              style={styles.footerFlag}
            />
            <Text style={styles.footerText}>
              Selesaikan semua level untuk menjadi ahli sejarah Indonesia!
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  background: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  heroImageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quizBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  topicsContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    position: 'relative',
  },
  topicImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  topicIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  topicNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBadgeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 12,
  },
  chaptersInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chaptersText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerFlag: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Sample;
