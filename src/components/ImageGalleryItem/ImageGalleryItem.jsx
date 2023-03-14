import styled from 'styled-components';
import { Modal } from 'Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ src, alt, largeIMG }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Item>
      <Image src={src} alt={alt} onClick={handleOpenModal} />
      {showModal && (
        <Modal
          image={largeIMG}
          alt={alt}
          onClose={handleCloseModal}
          onOpen={showModal}
        />
      )}
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeIMG: PropTypes.string.isRequired,
};

const Item = styled.li`
  padding: 0;
  margin: 0;
  list-style: none;
  width: calc((100% - 60px) / 4);
  cursor: zoom-in;
`;

const Image = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;

  border-radius: 4px;
  border: 1px solid #fd6a02;
  box-shadow: 7px 7px 5px 0px rgba(0, 0, 0, 0.75);
  transition: transform 250ms linear;

  &:hover {
    transform: scale(1.03);
  }
`;
