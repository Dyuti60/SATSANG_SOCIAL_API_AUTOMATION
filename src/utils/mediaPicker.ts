import fs from 'fs';
import path from 'path';

export function getRandomJpegFile(): string {
  const dirPath = path.resolve(__dirname, '../../testdata/resources');

  const files = fs.readdirSync(dirPath);

  const jpegFiles = files.filter(file =>
    file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg')
  );

  if (jpegFiles.length === 0) {
    throw new Error('No .jpeg files found in resources folder');
  }

  const randomFile =
    jpegFiles[Math.floor(Math.random() * jpegFiles.length)];

  return path.join(dirPath, randomFile);
}

export function getRandomMp4File(): string {
  const dirPath = path.resolve(__dirname, '../../testdata/resources');

  const files = fs.readdirSync(dirPath);

  const jpegFiles = files.filter(file =>
    file.toLowerCase().endsWith('.mp4')
  );

  if (jpegFiles.length === 0) {
    throw new Error('No .mp4 files found in resources folder');
  }

  const randomFile =
    jpegFiles[Math.floor(Math.random() * jpegFiles.length)];

  return path.join(dirPath, randomFile);
}