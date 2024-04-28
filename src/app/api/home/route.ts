import { NextRequest, NextResponse } from 'next/server';
import { runChatFromGeminiStreamResult } from "@/lib/gemini";
import { GenerateContentStreamResult, EnhancedGenerateContentResponse } from "@google/generative-ai";
import { auth } from '@clerk/nextjs/server';
import { ImageDescriptionResponse } from "@/lib/types/responses";

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' //nodejs

const enhancedResponse: EnhancedGenerateContentResponse = {

  text: () => {
    return "";
  },
  functionCall: () => {
    return undefined;
  },
  functionCalls: () => {
    return undefined;
  },

};

export async function POST(request: NextRequest) {


  const formData = await request.formData();
  const file = formData.get('file') as File;
  const lang = formData.get('lang') as string;


  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const base64 = buffer.toString('base64');

  const stream = makeGeminiStreamJSON(fetchGeminiItemsJSON(base64, lang));

  const response = new StreamingResponse(stream, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
  return response;

}

async function* fetchGeminiItemsJSON(base64: string, lang: string): AsyncGenerator<ImageDescriptionResponse, any, unknown> {

  try {

    if (!base64) {
      const error_Response = {error_code: 999999,error_msg: "image is empty"};
      yield error_Response;
      return;
    }

    const stream = await runChatFromGeminiStreamResult(base64, lang) as GenerateContentStreamResult;
    for await (const chunk of stream.stream) {
      const chunkText = chunk.text();
      const imageResponse: ImageDescriptionResponse = { };
      imageResponse.description = chunkText;
      yield imageResponse;
    }
  } catch (error) {
    console.error(error);
    const error_Response = {error_code: 999997,error_msg: error?.toString()};
    yield error_Response;
  }

}


const makeGeminiStreamJSON = <T extends Record<string, unknown>>(generator: AsyncGenerator<ImageDescriptionResponse, any, unknown>) => {

  const encoder = new TextEncoder();
  return new ReadableStream<any>({
    async start(controller) {
      controller.enqueue(encoder.encode(""));
      for await (let chunk of generator) {
        const chunkData = encoder.encode(JSON.stringify(chunk));
        controller.enqueue(chunkData);
      }
      controller.close();
    }
  });
}

class StreamingResponse extends Response {

  constructor(res: ReadableStream<any>, init?: ResponseInit) {
    super(res as any, {
      ...init,
      status: 200,
      headers: {
        ...init?.headers,
      },
    });
  }
}