
import { MongoClient } from 'mongodb';


class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.client = client.db(DB_DATABASE);
        this.usersCollection = this.client.collection('users');
        this.filesCollection = this.client.collection('files');
      } else {
        console.log(err.message);
        this.client = false;
      }
    });
  }

  isAlive() {
    return Boolean(this.client);
  }

  async nbUsers() {
    const numberOfUsers = this.usersCollection.countDocuments();
    return numberOfUsers;
  }

  async nbFiles() {
      const numberOfFiles = this.filesCollection.countDocuments();
      return numberOfFiles;
    }
  }


export const dbClient = new DBClient();
export default dbClient;
