const conf= {
appWriteUrl:import.meta.env.VITE_APPWRITE_URL, 
appWriteProjectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
appWriteDatabaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
appWriteCollectionId:import.meta.env.VITE_APPWRITE_COLLECTION_ID,
appWriteBucketId:import.meta.env.VITE_APPWRITE_BUCKET_ID,
}



console.log("URL VALUE:", import.meta.env.VITE_APPWRITE_URL)
console.log("CONF URL:", conf.appWriteUrl)

// 👇 Add this temporarily
console.log("CONF VALUES:", conf)

export default conf ;
