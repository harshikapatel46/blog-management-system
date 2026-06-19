import { useEffect, useState } from "react";
import appwriteService from "../Appwrite/Config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#E9DCCD] flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Welcome to the Journal
            </h1>

            <p className="text-xl text-gray-700">
              Login to read and explore articles.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9DCCD]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center">
          <h1
            className="text-6xl md:text-8xl font-black uppercase leading-none"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Modern
            <br />
            Journal
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            A collection of stories, ideas, inspiration and thoughtful writing.
          </p>
        </div>
      </section>

      {/* Posts */}
      <Container>
        <div className="space-y-12 pb-20">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;