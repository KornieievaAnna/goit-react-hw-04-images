import { useState, useEffect } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar, Modal, Button, Loader, ImageGallery } from './index';

import Notiflix from 'notiflix';
import * as Api from 'service/api';

export function App() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q === '') {
      return;
    }
    
    setLoading(true);
    getHits(q, page, perPage);
  }, [q, page]);

  const getHits = async (name, page, perpage) => {
    try {
      const images = await Api.getImages(name, page, perpage);
      if (!images.length) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query "${name}". Please try again.`
        );
      }
      setHits(prev => [...prev, ...images]);
    } catch (error) {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = name => {
    if (q === name) {
      Notiflix.Notify.info(
        `Your request "${name}" has already been completed! :-)`
      );
      return;
    }
    setHits([]);
    setQ(name);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  return (
    <AppStyle>
      {showModal && (
        <Modal modalImg={modalUrl} onClose={toggleModal}>
          <img src={modalUrl} alt={hits.tags} />
        </Modal>
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        images={hits}
        openModal={toggleModal}
        modalUrl={setModalUrl}
      ></ImageGallery>
      {loading && <Loader />}
      {hits.length >= perPage && !loading && (
        <Button loadMore={handleLoadMore} />
      )}
    </AppStyle>
  );
}

export default App;
