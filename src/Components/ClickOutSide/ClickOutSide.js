import React, { useContext, useEffect, useRef } from 'react';
import Context from './ClickOutSideContext';

const ClickOutSide = props => {
  const context = useContext(Context);
  const node = useRef();

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      context && context.onClickOutSide && context.onClickOutSide();
    }
    return true;
  };

  return <div ref={node}>{props.children}</div>;
};

export default ClickOutSide;
