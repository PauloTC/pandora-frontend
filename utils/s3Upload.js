import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "sa-east-1",
});

const s3 = new AWS.S3();

// Función para subir un archivo a S3
export async function uploadToS3(file, onUploadStatusChange) {
  const params = {
    Bucket: "data-center-strapi", // Nombre de tu bucket S3
    Key: file.name, // Nombre del archivo en tu bucket S3
    Body: file,
    ACL: "public-read", // Si quieres que el archivo sea público
    ContentType: file.type, // Tipo de archivo que estás subiendo
  };

  try {
    // Comenzar la carga
    onUploadStatusChange(true);

    const data = await s3.upload(params).promise();

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
