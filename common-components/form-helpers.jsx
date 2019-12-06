import styled from 'styled-components';

import Label from 'common-components/Label';
import { DEVICE } from 'helpers/style-helper';

export const FormGroup = styled.div`
  width: ${p => p.width};
  float: left;
  margin: 0;
  vertical-align: middle;
  height: auto;
  display: flex;
`;

FormGroup.defaultProps = {
  width: '100%',
};

export const InlineLabel = styled(Label)`
  flex: 0 0 30%;
  text-align: right;
  margin: 0;
  height: 100%;
  line-height: 40px;
`;

export const ActionCard = styled.div`
  text-align: right;
`;

export const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;

  ${DEVICE.mobile} {
    flex-direction: row;
  }
`;

export const ActionBar = styled.div`
  height: 40px;
  margin-bottom: 24px;
  display: flex;
`;
