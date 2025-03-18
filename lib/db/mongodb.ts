import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import { createServiceLogger } from '../logger';

const logger = createServiceLogger('mongodb');

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'brain-ai';

// Connection options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Create a MongoClient instance that can be reused
let client: MongoClient | null = null;
let db: Db | null = null;

// Gets a database connection (creates one if it doesn't exist)
export async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  try {
    client = new MongoClient(uri, options);
    await client.connect();
    logger.info('Successfully connected to MongoDB');
    
    // Ping to confirm connection
    await client.db('admin').command({ ping: 1 });
    logger.info('MongoDB connection verified via ping');
    
    return client;
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    // Reset client so next call will try to connect again
    client = null;
    throw error;
  }
}

// Gets the database instance
export async function getDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  const client = await getMongoClient();
  db = client.db(dbName);
  return db;
}

// Close the connection (useful for tests)
export async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    logger.info('MongoDB connection closed');
  }
}

// Register shutdown handler
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    logger.info(`${signal} received, closing MongoDB connection`);
    await closeMongoConnection();
    process.exit(0);
  });
});

// Export MongoClient for potential direct use
export { MongoClient }; 