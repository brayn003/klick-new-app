import { Children } from 'react';
import RcTooltip from 'rc-tooltip';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { string, bool, node } from 'prop-types';
// import { animated, useSpring } from 'react-spring';

const Tooltip = ({
  text, show, children, ...rest
}) => {
  if (!show) {
    return null;
  }
  Children.only(children);
  console.log('here', children);
  return (
    <>
      <TooltipStyles />
      <RcTooltip
        {...rest}
        prefixCls="app-tooltip"
        overlayClassName="app-tooltip"
        transitionName="animation-tooltip"
        arrowContent={<TooltipArrow />}
        trigger={['focus']}
        placement="bottom"
        overlay="hello"
      />
    </>
  );
};

Tooltip.propTypes = {
  text: string,
  show: bool,
  children: node,
};

Tooltip.defaultProps = {
  text: '',
  show: true,
  children: null,
};

const tooltipAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const TooltipArrow = styled.div`
  width: 20px;
  height: 20px;
  background-color: #FFF;
  transform: rotateZ(45deg) translate3d(4px, 4px, 0);
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  display: inline-block;
`;

const TooltipStyles = createGlobalStyle`
  .app-tooltip {
    background-color: #FFF;
    position: absolute;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    min-height: 40px;
    min-width: 100px;
    border-radius: 8px;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
    will-change: opacity, transform, box-shadow;
    transition: box-shadow 0.1s linear;
    margin-top: 15px;

    .app-tooltip-arrow {
      height: 15px;
      width: 30px;
      position: absolute;
      top: -15px;
      left: 8px;
      overflow: hidden;
      will-change: box-shadow;
      transition: box-shadow 0.1s linear;
      text-align: center;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
      
      ${TooltipArrow} {
        box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
      }
    }

    &.app-tooltip-hidden {
      display: none;
    }

    &.animation-tooltip-appear, &.animation-tooltip-enter {
      animation: ${tooltipAnimation} 0.1s linear;
    }

    &.animation-tooltip-leave {
      animation: ${tooltipAnimation} 0.1s linear reverse;
    }
  }
`;

const TooltipContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
`;


export default Tooltip;
