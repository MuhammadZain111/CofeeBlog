import conf from  '../conf.js'
import { Client, Account , ID , Data , Storage , Query } from "appwrite";



export class Service{
   client = new Client();
   databases; 
   bucket;
   constructor(){
              this.client
              .setEndpoint(conf.appwriter)
              .setEndpoint(conf.appwriteProjectId)
               this.databases = new Databases(this.client);
               this.bucket = new Storage(thisaclient);

               this.account  = new account(this.client)

}

  

     async createPost({title,slug,content,featuredImage,status,userId })
     {
     try{
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteDatabaseCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
             }
          )
      }
     catch(error)
     {
        console.log("Appwrite serice :: createPost :: " ,error)
      }
   }



  
   async updatePost({title,slug,content,featuredImage,status,userId})
    {
     try
     {
       return await this.databases.updateDocument(
        conf.appwriteDatabaseId, 
        conf.appwriteCollectionId,
         slug, 
         title,
         content,
         featuredImage,
         status,
         userId  
       )}
      catch(error) 
      {
      console.log("AppWrite service :: updatePost :: error",error );
      }
    }



      async deletePost(slug){
      try{
          await this.databases.deleteDocument 
          conf.appwriteDatabaseId
          conf.appwriteCollectionId
          slug
        }
      catch(error)
       {
         console.log("Appwrite service :: deletePost :: error", error )
       }
        return false

     }


     async getPost(slug){
            try 
            {
             return await this.databases.getDocument(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
              slug
             )

            }  
            catch(error)
            {
              console.log("Appwrite service :: getPost :: error", error)

            }
       }

    
  async getPosts(queries = []) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries.length
        ? queries
        : [Query.equal("status", "active")]
    );
  } catch (error) {
    console.log("Appwrite service :: getPosts :: error", error);
    return false;
  }
}



  //  Upload File 
     async uploadFile(file) {
     try {
        return await this.storage.createFile(
          conf.appwriteBucketId,   
           ID.unique(),
           file
           );
          } catch (error) {
          console.log("File Upload Error:", error);
          throw error;
    }
  }

  //  Delete File
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
       } catch (error) {
        console.log("File Delete Error:", error);
        throw error;
        }
       }

        //  Get File Preview (for images)
        getFilePreview(fileId) {
        return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
        );
       }











} 


const service = new Service();

export default service;