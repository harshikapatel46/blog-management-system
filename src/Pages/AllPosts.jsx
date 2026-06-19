import { useEffect, useState } from 'react'
import { Container,PostCard } from '../components'
import appwriteService from "../Appwrite/Config";



function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getAllPosts()
      .then((response) => setPosts(response?.documents ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='w-full py-8'>
      <Container>
        <h1 className="mb-6 text-3xl font-bold text-slate-900">All posts</h1>

        {loading ? (
          <p className="text-slate-600">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-center text-slate-600 shadow-sm">
            No posts found.
          </p>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
