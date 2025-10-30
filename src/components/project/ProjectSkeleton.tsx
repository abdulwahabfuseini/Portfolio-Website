
const ProjectSkeleton = () => {
  // Array to map over and display multiple skeleton cards
  const skeletonCount = 4; 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4 animate-pulse">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div 
          key={index} 
          className="relative bg-glass rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 p-4"
        >
          {/* Image Placeholder */}
          <div className="w-full h-52 sm:h-64 bg-gray-500 rounded-lg"></div>

          {/* Content Placeholder */}
          <div className="p-4 md:p-6">
            {/* Title Placeholder */}
            <div className="h-6 bg-gray-500 rounded w-3/4 mb-3"></div>
            
            {/* Description Placeholder */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-500 rounded"></div>
              <div className="h-4 bg-gray-500 rounded w-5/6"></div>
            </div>

            {/* Tags Placeholder */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="h-5 bg-gray-500 rounded-full w-16"></div>
                <div className="h-5 bg-gray-500 rounded-full w-20"></div>
                <div className="h-5 bg-gray-500 rounded-full w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ProjectSkeleton