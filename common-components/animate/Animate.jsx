import {
  Children, cloneElement, useRef,
} from 'react';
import { node } from 'prop-types';
import anime from 'animejs';

const Animate = ({
  children,
  ...rest
}) => {
  const instance = useRef({
    refs: [],
  });

  const modifiedChildren = Children.map((children || []), (child, index) => {
    const clonedElement = cloneElement(child, {
      ref: (ref) => {
        if (index === 0) {
          instance.current.refs = [];
        }
        instance.current.refs.push(ref);
        if (Children.count(children) === instance.current.refs.length) {
          const targets = instance.current.refs.filter(v => !!v);
          if (targets.length) {
            anime.remove(instance.current.refs);
            anime({ targets: instance.current.refs, ...rest });
          }
        }
      },
    });
    return clonedElement;
  });

  return modifiedChildren;
};

Animate.propTypes = {
  children: node,
};

Animate.defaultProps = {
  children: [],
};

export default Animate;
