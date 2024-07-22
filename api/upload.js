import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: "sa-east-1",
});

const s3 = new AWS.S3();

// Función para validar la extensión del archivo
function validarExtension(file) {
  // Lista de extensiones permitidas
  const extensionesPermitidas = [
    "jpg",
    "png",
    "doc",
    "pdf",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];
  // Obtener la extensión del archivo
  const extensionArchivo = file.name.split(".").pop().toLowerCase();
  // Verificar si la extensión del archivo está en la lista de extensiones permitidas
  if (extensionesPermitidas.indexOf(extensionArchivo) == -1) {
    // Si la extensión del archivo no está en la lista de extensiones permitidas, lanzar un error
    throw new Error(
      "La extensión del archivo no está permitida. Las extensiones permitidas son " +
        extensionesPermitidas.map((ext) => ext.toUpperCase()).join(", ")
    );
  }
}

// Función para subir un archivo a S3
export async function uploadToS3(file, onUploadStatusChange, onError) {
  try {
    // Validar la extensión del archivo
    validarExtension(file);

    const params = {
      Bucket: "bucket-pandora", // Nombre de tu bucket S3
      Key: file.name, // Nombre del archivo en tu bucket S3
      Body: file,
      ACL: "public-read", // Si quieres que el archivo sea público
      ContentType: file.type, // Tipo de archivo que estás subiendo
    };

    // Comenzar la carga
    onUploadStatusChange(true);

    const data = await s3.upload(params).promise();

    // Finalizar la carga
    onUploadStatusChange(false);
    return data.Location;
  } catch (error) {
    // Finalizar la carga en caso de error
    onUploadStatusChange(false);

    onError(error.message);

    throw error;
  }
}
