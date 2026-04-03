import conf from '../../conf/conf.js'
import { Client, ID, Storage, Query, Databases } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)        // ✅ correct key
      .setProject(conf.appWriteProjectId);  // ✅ setProject not setEndpoint

    this.databases = new Databases(this.client); // ✅
    this.storage = new Storage(this.client);     // ✅ consistent name
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,        // ✅ capital W
        conf.appWriteCollectionId,      // ✅ fixed key name
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId } // ✅ inside object
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(  // ✅ added parentheses
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries.length ? queries : [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(  // ✅ this.storage
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("File Upload Error:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(  // ✅ this.storage
        conf.appWriteBucketId,
        fileId
      );
    } catch (error) {
      console.log("File Delete Error:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(      // ✅ this.storage not this.bucket
      conf.appWriteBucketId,
      fileId
    );
  }
}

const appwriteService = new Service();
export default appwriteService;