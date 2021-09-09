const { BlobServiceClient } = require('@azure/storage-blob');

const statusCodes = require('../../../config/constants/statusCodes');
const Meme = require('../models/memes');

module.exports = async (request) => {
  try {
    const memeData = {
      heading: request.body.heading,
      user_id: request.body.user_id,
      created: new Date(),
      view_count: [],
      state: request.body.state,
      status: request.body.status,
    };

    const client = await BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB);
    const container = 'thememestudio';
    const containerClient = await client.getContainerClient(container);
    const blobName = `${memeData.heading}__${memeData.user_id}__${memeData.created}.png`;
    const blobClient = containerClient.getBlockBlobClient(blobName);
    const buffer = Buffer.from(request.body.image, 'base64');

    await blobClient.upload(buffer, buffer.length);

    memeData.image_url = `https://thememestudio.blob.core.windows.net/thememestudio/${blobName}`;
    memeData.thumbnail_url = `https://thememestudio.blob.core.windows.net/thememestudio/${blobName}`;
    const newMeme = new Meme(memeData);

    await newMeme.save();
    return {
      statusCode: statusCodes.SUCCESS_OK,
      body: {
        message: 'Meme saved',
        data: memeData,
      },
    };
  } catch (e) {
    return {
      statusCode: statusCodes.ERROR_INTERNAL,
      body: {
        error: e.message,
      },
    };
  }
};
