"use client";
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_SAS_URL = process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_URL;

// Función para subir un archivo a Azure Storage
export async function uploadToAzureStorage(
  file,
  containerName,
  onUploadStatusChange
) {
  /// Crear el cliente de servicio de blob
  const blobServiceClient = new BlobServiceClient(AZURE_STORAGE_SAS_URL);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = file.name;
  const blockBlobClient = containerClient?.getBlockBlobClient(blobName);

  try {
    // Comenzar la carga
    onUploadStatusChange(true);

    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file);

    // Finalizar la carga
    onUploadStatusChange(false);

    return blockBlobClient.url;
  } catch (error) {
    console.log("Error al subir el archivo:", error);

    // Finalizar la carga en caso de error
    onUploadStatusChange(false);

    throw error;
  }
}
