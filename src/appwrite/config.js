import conf from '../conf';
import { Client, ID, Databases, storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
         this.client
         .setEndpoint(conf.appwriteURL)
         .setProject(conf.appwriteProjectID);

         this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite service:: createpost:: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userID}){
         try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
         } catch (error) {
            console.log("appwrite service:: updatePost:: error",error);
         }
    }

    async deletePost(slug){
         try {
            await storage.databases.deleteDocoumet(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
         } catch (error) {
            console.log("appwrite service:: deletePost:: error",error);
            return false;
         }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("appwrite service:: getpost::error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log("appwrite service::getposts::error",error);
            return false;
        }
    }

    //file upload services

    async uploadFile(file){
        try {
           return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file
           )
        } catch (error) {
            console.log("appwrite service::error",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
             await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileID

            )
            return true
        } catch (error) {
            console.log("appwrite service:: error",error);
            return false
        }
    }

    getFilePreview(fileID){
        
            return  this.storage.getFilePreview(
                conf.appwriteBucketID,
                fileID
            )
        }

   
}


const service = new Service()
export default Service