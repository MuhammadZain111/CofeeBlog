import { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import Container  from "../container/Container";
import PostCard from "../PostCard";







function Home() {

   
    const [posts, setPosts] = useState([]);


  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);


  if (posts.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Container>
          <p className="text-gray-500 text-lg">
            No posts available. Login to read posts.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;