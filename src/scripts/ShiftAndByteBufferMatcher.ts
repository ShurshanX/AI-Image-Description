class ShiftAndByteBufferMatcher {
    private endMask: number;
    private currentMask: number = 0;
    private buffer: Uint8Array = new Uint8Array(0);
    constructor(endChar: string = '}') {
        this.endMask = 1 << endChar.charCodeAt(0);
    }

    public async *processStreamingData(dataStream: AsyncIterableIterator<Uint8Array>): AsyncIterableIterator<any> {
        const decoder = new TextDecoder('utf-8');
        for await (const chunk of dataStream) {
            // Append the received chunk to the buffer
            this.buffer = this.concatArrays(this.buffer, chunk);

            let completeMaskIndex: number | null = null;
            while ((completeMaskIndex = this.findEndMask(this.buffer)) !== null) {
                const endPosition = completeMaskIndex + 1;
                const dataBytes = this.buffer.slice(0, endPosition);
                this.buffer = this.buffer.slice(endPosition); // Remove parsed data
                const completeData = decoder.decode(dataBytes);
                //console.log('found data:', completeData);
                yield completeData; // Yield the complete data
            }
        }
    }

    private concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
        const totalLength = a.length + b.length;
        const result = new Uint8Array(totalLength);
        result.set(a);
        result.set(b, a.length);
        return result;
    }

    private findEndMask(chunk: Uint8Array): number | null {
        for (let i = chunk.length - 1; i >= 0; i--) {
            const byte = chunk[i];
            //check if it is a single byte character or the start of a multibyte character
            if ((byte & 0x80) === 0 || (byte & 0xC0) === 0xC0) {
                const currentMask = 1 << byte;
                if ((currentMask & this.endMask) !== 0) {
                    return i; // find end mask  '}'
                }
            }
        }
        return null; // not found
    }
}

export default ShiftAndByteBufferMatcher;
