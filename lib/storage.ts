import type { CollectionItem } from "@/types/movie";

export const WATCHLIST_KEY = "spektra:watchlist";
export const WATCHED_KEY = "spektra:watched";

const COLLECTION_CHANGE_EVENT = "spektra:collection-change";

const EMPTY_COLLECTION: CollectionItem[] = [];

const cache = new Map<string, { raw: string | null; items: CollectionItem[] }>();

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readCollection(key: string): CollectionItem[] {
  if (!isBrowser()) return EMPTY_COLLECTION;

  const raw = window.localStorage.getItem(key);
  const cached = cache.get(key);
  if (cached && cached.raw === raw) {
    return cached.items;
  }

  let items: CollectionItem[] = EMPTY_COLLECTION;
  if (raw) {
    try {
      items = JSON.parse(raw) as CollectionItem[];
    } catch {
      items = EMPTY_COLLECTION;
    }
  }

  cache.set(key, { raw, items });
  return items;
}

export function writeCollection(key: string, items: CollectionItem[]): void {
  if (!isBrowser()) return;

  const raw = JSON.stringify(items);
  window.localStorage.setItem(key, raw);
  cache.set(key, { raw, items });
  window.dispatchEvent(
    new CustomEvent(COLLECTION_CHANGE_EVENT, { detail: { key } })
  );
}

export function subscribeToCollection(
  key: string,
  callback: () => void
): () => void {
  const handleChange = (event: Event) => {
    if (event instanceof CustomEvent && event.detail?.key !== undefined) {
      if (event.detail.key !== key) return;
    }
    callback();
  };

  window.addEventListener(COLLECTION_CHANGE_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(COLLECTION_CHANGE_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function getServerCollectionSnapshot(): CollectionItem[] {
  return EMPTY_COLLECTION;
}
