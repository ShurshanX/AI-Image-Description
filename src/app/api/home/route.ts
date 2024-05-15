import { NextRequest, NextResponse } from 'next/server';
import { runChatFromGeminiStreamResult } from "@/lib/gemini";
import { GenerateContentStreamResult, EnhancedGenerateContentResponse, HarmProbability } from "@google/generative-ai";
import { auth } from '@clerk/nextjs/server';
import { ImageDescriptionResponse } from "@/types/responses";
import { putObject } from '@/lib/s3'

export const dynamic = 'force-dynamic'
export const runtime = 'edge' //nodejs edge 


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

  const format = file.name.split('.').pop() as string;
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  const uniqueFileName = `${timestamp}-${randomNum}.${format}`;

  const isPublic = formData.get('public') as string;

  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const base64 = buffer.toString('base64');

  const stream = makeGeminiStreamJSON(fetchGeminiItemsJSON(base64, lang, buffer, uniqueFileName, isPublic));

  const response = new StreamingResponse(stream, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
  return response;

}

async function* fetchGeminiItemsJSON(base64: string, lang: string, buffer: Buffer, fileName: string, isPublic: string): AsyncGenerator<ImageDescriptionResponse, any, unknown> {

  try {

    if (!base64) {
      const error_Response = { error_code: 999999, error_msg: "image is empty" };
      yield error_Response;
      return;
    }

    // const { userId } = auth();
    // if (!userId) {
    //   const no_Auth_Response = {error_code: 999998,error_msg: "please login ImageAI.QA"};
    //   yield no_Auth_Response;
    //   return;
    // }

    let description = '';
    let keys = '';
    let foundDelimiter = false;
    let chunkText;
    const stream = await runChatFromGeminiStreamResult(base64, lang) as GenerateContentStreamResult;
    for await (const chunk of stream.stream) {
      chunkText = chunk.text();
      //console.log(chunk);
      for (const candidate of chunk.candidates ?? []) {
        for (const safetyRating of candidate.safetyRatings ?? []) {
          if (safetyRating.probability === HarmProbability.MEDIUM || safetyRating.probability === HarmProbability.HIGH) {
            //console.log(safetyRating);
            const error_Response = {
              error_code: 999996,
              error_msg: `I cannot generate a response. Let's keep our conversation polite and respectful.`,
            };
            yield error_Response;
            return;
          }
        }
      }

      description += chunkText;
      if (!foundDelimiter && findContentEnd(description) !== null) {
        foundDelimiter = true;
        const parts = description.split('|');
        if (parts.length == 3) {
          keys = parts[1];
          description = parts[2];
          chunkText = description;
        }
      }
      if (foundDelimiter) {
        const imageResponse: ImageDescriptionResponse = {};
        imageResponse.description = chunkText;
        yield imageResponse;
      }

    }



    if (isPublic) {
      
      if (description.length > 50) {
        const etag = await putObject(buffer, fileName);
        }
      }

  } catch (error) {
    console.error(error);
    const error_Response = { error_code: 999997, error_msg: error?.toString() };
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


function findContentEnd(buffer: string): number | null {
  const stack = [];
  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];
    if (stack.length == 0 && char === '|') {
      stack.push(char);
    } else if (char === '|' && stack.length > 0 && stack[stack.length - 1] === '|') {
      stack.pop();
    }
    if (stack.length === 0) {
      return i;
    }
  }
  return null;
}