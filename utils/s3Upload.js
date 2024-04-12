import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "sa-east-1", // Región de tu bucket S3
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Función para subir un archivo a S3
export async function uploadToS3(file, onUploadStatusChange) {
  const params = {
    Bucket: "data-center-strapi",
    Key: file.name, // Nombre del archivo en tu bucket S3
    Body: file,
    ACL: "public-read", // Si quieres que el archivo sea público
    ContentType: file.type, // Tipo de archivo que estás subiendo
  };

  try {
    // Comenzar la carga
    onUploadStatusChange(true);

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    // Finalizar la carga
    onUploadStatusChange(false);
    return data.Location;
  } catch (error) {
    console.log("Error al subir el archivo:", error);

    // Finalizar la carga en caso de error
    onUploadStatusChange(false);

    throw error;
  }
}
