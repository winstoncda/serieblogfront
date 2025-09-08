export default function BlogCard() {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
      <div className="p-5 flex-grow flex flex-col">
        <div className="h-16 mb-2">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight"></h2>
        </div>

        <p className="text-gray-600 mb-3 leading-relaxed flex-grow"></p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Par <span className="font-semibold text-gray-700"></span>
            </p>

            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
              Voir plus →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
