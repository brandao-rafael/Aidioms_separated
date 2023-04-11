import React, { useContext } from 'react';
import AiContext from '../../hooks/AiContext';

export default function PageNotFound() {
  const { style } = useContext(AiContext);
  return (
    <div style={{ ...style, textAlign: 'center' }}>
      <h1>Page not found</h1>
    </div>
  );
}
