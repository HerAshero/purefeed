# Purefeed 🧾

> 我的 All in One 稍后读 App

## 技术栈

- **前端**: React Native + Expo
- **后端**: Firebase Cloud Functions
- **存储**: Firebase Firestore + Storage
- **登录**: 邮箱 + 密码
- **AI**: Google Gemini (生成总结)

## 功能

- [x] 7 种信息来源（微信、X、YouTube、Substack、图片、链接、文字）
- [x] 自动抓取正文
- [x] AI 自动生成总结（保存时生成）
- [x] 平台标签 + 日期显示
- [x] 原文链接跳转
- [x] 图片 OCR + AI 标题

## 快速开始

### 1. 安装依赖

```bash
cd purefeed
npm install
```

### 2. 配置 Firebase

1. 去 [Firebase Console](https://console.firebase.google.com/) 创建项目
2. 启用 Firestore 和 Authentication（邮箱登录）
3. 复制配置到 `src/utils/constants.js`
4. 部署 Cloud Functions：

```bash
cd functions
npm install
firebase deploy --only functions
```

### 3. 运行

```bash
npx expo start
```

用 Expo Go App 扫描二维码即可在手机上运行。

## 项目结构

```
purefeed/
├── App.js                    # 主入口
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # 首页（文章列表）
│   │   ├── ArticleDetailScreen.js  # 文章详情
│   │   └── AISummaryScreen.js # AI 总结页面
│   ├── services/
│   │   └── firebase.js       # Firebase 服务
│   └── utils/
│       └── constants.js     # 常量配置
├── functions/
│   └── index.js              # Cloud Functions（后端）
└── package.json
```

## 待完善

- [ ] 微信登录
- [ ] 分享到 App 的 URL Scheme
- [ ] 离线缓存
- [ ] 深色模式

---

用 ❤️ 和 ☕ 做的
