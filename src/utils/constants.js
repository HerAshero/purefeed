// 颜色配置
export const COLORS = {
  background: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E5E5E5',
  tag: {
    wechat: '#07C160',
    x: '#000000',
    youtube: '#FF0000',
    substack: '#FF691F',
    image: '#9B59B6',
    link: '#3498DB',
    text: '#95A5A6',
  },
};

// 平台标签配置
export const PLATFORM_TAGS = {
  wechat: { label: '微信', color: COLORS.tag.wechat },
  x: { label: 'X', color: COLORS.tag.x },
  youtube: { label: 'YouTube', color: COLORS.tag.youtube },
  substack: { label: 'Substack', color: COLORS.tag.substack },
  image: { label: '图片', color: COLORS.tag.image },
  link: { label: '链接', color: COLORS.tag.link },
  text: { label: '文字', color: COLORS.tag.text },
};

// Firebase 配置
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAYnfsr7KY47Av_cv6O0TRk5a4mDlsDlX0",
  authDomain: "purefeed-ffc48.firebaseapp.com",
  projectId: "purefeed-ffc48",
  storageBucket: "purefeed-ffc48.firebasestorage.app",
  messagingSenderId: "276045236909",
  appId: "1:276045236909:web:8706fb258072d9cee35424"
};
