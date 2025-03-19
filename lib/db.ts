"use client";

// A simple client-side database using IndexedDB for storing user data
// This can be replaced with a server-side database in production

interface DBOptions {
  name: string;
  version: number;
  stores: Record<string, string[]>;
}

class IndexedDB {
  private db: IDBDatabase | null = null;
  private options: DBOptions;

  constructor(options: DBOptions) {
    this.options = options;
  }

  async connect(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.options.name, this.options.version);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = () => {
        const db = request.result;
        
        // Create object stores based on options
        Object.entries(this.options.stores).forEach(([storeName, keyPath]) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: keyPath[0] });
          }
        });
      };
    });
  }
  
  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.connect();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result as T[]);
    });
  }
  
  async add<T>(storeName: string, data: T): Promise<T> {
    const db = await this.connect();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(data);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(data);
    });
  }
  
  async update<T>(storeName: string, data: T): Promise<T> {
    const db = await this.connect();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(data);
    });
  }
  
  async delete(storeName: string, key: string | number): Promise<void> {
    const db = await this.connect();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Initialize our database
export const db = new IndexedDB({
  name: "brainwise-db",
  version: 1,
  stores: {
    gameResults: ["id"],
    cognitiveScores: ["id"],
    userActivities: ["id"],
    achievements: ["id"],
    healthMetrics: ["id"]
  }
}); 