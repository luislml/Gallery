import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";
import GalleryItem from "../GalleryItem/GalleryItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"; // Asegúrate de importar Grid
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

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

      const fetchedImages =
        query || genre !== "All" ? response.data.results : response.data;

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

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(searchTerm);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchImages("", genre);
  };

  return (
    <Container>
      <div className="gallery-container">
        <div className="gallery-filters">
          <div className="filters-wrapper">
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              

              {/* Botones de géneros */}
              <Grid item xs={12} sm={6} md={8}>
                <div className="genre-buttons">
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      size="large"
                      variant={selectedGenre === genre ? "contained" : "outlined"}
                      color="error"
                      onClick={() => handleGenreClick(genre)}
                      style={{ margin: "5px" }}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </Grid>
              {/* Barra de búsqueda */}
              <Grid item xs={12} sm={6} md={4}>
                <form onSubmit={handleSearch} className="form-container">
                  <TextField
                    size="small"
                    error
                    id="outlined-error"
                    label="SEARCH..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      className: "neon-label",
                    }}
                    className="centered-search"
                  />
                </form>
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Galería */}
        {loading ? (
          <p className="loading-text">Loading images...</p>
        ) : (
          <div className="gallery">
            <GalleryItem images={images} />
            {images.length === 0 && (
              <p className="no-results">No images found</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Gallery;
