import 'server-only'
import { S3Client, 
    CreateBucketCommand,
    ListBucketsCommand,
    ListObjectsCommand,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
 } from "@aws-sdk/client-s3";

 
 const ACCOUNT_ID = process.env.CF_R2_ACCOUNT_ID as string;

 const ACCESS_KEY_ID = process.env.CF_R2_ACCESS_KEY_ID as string;

 const SECRET_ACCESS_KEY = process.env.CF_R2_SECRET_ACCESS_KEY as string;

 const BUCKET_NAME = process.env.CF_R2_BUCKET_NAME as string;

 const config ={
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  }

  const client = new S3Client(config);

  export async function putObject(data: Buffer,Key: string) {
    
    const input = { // PutObjectRequest
      Body: data, // see \@smithy/types -> StreamingBlobPayloadInputTypes
      Bucket: BUCKET_NAME, // required
      Key: Key, // required
      ContentType: 'image/jpeg'
    };
    
    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    //console.log(response);
    return response.ETag;
  }

// export function listBuckets() {
//   const client = new S3Client(config);
//   return client.send(new ListBucketsCommand({}));
// }

// export function createBucket() {
//   const client = new S3Client({});
//   return client.send(new CreateBucketCommand({}));
// }

// export function deleteBucket() {
//   const client = new S3Client({});
//   return client.send(new ListBucketsCommand({}));
// }

// export function getObject() {
//   const client = new S3Client({});
//   return client.send(new GetObjectCommand({}));
// }

export async function deleteObject(key:string) {
  const input = { // DeleteObjectRequest
    Bucket: BUCKET_NAME, // required
    Key: key // required
  };
  const command = new DeleteObjectCommand(input);
  const response = await client.send(command);
  return response;
}

// export function listObjects() {
//   const client = new S3Client({});
//   return client.send(new ListObjectsCommand({}));
// }