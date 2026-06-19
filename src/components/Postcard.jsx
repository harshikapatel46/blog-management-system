import appwriteService from "../Appwrite/Config";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
  console.log(appwriteService.getFileView(featuredImage));
  return (
    <Link
      to={`/post/${$id}`}
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="w-full bg-blue-700 rounded-xl p-4 ">
        <div className="w-full h-48 justify-center overflow-hidden rounded-lg">
          {featuredImage && (
            <img
              src={String(appwriteService.getFileView(featuredImage))}
              alt={title}
              className="w-full h-full rounded-xl object-cover"
            />
          )}
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
