import Tooltip from 'rc-tooltip';
import { createGlobalStyle, keyframes } from 'styled-components';
// import { animated, useSpring } from 'react-spring';

function Popover(props) {
  return (
    <>
      <PopoverStyles />
      <Tooltip
        {...props}
        prefixCls="app-popover"
        overlayClassName="app-popover"
        transitionName="animation-popover"
      />
    </>
  );
}

const popoverAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const PopoverStyles = createGlobalStyle`
  .app-popover {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1030;
    white-space: normal;
    text-align: left;
    cursor: auto;
    user-select: text;
  }

  .app-popover::after {
    position: absolute;
    background: rgba(255, 255, 255, 0.01);
    content: '';
  }
  .app-popover-hidden {
    display: none;
  }
  .app-popover-placement-top,
  .app-popover-placement-topLeft,
  .app-popover-placement-topRight {
    padding-bottom: 10px;
  }
  .app-popover-placement-right,
  .app-popover-placement-rightTop,
  .app-popover-placement-rightBottom {
    padding-left: 10px;
  }
  .app-popover-placement-bottom,
  .app-popover-placement-bottomLeft,
  .app-popover-placement-bottomRight {
    padding-top: 10px;
  }
  .app-popover-placement-left,
  .app-popover-placement-leftTop,
  .app-popover-placement-leftBottom {
    padding-right: 10px;
  }
  .app-popover-inner {
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 20px;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
    position: relative;
    z-index: 30;
    will-change: box-shadow;
    transition: box-shadow 0.1s linear;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
    }
  }
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .app-popover {
      /* IE10+ */
    }
    .app-popover-inner {
      box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;

    }
  }
  .app-popover-title {
    min-width: 177px;
    min-height: 32px;
    margin: 0;
    padding: 5px 16px 4px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    border-bottom: 1px solid #e8e8e8;
  }
  .app-popover-inner-content {
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.65);
  }
  .app-popover-message {
    position: relative;
    padding: 4px 0 12px;
    color: rgba(0, 0, 0, 0.65);
  }
  .app-popover-message > .anticon {
    position: absolute;
    top: 8px;
    color: #faad14;
  }
  .app-popover-message-title {
    padding-left: 22px;
  }
  .app-popover-buttons {
    margin-bottom: 4px;
    text-align: right;
  }
  .app-popover-buttons button {
    margin-left: 8px;
  }
  .app-popover-arrow {
    position: absolute;
    display: block;
    width: 20.48528137px;
    height: 20.48528137px;
    background: transparent;
    border-style: solid;
    border-width: 4.24264069px;
    transform: rotate(45deg);
    z-index: 20;
  }
  .app-popover-placement-top > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-topLeft > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-topRight > .app-popover-content > .app-popover-arrow {
    bottom: 6.2px;
    border-top-color: transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: transparent;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }
  .app-popover-placement-top > .app-popover-content > .app-popover-arrow {
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
  .app-popover-placement-topLeft > .app-popover-content > .app-popover-arrow {
    left: 16px;
  }
  .app-popover-placement-topRight > .app-popover-content > .app-popover-arrow {
    right: 16px;
  }
  .app-popover-placement-right > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-rightTop > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-rightBottom > .app-popover-content > .app-popover-arrow {
    left: 6px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #fff;
    border-left-color: #fff;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }
  .app-popover-placement-right > .app-popover-content > .app-popover-arrow {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  .app-popover-placement-rightTop > .app-popover-content > .app-popover-arrow {
    top: 12px;
  }
  .app-popover-placement-rightBottom > .app-popover-content > .app-popover-arrow {
    bottom: 12px;
  }
  .app-popover-placement-bottom > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-bottomLeft > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-bottomRight > .app-popover-content > .app-popover-arrow {
    top: 6px;
    border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }
  .app-popover-placement-bottom > .app-popover-content > .app-popover-arrow {
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
  .app-popover-placement-bottomLeft > .app-popover-content > .app-popover-arrow {
    left: 16px;
  }
  .app-popover-placement-bottomRight > .app-popover-content > .app-popover-arrow {
    right: 16px;
  }
  .app-popover-placement-left > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-leftTop > .app-popover-content > .app-popover-arrow,
  .app-popover-placement-leftBottom > .app-popover-content > .app-popover-arrow {
    right: 6px;
    border-top-color: #fff;
    border-right-color: #fff;
    border-bottom-color: transparent;
    border-left-color: transparent;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }
  .app-popover-placement-left > .app-popover-content > .app-popover-arrow {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  .app-popover-placement-leftTop > .app-popover-content > .app-popover-arrow {
    top: 12px;
  }
  .app-popover-placement-leftBottom > .app-popover-content > .app-popover-arrow {
    bottom: 12px;
  }
  
  .app-popover {

    &.animation-popover-appear, &.animation-popover-enter {
      animation: ${popoverAnimation} 0.1s linear;
    }

    &.animation-popover-leave {
      animation: ${popoverAnimation} 0.1s linear reverse;
    }
  }
`;


export default Popover;
