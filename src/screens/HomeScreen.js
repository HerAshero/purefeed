import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS, PLATFORM_TAGS } from '../utils/constants';
import { getArticles, addArticle } from '../services/firebase';

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    // 加载文章列表
    const unsubscribe = getArticles((data) => {
      setArticles(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddArticle = async () => {
    if (!newUrl.trim()) {
      Alert.alert('提示', '请输入链接');
      return;
    }
    
    try {
      await addArticle(newUrl.trim());
      setNewUrl('');
      setModalVisible(false);
      Alert.alert('成功', '文章已保存，正在自动总结...');
    } catch (error) {
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  const renderArticle = ({ item }) => {
    const platform = PLATFORM_TAGS[item.platform] || PLATFORM_TAGS.link;
    const date = new Date(item.createdAt).toLocaleDateString('zh-CN');

    return (
      <TouchableOpacity
        style={styles.articleCard}
        onPress={() => navigation.navigate('ArticleDetail', { article: item })}
      >
        <Text style={styles.articleTitle}>{item.title}</Text>
        <View style={styles.articleMeta}>
          <View style={[styles.platformTag, { backgroundColor: platform.color }]}>
            <Text style={styles.platformTagText}>{platform.label}</Text>
          </View>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>还没有文章</Text>
            <Text style={styles.emptySubtext}>点击下方 + 按钮添加第一篇文章</Text>
          </View>
        }
      />

      {/* 悬浮添加按钮 */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* 添加文章弹窗 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>添加文章</Text>
            <TextInput
              style={styles.urlInput}
              placeholder="粘贴链接到这里..."
              value={newUrl}
              onChangeText={setNewUrl}
              autoCapitalize="none"
              autoCorrect={false}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setNewUrl('');
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddArticle}
              >
                <Text style={styles.confirmButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  articleCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  platformTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  platformTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.tag.wechat,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  urlInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: COLORS.tag.wechat,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
