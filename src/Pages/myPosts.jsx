import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../Appwrite/Config";
import { useSelector } from "react-redux";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!user) {
      return;
    }

    appwriteService
      .getMyPosts(user.$id)
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E9DCCD] flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading Posts...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9DCCD] py-16">
      <Container>
        <div className="text-center mb-20">
          <h1
            className="text-6xl md:text-8xl font-black uppercase leading-none"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            My Posts
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Your personal collection of published posts
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-12">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[30px] p-12 text-center shadow-md">
            <h2 className="text-3xl font-bold mb-4">No Posts Available</h2>

            <p className="text-gray-600">Start creating amazing content.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default MyPosts;
