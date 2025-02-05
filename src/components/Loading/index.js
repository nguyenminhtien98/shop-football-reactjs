import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function Loading(onClick) {
    <Button className={cx('buttonload-item')} primary large onClick={onClick}>
        <FontAwesomeIcon icon={faSpinner} />
        Loading
    </Button>
}
export default Loading;
