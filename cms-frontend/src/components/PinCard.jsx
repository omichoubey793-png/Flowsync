import {
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";

function PinCard({
  image,
  title,
  description,
}) {

  return (
    <div className="group relative overflow-hidden rounded-[28px] cursor-pointer bg-[#111] border border-white/5 hover:border-red-500/20 transition-all duration-500 shadow-lg hover:shadow-[0_10px_50px_rgba(255,0,0,0.15)]">

      {/* IMAGE */}
      <div className="overflow-hidden">

        <img
          src={image}
          alt={title}
          className="w-full object-cover transition duration-700 group-hover:scale-110"
        />

      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">

        {/* TOP ACTIONS */}
        <div className="absolute top-4 right-4 flex gap-2">

          <button className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition">

            <Heart size={18} />

          </button>

          <button className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition">

            <Share2 size={18} />

          </button>

        </div>

        {/* BOTTOM CONTENT */}
        <div className="absolute bottom-0 left-0 w-full p-5">

          <div className="flex items-center justify-between gap-3">

            <div>

              <h3 className="text-white text-lg font-bold">

                {title}

              </h3>

              <p className="mt-1 text-sm text-gray-300 line-clamp-2">

                {description}

              </p>

            </div>

            {/* SAVE */}
            <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all">

              <Bookmark size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PinCard;