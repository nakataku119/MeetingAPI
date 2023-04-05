import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 180 });
const USER_CACHE_KEY = "user";

export const getUserFromCache = (): any | null => {
  return cache.get(USER_CACHE_KEY);
};

export const saveUserToCache = (user: any): void => {
  cache.set(USER_CACHE_KEY, user);
};
