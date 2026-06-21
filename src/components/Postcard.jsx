import appwriteService from "../Appwrite/Config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, authorName }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <article className="bg-[#C7B4F2] rounded-[40px] p-8 md:p-12 hover:scale-[1.01] transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest mb-4">
              Latest Post
            </p>

            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6">
              {title}
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              By {authorName || "Unknown Author"}
            </p>
            <button className="px-6 py-3 border-2 border-black rounded-full font-semibold hover:bg-black hover:text-white transition">
              Read Article →
            </button>
          </div>

          <div>
            {featuredImage && (
              <img
                src={appwriteService.getFileView(featuredImage)}
                alt={title}
                className="w-full h-auto  rounded-[30px]"
              />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
