import {
  Children, cloneElement, useRef,
} from 'react';
import { node } from 'prop-types';
import anime from 'animejs';
import difference from 'lodash/difference';

const Animate = ({
  children,
  ...rest
}) => {
  const instance = useRef({
    refs: [],
    oldRefs: [],
  });

  const modifiedChildren = Children.map((children || []), (child, index) => {
    const clonedElement = cloneElement(child, {
      ref: (ref) => {
        const targets = instance.current.refs.filter(v => !!v);
        if (index === 0) {
          if (targets.length) {
            instance.current.oldRefs = [...instance.current.refs];
          }
          instance.current.refs = [];
        }
        instance.current.refs.push(ref);
        if (Children.count(children) === instance.current.refs.length) {
          if (targets.length) {
            const diff = difference(targets, instance.current.oldRefs);
            console.log(diff);
            anime.remove(diff);
            anime({ targets: diff, ...rest });
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
