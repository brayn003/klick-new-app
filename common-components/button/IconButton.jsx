import styled from 'styled-components';
import { string } from 'prop-types';

import Tooltip from 'common-components/Tooltip';

import ButtonLink from './ButtonLink';

const IconButton = ({
  tooltipText,
  ...rest
}) => (
  <Tooltip
    show={!!tooltipText}
    placement="top"
    text={tooltipText}
    mouseEnterDelay={0.6}
  >
    <StyledIconButton {...rest} />
  </Tooltip>
);

IconButton.propTypes = {
  tooltipText: string,
};

IconButton.defaultProps = {
  tooltipText: undefined,
};

export const StyledIconButton = styled(ButtonLink)`
  width: 40px;
  font-size: 1em;
  padding: 0;
  text-align: center;

  svg {
    margin-top: 12px;
  }
`;

export default IconButton;
