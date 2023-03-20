import React from 'react';
import { ImageGalleryStyled } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, openModal, modalUrl }) {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          openModal={openModal}
          getModalUrl={modalUrl}
        />
      ))}
    </ImageGalleryStyled>
  );
}
