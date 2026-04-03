import React, { useEffect, useState } from "react";
import Container  from "../container/Container";
import Button from "../Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import appwriteService from "../../appwrite/config";




function Post() {

  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {

    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/posts");
        }
      });
    }

  }, [slug, navigate]);

  const deletePost = () => {

    appwriteService.deletePost(post.$id).then((status) => {

      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/posts");
      }

    }).catch((error) => {
      console.log(error);
    });

  };

  return post ? (
    <div className="py-8">
      <Container>

        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">

              <Button
                className="mr-3 bg-green-500"
                onClick={() => navigate(`/edit-post/${post.$id}`)}
              >
                Edit
              </Button>

              <Button
                className="bg-red-500"
                onClick={deletePost}
              >
                Delete
              </Button>

            </div>
          )}

        </div>

        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">
          {parse(post.content)}
        </div>

      </Container>
    </div>

  ) : (
    <h1 className="text-center">Loading...</h1>
  );
}

export default Post;