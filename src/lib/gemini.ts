import 'server-only'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerateContentStreamResult} from "@google/generative-ai";
import GoogleGenerativeAIError from "@google/generative-ai";
import { Response } from "../types/responses";
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY as string;

const IMAGE_AI_REBOT = {
  role: "user",
  parts: [{ text: `作为图像解读专家，你需要对上传的图片进行深入分析，挖掘其中的创作背景、情感表达、作品背后的故事和寓意。你需要运用图像识别、情感分析和自然语言生成等技术，将图片的复杂信息转化为文字描述，帮助用户理解和欣赏图像。\n\n\n# 角色任务\n作为图像解读专家，你的任务是对用户上传的图片进行深入分析，解读图像中的创作背景、情感以及作品背后的故事与寓意。你需要运用图像识别技术和深厚的文化素养，将图片中的信息转化为简洁、有见地的文字描述。\n\n# 工具能力\n\n1. 图像识别与分析\n你需要具备强大的图像识别能力，能够分析图片的色调、构图、元素等，理解其背后的深层含义。\n2. 文化背景知识\n对于图片中的创作背景和寓意，你需要有广泛的文化背景知识来进行解读。\n3. 简洁的文字描述能力\n将分析结果转化为文字描述，要求文字描述简洁、准确，不超过500字。\n\n# 要求与限制\n\n1. 准确性\n你的解读必须准确，避免误导用户。\n2. 简洁性\n文字描述要求简洁明了，避免冗长和复杂的句子。\n3. 500字以内的限制\n确保你的文字描述不超过500字，精准传达图片背后的故事与寓意。\n4. 避免主观臆测\n在解读过程中，尽量避免过于主观的猜测，确保你的分析基于图像本身和文化背景。\n5. 支持多种语言解读\n解读结果支持英语、中文、法语、德语、西拔牙语、日本语、韩语。\n6.图像中提取的关键词在开始位置出现，并用竖线 (|) 与正文分割，多个关键词用逗号 (,) 隔开，例如：|关键词1,关键词2,关键词3|\n\n正文内容` }]
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  }
];

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const MODEL_PARAMs = {
  model: MODEL_NAME,
  safetySettings,
  generationConfig,
  systemInstruction: IMAGE_AI_REBOT
};

const REQUEST_OPTIONS = {
  apiVersion: "v1beta"
}

export async function runChatFromGemini(base64Image: string, lang: string = "en") {

  const responseGemini: Response = {};
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel(MODEL_PARAMs, REQUEST_OPTIONS);

    const prompt = lang;
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };

    const result = await model.generateContent([prompt, image]);
    responseGemini.result = result.response.text();
    //console.log(response.text());
  } catch (error) {
    responseGemini.error_code = 999999;
    responseGemini.error_msg = error as string;
    console.error(error);
  }
  return responseGemini;
}


export async function runChatFromGeminiStreamResult(base64Image: string, lang: string = "en") {

  try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel(MODEL_PARAMs, REQUEST_OPTIONS);

      const prompt = lang;
      const image = {
        inlineData: {
          data: base64Image,
          mimeType: "image/png",
        },
      };
      return await model.generateContentStream([prompt, image]);
  } catch (error) {
    console.error(error);
  }

}


