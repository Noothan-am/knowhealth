import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";
import dbConnect from "@/config/dbconnect";
import Prescription from "@/models/prescription";

export async function handleFile(formData) {
  try {
    const file = formData.get("file");

    // if (!file.name.endsWith(".jpg") && !file.name.endsWith(".jpeg") && !file.name.endsWith(".png") && file.type !== "image/jpeg" && file.type !== "image/png") {
    //   console.error("Invalid file type. Only image files are allowed.");
    //   return;
    // }

    const client = new S3Client({
      region: process.env.AWS_REGION,
    });

    const id = nanoid();

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: `${id}.${file.type.split("/")[1]}`,
      Conditions: [["eq", "$Content-Type", file.type]],
      Fields: {
        "Content-Type": file.type,
      },
    });

    const finalUrl = `${url + id}.${file.type.split("/")[1]}`;

    const formDataS3 = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value);
    });
    formDataS3.append("file", file);

    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formDataS3,
    });

    const response = await uploadResponse.text();
    console.log(uploadResponse.ok);

    if (uploadResponse.ok) {
      console.log("File uploaded successfully");
      return { finalUrl, success: true };
    } else {
      console.log("Failed to upload file");
      return { finalUrl, success: false };
    }
  } catch (err) {
    console.log(err);
    return { finalUrl, success: false };
  }
}

export const uploadPrescription = async (finalUrl, formData) => {
  await dbConnect();
  const Id = formData.get("id");
  const who = formData.get("who");
  const name = formData.get("name");
  const age = formData.get("age");
  const specialty = formData.get("specialty");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const date = formData.get("date");
  const description = formData.get("additional-info");

  if (!name || !age || !phone || !email || !specialty) {
    console.log("Please add all values");

    return {
      response: false,
      message: "please add all values",
    };
  }

  try {
    const newPrescription = new Prescription({
      name,
      age,
      specialty,
      phone,
      email,
      date,
      image: finalUrl,
      description,
      ...(who === "doctor" ? { doctorId: Id } : { userId: Id }),
    });
    console.log(newPrescription);

    await newPrescription.save();

    return {
      response: true,
      message: "Prescription added to database successfully",
    };
  } catch (error) {
    console.error(error.message);
    return {
      response: false,
      message: error.message,
    };
  }
};
