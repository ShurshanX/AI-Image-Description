import 'server-only'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerateContentStreamResult} from "@google/generative-ai";
import { Response } from "./types/responses";
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY as string;

const IMAGE_AI_REBOT = {
  role: "user",
  parts: [{ text: "作为图像解读专家，你需要对上传的图片进行深入分析。要求文字描述简洁、准确、流畅，并能够反映图片背后的创作背景和情感表达。" }]
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
  },
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


