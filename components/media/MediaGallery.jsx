"use client";
import { useEffect, useState } from "react";
import { Loader, Trash2 } from "lucide-react";

export default function MediaGallery({ isAdmin = false }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const imagesPerPage = 8;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/media");
      const data = await response.json();
      if (data.success) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setDeleting(imageId);
    try {
      const response = await fetch(`/api/media?id=${imageId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Image deleted successfully!");
        fetchImages(); // Refresh the gallery
      } else {
        alert("❌ Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("❌ Error deleting image");
    } finally {
      setDeleting(null);
    }
  };

  // Pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold animate-pulse">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto px-4 py-8 mt-[50px]">
      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No images yet. {isAdmin && "Add your first image!"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Admin Delete Button */}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(image.id)}
                    disabled={deleting === image.id}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg  disabled:bg-gray-400"
                  >
                    {deleting === image.id ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                )}

                {(image.title || image.description) && (
                  <div className="p-4">
                    {image.title && (
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-[50px]">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-[1.5rem] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium text-[1.5rem]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-[1.5rem] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
