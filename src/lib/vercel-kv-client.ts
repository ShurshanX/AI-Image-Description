import 'server-only'
import { kv } from '@vercel/kv';

export function setKeyWithExpiry(key: string, value: string, expirySeconds: number) {
    const expiryTimestamp = expirySeconds * 1000;

    //ex seconds px milliseconds 
    kv.set(key, value, { px: expiryTimestamp,nx: true });
}


export function getKey(key: string) {
    return kv.get<string>(key);
}

export function deleteKey(key: string) {
     kv.del(key);
}
