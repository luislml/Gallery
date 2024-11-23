import React, { useState, useRef } from "react";
import "./GalleryItem.css";

function GalleryItem({ src, alt }) {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Función que se ejecuta cuando la imagen se carga
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  // Función para abrir la imagen en pantalla completa
  const handleClick = () => {
    if (containerRef.current) {
      // Usamos la API de pantalla completa
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) { // Firefox
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) { // Safari
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
        containerRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="image-container"
      style={{
        width: `${imageDimensions.width}px`,  // Ajustamos el ancho del contenedor a la imagen
        height: `${imageDimensions.height}px`, // Ajustamos la altura del contenedor a la imagen
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="gallery-image"
        onClick={handleClick} // Al hacer clic, activamos el modo de pantalla completa
        onLoad={handleImageLoad} // Captura el tamaño de la imagen cuando se carga
      />
    </div>
  );
}

export default GalleryItem;
