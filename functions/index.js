// Firebase Cloud Functions 示例
// 需要部署到 Firebase Cloud Functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generativeai');

admin.initializeApp();

// 配置 Google AI（用于生成总结）
const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');

exports.processArticle = functions.firestore
  .document('articles/{articleId}')
  .onCreate(async (snap, context) => {
    const articleData = snap.data();
    const articleId = context.params.articleId;

    try {
      // 1. 抓取网页内容
      const { title, content, imageUrl } = await scrapeUrl(articleData.url);

      // 2. 如果是图片，进行 OCR（需要额外服务）
      let finalContent = content;
      let finalTitle = title;

      if (articleData.platform === 'image' && imageUrl) {
        // TODO: 调用 OCR 服务
        // const ocrText = await performOCR(imageUrl);
        // finalContent = ocrText;
        // finalTitle = await generateTitle(ocrText);
      }

      // 3. 生成 AI 总结
      const aiSummary = await generateSummary(finalContent);

      // 4. 更新 Firestore
      await admin.firestore()
        .collection('articles')
        .doc(articleId)
        .update({
          title: finalTitle,
          content: finalContent,
          imageUrl: articleData.platform === 'image' ? imageUrl : null,
          aiSummary,
          status: 'completed',
          processedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

    } catch (error) {
      console.error('处理文章失败:', error);
      await admin.firestore()
        .collection('articles')
        .doc(articleId)
        .update({
          status: 'failed',
          error: error.message,
        });
    }
  });

// 网页抓取函数
async function scrapeUrl(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  const $ = cheerio.load(response.data);

  // 提取标题
  let title = $('title').text().trim();
  const ogTitle = $('meta[property="og:title"]').attr('content');
  if (ogTitle) title = ogTitle;

  // 提取正文（简化版，实际需要更复杂的处理）
  let content = '';
  $('article p, .content p, main p, #content p').each((i, el) => {
    content += $(el).text().trim() + '\n';
  });

  // 提取图片
  const imageUrl = $('meta[property="og:image"]').attr('content');

  return { title, content: content.trim(), imageUrl };
}

// AI 总结生成函数
async function generateSummary(content) {
  if (!content || content.length < 50) {
    return '内容太少，无法生成总结';
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `请用中文总结以下文章的精华内容，50-100字：

${content.slice(0, 5000)}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

// AI 标题生成函数（用于图片 OCR）
async function generateTitle(ocrText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `请为以下OCR识别的文字生成一个简洁的标题，10-20字：

${ocrText.slice(0, 1000)}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
