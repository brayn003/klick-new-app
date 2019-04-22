import RcTooltip from 'rc-tooltip';
import { createGlobalStyle, keyframes } from 'styled-components';
import {
  string, bool, node, oneOfType,
} from 'prop-types';
// import { animated, useSpring } from 'react-spring';

const Tooltip = ({
  text, show, children, ...rest
}) => {
  if (!show) {
    return children;
  }
  return (
    <>
      <TooltipStyles />
      <RcTooltip
        {...rest}
        prefixCls="app-tooltip"
        overlayClassName="app-tooltip"
        transitionName="animation-tooltip"
        overlay={text}
      >
        {children}
      </RcTooltip>
    </>
  );
};

Tooltip.propTypes = {
  text: oneOfType([string, node]),
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

const TooltipStyles = createGlobalStyle`
  .app-tooltip {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: absolute;
    z-index: 1060;
    display: block;
    max-width: 250px;
    visibility: visible;

    &.animation-tooltip-appear, &.animation-tooltip-enter {
      animation: ${tooltipAnimation} 0.1s linear;
    }

    &.animation-tooltip-leave {
      animation: ${tooltipAnimation} 0.1s linear reverse;
    }
  }
  .app-tooltip-hidden {
    display: none;
  }
  .app-tooltip-placement-top,
  .app-tooltip-placement-topLeft,
  .app-tooltip-placement-topRight {
    padding-bottom: 8px;
  }
  .app-tooltip-placement-right,
  .app-tooltip-placement-rightTop,
  .app-tooltip-placement-rightBottom {
    padding-left: 8px;
  }
  .app-tooltip-placement-bottom,
  .app-tooltip-placement-bottomLeft,
  .app-tooltip-placement-bottomRight {
    padding-top: 8px;
  }
  .app-tooltip-placement-left,
  .app-tooltip-placement-leftTop,
  .app-tooltip-placement-leftBottom {
    padding-right: 8px;
  }
  .app-tooltip-inner {
    min-width: 30px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .app-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  .app-tooltip-placement-top .app-tooltip-arrow,
  .app-tooltip-placement-topLeft .app-tooltip-arrow,
  .app-tooltip-placement-topRight .app-tooltip-arrow {
    bottom: 3px;
    border-width: 5px 5px 0;
    border-top-color: rgba(0, 0, 0, 0.75);
  }
  .app-tooltip-placement-top .app-tooltip-arrow {
    left: 50%;
    margin-left: -5px;
  }
  .app-tooltip-placement-topLeft .app-tooltip-arrow {
    left: 16px;
  }
  .app-tooltip-placement-topRight .app-tooltip-arrow {
    right: 16px;
  }
  .app-tooltip-placement-right .app-tooltip-arrow,
  .app-tooltip-placement-rightTop .app-tooltip-arrow,
  .app-tooltip-placement-rightBottom .app-tooltip-arrow {
    left: 3px;
    border-width: 5px 5px 5px 0;
    border-right-color: rgba(0, 0, 0, 0.75);
  }
  .app-tooltip-placement-right .app-tooltip-arrow {
    top: 50%;
    margin-top: -5px;
  }
  .app-tooltip-placement-rightTop .app-tooltip-arrow {
    top: 8px;
  }
  .app-tooltip-placement-rightBottom .app-tooltip-arrow {
    bottom: 8px;
  }
  .app-tooltip-placement-left .app-tooltip-arrow,
  .app-tooltip-placement-leftTop .app-tooltip-arrow,
  .app-tooltip-placement-leftBottom .app-tooltip-arrow {
    right: 3px;
    border-width: 5px 0 5px 5px;
    border-left-color: rgba(0, 0, 0, 0.75);
  }
  .app-tooltip-placement-left .app-tooltip-arrow {
    top: 50%;
    margin-top: -5px;
  }
  .app-tooltip-placement-leftTop .app-tooltip-arrow {
    top: 8px;
  }
  .app-tooltip-placement-leftBottom .app-tooltip-arrow {
    bottom: 8px;
  }
  .app-tooltip-placement-bottom .app-tooltip-arrow,
  .app-tooltip-placement-bottomLeft .app-tooltip-arrow,
  .app-tooltip-placement-bottomRight .app-tooltip-arrow {
    top: 3px;
    border-width: 0 5px 5px;
    border-bottom-color: rgba(0, 0, 0, 0.75);
  }
  .app-tooltip-placement-bottom .app-tooltip-arrow {
    left: 50%;
    margin-left: -5px;
  }
  .app-tooltip-placement-bottomLeft .app-tooltip-arrow {
    left: 16px;
  }
  .app-tooltip-placement-bottomRight .app-tooltip-arrow {
    right: 16px;
  }
`;

export default Tooltip;
