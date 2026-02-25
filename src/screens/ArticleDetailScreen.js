import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import { COLORS, PLATFORM_TAGS } from '../utils/constants';

export default function ArticleDetailScreen({ navigation, route }) {
  const { article } = route.params;
  const platform = PLATFORM_TAGS[article.platform] || PLATFORM_TAGS.link;
  const date = new Date(article.createdAt).toLocaleDateString('zh-CN');

  const handleOpenOriginal = () => {
    if (article.originalUrl) {
      Linking.openURL(article.originalUrl);
    }
  };

  const handleShowSummary = () => {
    if (article.aiSummary) {
      navigation.navigate('AISummary', { article });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 巨大标题 */}
        <Text style={styles.title}>{article.title}</Text>

        {/* 平台标签 + 日期 */}
        <View style={styles.metaContainer}>
          <View style={[styles.platformTag, { backgroundColor: platform.color }]}>
            <Text style={styles.platformTagText}>{platform.label}</Text>
          </View>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        {/* AI 总结按钮 */}
        {article.aiSummary && (
          <TouchableOpacity
            style={styles.summaryButton}
            onPress={handleShowSummary}
          >
            <Text style={styles.summaryButtonText}>💡 查看 AI 总结</Text>
          </TouchableOpacity>
        )}

        {/* 原文内容 */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentLabel}>原文内容</Text>
          <Text style={styles.content}>
            {article.content || '暂无内容'}
          </Text>
        </View>

        {/* 原文链接 */}
        {article.originalUrl && (
          <TouchableOpacity
            style={styles.originalLinkButton}
            onPress={handleOpenOriginal}
          >
            <Text style={styles.originalLinkText}>
              🔗 查看原文
            </Text>
          </TouchableOpacity>
        )}

        {/* 图片内容（如果有） */}
        {article.imageUrl && (
          <View style={styles.imageContainer}>
            <Text style={styles.contentLabel}>原图</Text>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>图片：{article.imageUrl}</Text>
            </View>
          </View>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 36,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  platformTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  platformTagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryButton: {
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4B5',
  },
  summaryButtonText: {
    color: '#D4A017',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    marginBottom: 20,
  },
  contentLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 26,
  },
  originalLinkButton: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  originalLinkText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: '#F8F8F8',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: COLORS.textSecondary,
  },
});
