import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ image, openModal, getModalUrl}) {
  return (
        <ImageGalleryItemStyled
          key={image.id}
          onClick={() => getModalUrl(image.largeImageURL)}
        >
          <ImageGalleryItemImage
            src={image.webformatURL}
            alt={image.tags}
            onClick={openModal}
          />
        </ImageGalleryItemStyled>
    
  );
}
