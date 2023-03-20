import React, { Component } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar, Modal, Button, Loader, ImageGallery } from './index';

import Notiflix from 'notiflix';
import * as Api from 'service/api';

class App extends Component {
  state = {
    q: '',
    page: 1,
    perPage: 12,
    showModal: false,
    modalUrl: '',
    hits: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;

    if (prevState.q !== q || prevState.page !== page) {
      this.setState({ isLoading: true });
      this.getHits(this.state.q, this.state.page, this.state.perPage);
    }

    window.scrollBy(0, window.innerHeight);
  }

  getHits = async (name, page, perpage) => {
    try {
      const images = await Api.getImages(name, page, perpage);
      if (!images.length) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query "${name}". Please try again.`
        );
      }
      this.setState(prev => ({
        hits: [...prev.hits, ...images],
      }));
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalOpen = url => {
    this.setState({ modalUrl: url });
  };

  handleFormSubmit = name => {
    if (this.state.q === name) {
      Notiflix.Notify.info(
        `Your request "${name}" has already been completed! :-)`
      );
      return;
    }
    this.setState({ hits: [], q: name, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { showModal, loading, modalUrl, hits, perPage } = this.state;
    return (
      <AppStyle>
        {showModal && (
          <Modal modalImg={modalUrl} onClose={this.toggleModal}>
            <img src={modalUrl} alt={hits.tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={hits}
          openModal={this.toggleModal}
          modalUrl={this.handleModalOpen}
        ></ImageGallery>
        {loading && <Loader />}
        {hits.length >= perPage && !loading && (
          <Button loadMore={this.handleLoadMore} />
        )}
      </AppStyle>
    );
  }
}

export default App;
