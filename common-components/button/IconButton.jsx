import styled from 'styled-components';
import { string, bool } from 'prop-types';

import Tooltip from 'common-components/Tooltip';

import ButtonLink from './ButtonLink';

const IconButton = ({
  tooltipText,
  disabled,
  ...rest
}) => (
  <Tooltip
    show={!!tooltipText && !disabled}
    placement="top"
    text={tooltipText}
    mouseEnterDelay={0.6}
    trigger={['hover']}
  >
    <StyledIconButton
      disabled={disabled}
      {...rest}
    />
  </Tooltip>
);

IconButton.propTypes = {
  tooltipText: string,
  disabled: bool,
};

IconButton.defaultProps = {
  tooltipText: undefined,
  disabled: false,
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
