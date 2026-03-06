import React from 'react'
import appwriteService from './appwrite/config'


function PostCard({ $id,title,featuredImage,expect }) {
  return (
   
     <Link to={`/post/${id}`}>
     
      <div className="w-full bg-gray-100 rounded-xl p-4  ">
    
      <div className=" w-full justify-center m-4 ">
       <img src={appwriteService.getPreview(fearuredImage)} alt="title">
       </img>
      </div>
      <h2 className='text-xl font-bold '    >

      </h2>

      </div>

     </Link>
   
  )
}

export default PostCard
