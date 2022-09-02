import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ isShowing, hide, title, children, className, fullWidth }) =>
    isShowing
        ? ReactDOM.createPortal(
              <div className={cx('modal-root')}>
                  <div className={cx('modal-overlay')} onClick={hide}></div>
                  <div className={cx('modal-wrapper', fullWidth)} aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div className={cx('modal', className)}>
                          <div className={cx('header')}>
                              <h3 className={cx('title')}>{title}</h3>
                              <button
                                  type="button"
                                  className={cx('close-button')}
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={hide}
                              >
                                  <span aria-hidden="true">
                                      <FontAwesomeIcon icon={faTimes} />
                                  </span>
                              </button>
                          </div>
                          <div className={cx('modal-main')}>{children}</div>
                      </div>
                  </div>
              </div>,
              document.getElementById('root'),
          )
        : null;
export default Modal;
