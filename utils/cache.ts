import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 180 });

export const getValueFromCache = (key: string): any | null => {
  return cache.get(key);
};

export const saveValueToCache = (key: string, value: any): void => {
  cache.set(key, value);
};

export const deleteCache = (): void => {
  cache.flushAll();
};
