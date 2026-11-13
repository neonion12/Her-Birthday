import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).send('File parameter required');
  }

  // ডিরেক্টরি ট্রাভার্সাল (হ্যাকিং) আটকানোর সিকিউরিটি
  if (file.includes('..') || file.includes('/') || file.includes('\\')) {
    return res.status(403).send('Forbidden');
  }

  const imagePath = path.join(process.cwd(), 'img', file);

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    
    // ফাইলের এক্সটেনশন অনুযায়ী কনটেন্ট টাইপ সেট করা
    const ext = path.extname(file).toLowerCase();
    let contentType = 'image/jpeg'; // ডিফল্ট
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.webp') contentType = 'image/webp';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.jpeg') contentType = 'image/jpeg';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store, max-age=0'); // ক্যাশে ব্লক করা হলো
    res.status(200).send(imageBuffer);
  } catch (error) {
    res.status(404).send('Image not found');
  }
}
