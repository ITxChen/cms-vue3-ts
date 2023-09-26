// 封装对浏览器缓存的处理
enum CacheType {
  Local,
  Session
}
class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: string | boolean) {
    if (typeof value === 'boolean') {
      value = value ? 'true' : 'false'
      this.storage.setItem(key, value)
      // console.log(typeof value)   // string
    } else {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    try {
      const value = this.storage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
    } catch {}
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}
const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
