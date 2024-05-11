import 'server-only'
import { Response } from "./types/responses";
const AK = process.env.BAIDU_TRANSLATE_API_KEY;
const SK = process.env.BAIDU_TRANSLATE_SECRET_KEY;

const ACCESS_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK

const TOKEN_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

const IMAGE2TXT_HEADERS = {
    'Content-Type': 'application/json'
}
const PROMPT = "解读图像中的创作背景、情感以及作品背后的故事与寓意，将图片中的信息转化为简洁、有见地的文字描述。英文返回"
const BASE_IMAGE2TXT_URL = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/image2text/fuyu_8b?access_token='
let LAST_TIME = 0;
let ACCESS_TOKEN = ''
const ACCESS_TOKEN_EXPIRES = 2592000;


async function getAccessToken() {
    let _access_token = ''
    try {
        const response = await fetch(ACCESS_TOKEN_URL, {
            method: 'POST',
            headers: TOKEN_HEADERS
        });
        const result = await response.json();
        //console.log("result", result);
        if (result && result.error) {
            throw new Error(result.error_description);
        }
        if (result.access_token) {
            _access_token = result.access_token;
        }
    } catch (error) {
        console.error(error);
    }
    return _access_token;
}




export async function runChatFromBaidu(base64:string) {

    
    const responseBaidu: Response = {};
    try {
        const currentTimeSec = Math.floor(Date.now() / 1000);
        if (ACCESS_TOKEN === '' || LAST_TIME === 0 || (currentTimeSec - LAST_TIME) > ACCESS_TOKEN_EXPIRES) {
            LAST_TIME = currentTimeSec;
            ACCESS_TOKEN = await getAccessToken();
        }

        const IMAGE2TXT_URL = BASE_IMAGE2TXT_URL + ACCESS_TOKEN;
        const response = await fetch( IMAGE2TXT_URL, {
            method: 'POST',
            headers: IMAGE2TXT_HEADERS,
            body: JSON.stringify({
                "prompt": PROMPT,
                'image': base64,
            })

        });

        const result = await response.json();
        if(result.error_code){
            responseBaidu.error_code = result.error_code;
            responseBaidu.error_msg = result.error_msg;
        }else{
            responseBaidu.result = result.result;
        }
       
        //console.log("payload", content);
    } catch (error) {
        responseBaidu.error_code = 999999;
        responseBaidu.error_msg = error as string;
        //console.error(error);
    }
    return responseBaidu;
}
