import express from 'express';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const BOT_TOKEN = '7702103820:AAH1I5k6qYniV3ynva3P-bkgQRNzytM-F5U'; // ⚠️ Удали этот токен!
const SECRET_KEY = crypto.createHash('sha256').update(BOT_TOKEN).digest();

const app = express();
app.use(express.json());

// Serve index.html
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// Проверка initData
function validateInitData(initData) {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');

  const sorted = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(sorted).digest('hex');
  return hmac === hash;
}

app.post('/auth', (req, res) => {
  const { initData } = req.body;
  if (!initData || !validateInitData(initData)) {
    return res.status(403).json({ error: '❌ Invalid initData' });
  }

  const userRaw = new URLSearchParams(initData).get('user');
  const user = JSON.parse(decodeURIComponent(userRaw));

  console.log('✅ Пользователь:', user);
  res.json({ ok: true, user });
});

const PORT = 3010;
app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));
