
import { bool } from 'prop-types';
import { Container } from './styles';

const ToastContainer = props => (
  <Container
    {...props}
  />
);

ToastContainer.propTyoes = {
  hideProgressBar: bool,
};

ToastContainer.defaultProps = {
  hideProgressBar: true,
};

export default ToastContainer;

export { toast } from 'react-toastify';
