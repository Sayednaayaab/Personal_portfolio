export const AVATAR_URL = '/models/suit-man.glb';

let pending: Promise<ArrayBuffer> | null = null;

/**
 * One shared download of the character model. The splash starts it as early as possible and the
 * avatar parses the same bytes, so a slow phone connection never downloads the model twice.
 */
export function loadAvatarBuffer(): Promise<ArrayBuffer> {
  if (!pending) {
    pending = fetch(AVATAR_URL).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.arrayBuffer();
    });
    pending.catch(() => {
      pending = null; // allow a retry
    });
  }
  return pending;
}
