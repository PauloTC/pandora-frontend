import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "sa-east-1" });

// AWS.config.update({
//   accessKeyId: "AKIARUO3BI5AIKALEON6",
//   secretAccessKey: "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",
//   region: "sa-east-1", // ej. 'us-east-1'
// });

// const s3 = new AWS.S3();

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
