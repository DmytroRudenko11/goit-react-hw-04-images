import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';

export function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <SearchBar onSubmit={setSearchValue} />

      <ImageGallery searchValue={searchValue} />

      <ToastContainer autoClose={3500} />
    </div>
  );
}
