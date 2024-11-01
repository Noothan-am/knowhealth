import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

export async function GET(request) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: "uploads/",
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    console.log(data);

    const files = data.Contents.map(async (file) => ({
      key: file.Key,
      url: await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.Key,
          Expires: 60 * 60,
        }),
        { expiresIn: 3600 }
      ),
    }));

    return NextResponse.json(await Promise.all(files), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Could not retrieve files: ${error.message}` },
      { status: 500 }
    );
  }
}
