import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/Config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData
    ? post.userId === userData.$id
    : false;

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

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-screen bg-[#E9DCCD] py-16">
      <Container>
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-5xl md:text-7xl font-black leading-tight mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {post.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative mb-12">
            <div className="bg-[#C7B4F2] p-6 rounded-[40px] border-2 border-black">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full h-[350px] md:h-[600px] object-cover rounded-[30px]"
              />
            </div>

            {isAuthor && (
              <div className="absolute top-8 right-8 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-[#A8E6A3]">
                    Edit
                  </Button>
                </Link>

                <Button
                  className="bg-[#FFB3B3]"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <article className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-12 border-2 border-black shadow-sm">
            <div className="prose prose-lg max-w-none">
              {parse(post.content)}
            </div>
          </article>
        </div>
      </Container>
    </div>
  ) : null;
}