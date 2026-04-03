import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../components";
import { useNavigate } from "react-router-dom";        // ✅ removed useDispatch
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function PostForm({ post }) {

  const { register, handleSubmit, watch, setValue, control } = useForm({ // ✅ added control
    defaultValues: {
      title:   post?.title   || "",
      slug:    post?.slug    || "",
      content: post?.content || "",
      status:  post?.status  || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0]                              // ✅ optional chaining
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);

    } else {
      const file = data.image?.[0]                              // ✅ optional chaining
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        data.featuredImage = file.$id;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate("/");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }
    return "";  // ✅ always return string
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">

        <Input
          label="Title"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          {...register("slug", { required: true })}
          readOnly
        />

        <RTE
          label="Content"
          name="content"
          control={control}                              // ✅ pass control
          defaultValue={post?.content || ""}
        />

        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full rounded-lg mb-4"
          />
        )}

        <Select
          label="Status"
          options={[
            { value: "active",   label: "Active"   },
            { value: "inactive", label: "Inactive" },
          ]}
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
        >
          {post ? "Update Post" : "Create Post"} 
        </Button>

      </form>
    </div>
  );
}

export default PostForm;