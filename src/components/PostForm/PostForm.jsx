import { useCallback } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE";
import { Button, Input, Select } from "../index";
import appwriteService from "../../Appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        slug: post?.$id || "",
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    try {
      if (post) {
        const file =
          data.image && data.image[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;
        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const file =
          data.image && data.image[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;
        if (file) data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
          authorName: userData?.name,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch, slugTransform]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <div className="w-2/3   px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full  rounded-4xl  mb-4">
            <img
              src={String(appwriteService.getFileView(post.featuredImage))}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default PostForm;
