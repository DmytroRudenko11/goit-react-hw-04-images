import { useState, useEffect, useRef } from 'react';
import { getImage } from 'APIRequest/APIrequest';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Pagination } from 'components/Pagination/Pagination';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export function ImageGallery({ searchValue }) {
  const [imageData, setImageData] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const prevSearchValue = useRef('');

  useEffect(() => {
    if (searchValue !== '') {
      setIsLoading(true);
      getImage(searchValue, currentPage, perPage).then(response => {
        setImageData(response.hits);
        setTotalHits(response.totalHits);
      });

      setTimeout(() => setIsLoading(false), 500);

      if (searchValue !== prevSearchValue.current) {
        setCurrentPage(1);
      }
      prevSearchValue.current = searchValue;
    }
  }, [searchValue, currentPage, perPage]);

  const setPage = currentPage => {
    if (currentPage !== '...') {
      const number = Number(currentPage);

      setCurrentPage(number);
      const element = document.getElementById('ahcnor1');
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  };

  return (
    <div>
      {isLoading && (
        <Preloader>
          <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={5}
            strokeWidthSecondary={2}
            color="#ffbf00"
            secondaryColor="white"
          />
        </Preloader>
      )}
      <List id="ahcnor1">
        {totalHits === 0 && imageData !== null && (
          <StartText>No pictures found on your request</StartText>
        )}
        {imageData !== null ? (
          imageData.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              alt={tags}
              largeIMG={largeImageURL}
            />
          ))
        ) : (
          <StartText>It's time to search pictures!</StartText>
        )}
      </List>
      {totalHits > perPage && (
        <Pagination
          currentPage={currentPage}
          onChangePage={setPage}
          totalPages={Math.ceil(totalHits / perPage)}
        />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

const List = styled.ul`
  padding: 15px;
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Preloader = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StartText = styled.h1`
  text-align: center;
  margin: 0 auto;
`;
