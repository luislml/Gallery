
import React, { useState } from "react";
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";
import "./GalleryItem.css"; // Asegúrate de importar el archivo CSS

function GalleryItem({ images }) {
  const [fullScreenImage, setFullScreenImage] = useState(null); // Estado para la imagen en pantalla completa

  const handleClick = (src) => {
    setFullScreenImage(src); // Establece la imagen seleccionada en pantalla completa
  };

  const handleClose = () => {
    setFullScreenImage(null); // Cierra la vista de pantalla completa
  };

  return (
    <>
      {/* Vista de galería con scroll */}
      <div className="gallery-container1">
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                onClick={() => handleClick(item.src)} // Abre la imagen en pantalla completa
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              <ImageListItemBar
                className="image-list-item-bar"
                title={item.alt}
                position="top"
                actionIcon={
                  <IconButton aria-label={`star ${item.alt}`}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      {/* Vista de imagen en pantalla completa */}
      {fullScreenImage && (
  <div className="full-screen-container" onClick={handleClose}>
    <img
      src={fullScreenImage}
      alt="Full screen"
      className="full-screen-image"
      onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
    />
    <IconButton
      className="close-button"
      onClick={handleClose}
      aria-label="Close"
    >
      <CloseIcon />
    </IconButton>
  </div>
)}


    </>
  );
}

export default GalleryItem;

  


