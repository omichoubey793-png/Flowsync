const categories = [
  "All",
  "AI",
  "Coding",
  "Design",
  "Nature",
];

function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="relative z-20 flex gap-4 overflow-x-auto px-6 md:px-10 pt-24 pb-6 scrollbar-hide">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
            selectedCategory === category
              ? "bg-red-600 text-white shadow-lg"
              : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
          }`}
        >
          {category}
        </button>

      ))}

    </div>
  );
}

export default Categories;