import React, { useEffect, useState } from "react";
import Container  from "../container/Container";
import PostForm from "../PostForm";
import appwriteService from "../../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {

  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    if (slug) {

      appwriteService.getPost(slug).then((post) => {

        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }

      });

    } else {
      navigate("/");
    }

  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="text-center">
      <h1>Loading...</h1>
    </div>
  );
}

export default EditPost;