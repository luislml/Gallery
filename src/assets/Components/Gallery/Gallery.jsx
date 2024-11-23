import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";
import GalleryItem from "../GalleryItem/GalleryItem";

const genres = ["All", "Nature", "City", "Abstract", "Animals", "People"];
const UNSPLASH_ACCESS_KEY = "zQg5ix71xlHlkuADEYD_tciK-maG1RJUE75lDA_rFeU"; // Reemplaza con tu Access Key


function Gallery() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(false);

  // Función para cargar imágenes desde Unsplash
  const fetchImages = async (query = "", genre = "All") => {
    setLoading(true);
    try {
      const response = await axios.get(
        query || genre !== "All"
          ? "https://api.unsplash.com/search/photos"
          : "https://api.unsplash.com/photos",
        {
          params: {
            client_id: UNSPLASH_ACCESS_KEY,
            query: query || (genre !== "All" ? genre : undefined),
            per_page: 20,
          },
        }
      );

      // Si usamos búsqueda, los resultados están en `results`
      const fetchedImages = query || genre !== "All" ? response.data.results : response.data;

      setImages(
        fetchedImages.map((img) => ({
          id: img.id,
          src: img.urls.small,
          alt: img.alt_description || "Unsplash Image",
          genre: genre !== "All" ? genre : "All",
        }))
      );
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar imágenes iniciales
  useEffect(() => {
    fetchImages();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(searchTerm);
  };

  // Función para manejar los géneros
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchImages("", genre);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-filters">
        {/* Filtros */}
        <div className="filters-wrapper">
          <div className="genre-buttons">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-button ${selectedGenre === genre ? "active" : ""}`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search images..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Galería */}
      {loading ? (
        <p className="loading-text">Loading images...</p>
      ) : (
        <div className="gallery">
          {images.map((image) => (
            <GalleryItem key={image.id} src={image.src} alt={image.alt} />
          ))}
          {images.length === 0 && <p className="no-results">No images found</p>}
        </div>
      )}
    </div>
  );
}

export default Gallery;

