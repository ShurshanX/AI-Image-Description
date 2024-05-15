import { kv } from '@vercel/kv';



export function setKeyWithExpiry(key: string, value: string, expirySeconds: number) {
    const expiryTimestamp = Date.now() + (expirySeconds * 1000);

    kv.set(key, value, { px: expiryTimestamp });
}


export function getKey(key: string) {
    return kv.get<string>(key);
}

export function deleteKey(key: string) {
     kv.del(key);
}

