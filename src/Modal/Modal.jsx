import { Component } from 'react';

import ReactModal from 'react-modal';

import './Modal.css';

ReactModal.setAppElement('#root');

export class Modal extends Component {
  componentDidMount() {
    if (this.props.onOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  render() {
    const { image, onClose, onOpen, alt } = this.props;
    return (
      <div>
        <ReactModal
          isOpen={onOpen}
          contentLabel="onRequestClose Example"
          onRequestClose={onClose}
          shouldCloseOnOverlayClick={true}
          className="Modal"
          overlayClassName="Overlay"
        >
          <img
            className="Modal_image"
            src={image}
            alt={alt}
            width="100%"
            height="100%"
          />
        </ReactModal>
      </div>
    );
  }
}
