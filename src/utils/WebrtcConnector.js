// WebrtcConnector.js
import React, { useEffect } from 'react';
import { getYdoc } from './ydocManager';
import * as Y from 'yjs';

const WebrtcConnector = () => {
  useEffect(() => {
    const { ydoc } = getYdoc();
    const yarray = ydoc.get('array', Y.Array);

    yarray.observe(event => {
      console.log('Array changed:', event);
    });

    // Cleanup logic if needed

  }, []);

  return <div>WebRTC connection is active!</div>;
};

export default WebrtcConnector;
