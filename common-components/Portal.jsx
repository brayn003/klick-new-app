import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Portal(props) {
  const { children, selectorId } = props;
  if (typeof window === 'undefined') {
    return null;
  }
  let element = document.getElementById(selectorId);
  if (!element) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', selectorId);
    const body = document.getElementsByTagName('body')[0];
    element = body.appendChild(newDiv);
  }
  return ReactDOM.createPortal(children, element);
}

Portal.propTypes = {
  children: PropTypes.node,
  selectorId: PropTypes.string,
};

Portal.defaultProps = {
  children: null,
  selectorId: '__portal',
};

export default Portal;
