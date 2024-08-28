// ydocManager.js
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

let ydoc = null;
let provider = null;

export const getYdoc = () => {
  if (!ydoc) {
    ydoc = new Y.Doc();
    provider = new WebrtcProvider('your-room-name', ydoc, { 
      password: 'optional-room-password',
      signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com'],
    });
  }
  return { ydoc, provider };
};
