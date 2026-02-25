import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { FIREBASE_CONFIG } from '../utils/constants';

// 初始化 Firebase
const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);
const auth = getAuth(app);

// 文章相关
export const getArticles = (callback) => {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(articles);
  });
};

export const addArticle = async (url) => {
  // 自动识别平台
  const platform = detectPlatform(url);
  
  // 添加到 Firestore
  const docRef = await addDoc(collection(db, 'articles'), {
    url,
    originalUrl: url,
    platform,
    title: '正在获取...',  // 后端会抓取并生成标题
    content: '',          // 后端会抓取正文
    aiSummary: '',        // 后端会生成 AI 总结
    createdAt: new Date(),
    status: 'processing', // 处理中
  });

  // TODO: 触发 Cloud Function 进行抓取和 AI 总结
  // 这个需要在 Firebase Cloud Functions 中实现

  return docRef.id;
};

export const detectPlatform = (url) => {
  if (url.includes('mp.weixin.qq.com')) return 'wechat';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'x';
  if (url.includes('youtube.com')) return 'youtube';
  if (url.includes('substack.com')) return 'substack';
  return 'link';
};

// 登录相关
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return auth.signOut();
};

export { auth };
