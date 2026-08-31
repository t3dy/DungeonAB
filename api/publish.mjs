// POST /api/publish — a finished run becomes a permanent witness.
// Mints an unguessable witness id and TWO secret keys (player hand, scholar hand),
// stores only their hashes, and writes one JSON file to Blob storage.
// No database. See docs/PLAYTHROUGH_WITNESS_ARCHITECTURE.md.

import { put } from '@vercel/blob';
import { randomBytes, createHash } from 'node:crypto';

const WITNESS_V = 1;
const MAX_BYTES = 512 * 1024; // a day's witness is a few KB; this is a generous ceiling

const token = (n = 18) => randomBytes(n).toString('base64url');
const hash = (s) => createHash('sha256').update(s).digest('hex');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'expected a JSON body' });
    if (JSON.stringify(body).length > MAX_BYTES) return res.status(413).json({ error: 'witness too large' });

    const id = 'w_' + token(9);
    const playerKey = token();
    const scholarKey = token();

    const witness = {
      v: WITNESS_V,
      id,
      game: String(body.game || 'morigny'),
      origin: body.origin === 'simulated' ? 'simulated' : 'played',
      siglum: body.siglum || null,
      parent: body.parent || null,           // reserved: witness descent / forking
      createdAt: new Date().toISOString(),
      title: String(body.title || 'A Witness'),

      // ---- immutable core: never modified after this write ----
      mechanical: body.mechanical || {},
      narrative: Array.isArray(body.narrative) ? body.narrative : [],
      meta: body.meta || {},

      // ---- editorial layers: written only by /api/edit, never here ----
      keys: { player: hash(playerKey), scholar: hash(scholarKey) },
      revisions: [],
      marginalia: [],
      preface: { orig: '', current: '', hand: null },
    };

    await put(`witnesses/${id}.json`, JSON.stringify(witness), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    // A small summary row, so the researcher's desk can list thousands of
    // witnesses later without fetching every full document.
    await put(`index/${id}.json`, JSON.stringify({
      id, game: witness.game, origin: witness.origin, siglum: witness.siglum,
      createdAt: witness.createdAt, title: witness.title,
      outcome: witness.meta.outcome || witness.mechanical.outcome || {},
      revisions: 0, marginalia: 0,
    }), { access: 'public', contentType: 'application/json', addRandomSuffix: false });

    const base = `https://${req.headers['x-forwarded-host'] || req.headers.host}`;
    return res.status(200).json({
      id,
      publicUrl: `${base}/w.html?id=${id}`,
      playerEditUrl: `${base}/w.html?id=${id}&k=${playerKey}`,
      scholarEditUrl: `${base}/w.html?id=${id}&k=${scholarKey}`,
    });
  } catch (err) {
    return res.status(500).json({ error: 'publish failed', detail: String(err && err.message || err) });
  }
}
