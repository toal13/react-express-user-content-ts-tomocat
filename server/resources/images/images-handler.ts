import busboy from 'busboy';
import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import sharp from 'sharp';
import { getImageBucket } from './images-model';

export const getImage = async (req: Request, res: Response) => {
  const id = new Types.ObjectId(req.params.id);
  const imageBucket = getImageBucket();

  const imageData = await imageBucket.find({ _id: id }).next();

  if (!imageData) return res.status(404).send('Image does not exist');

  res.setHeader('Content-Type', imageData.metadata?.contentType);

  imageBucket.openDownloadStream(id).pipe(res);
};

export const uploadImage = (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });

  req.pipe(bb);

  bb.on(
    'file',
    (
      name: string,
      incomingStream: NodeJS.ReadableStream,
      info: busboy.FileInfo
    ) => {
      const uploadStream = getImageBucket().openUploadStream(info.filename, {
        metadata: {
          contentType: info.mimeType,
        },
      });

      uploadStream.on('finish', () => {
        res.status(201).json(uploadStream.id);
      });

      const transformer = sharp().resize({
        width: 10,
        height: 10,
        fit: 'cover',
      });

      incomingStream.pipe(transformer).pipe(uploadStream);
    }
  );
};
