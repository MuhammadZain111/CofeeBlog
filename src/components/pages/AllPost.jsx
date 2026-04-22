import React,{ useState, useEffect }  from 'react'
import Container from '../container/Container'
import PostCard from '../PostCard'
import appwriteService from "../../appwrite/config";






function AllPost() {
 
    const [posts, setPosts] = useState([])


    useEffect(() => {
        appwriteService.getPosts([]).then((response) => {
          if(posts){
          setPosts(response.documents)
          }

           
        }).catch((error) => {
            console.log(error)
        })
    }, []) 
 
 
 
 
    return (
    <div className="w-full "  >
    <Container>
      <div className="flex flex-wrap">
       {posts.map((post) => (
           <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4">
          <PostCard post={post} {...post} />
          </div>
               ))}
           </div>
        </Container>
    </div>
  )
}

export default AllPost
