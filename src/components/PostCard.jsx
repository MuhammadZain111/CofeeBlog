
import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'  // ✅ Link was not imported

function PostCard({ $id, title, featuredImage }) {  // ✅ removed "expect" typo
  return (
    <Link to={`/post/${$id}`}>  {/* ✅ $id not id */}
      
      <div className="w-full bg-gray-100 rounded-xl p-4">
      
        <div className="w-full justify-center m-4">
          <img 
            src={appwriteService.getFilePreview(featuredImage)}  
            alt={title}   // ✅ added proper alt text
          />
        </div>

        <h2 className='text-xl font-bold'>
          {title}  {/* ✅ title was empty */}
        </h2>

      </div>

    </Link>
  )
}

export default PostCard