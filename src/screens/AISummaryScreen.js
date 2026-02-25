import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../utils/constants';

export default function AISummaryScreen({ navigation, route }) {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 返回提示 */}
        <View style={styles.hint}>
          <Text style={styles.hintText}>👈 点击左上角返回</Text>
        </View>

        {/* AI 总结标题 */}
        <Text style={styles.sectionTitle}>💡 AI 总结</Text>

        {/* 总结内容 */}
        <View style={styles.summaryContent}>
          <Text style={styles.summaryText}>
            {article.aiSummary || '暂无总结'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  hint: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  hintText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  summaryContent: {
    backgroundColor: '#FFF9E6',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE4B5',
  },
  summaryText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 28,
  },
});
