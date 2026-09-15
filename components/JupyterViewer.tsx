// components/JupyterViewer.jsx
'use client';

import { IpynbRenderer } from 'react-ipynb-renderer';
import 'react-ipynb-renderer/dist/styles/monokai.css'; // Optional syntax theme

interface JupyterViewerProps {
  notebookData: any; // Or Use `any` if react-ipynb-renderer handles internal parsing
}

export default function JupyterViewer({ notebookData }: JupyterViewerProps) {
  return (
    <div className="ipynb-container">
      <IpynbRenderer 
        ipynb={notebookData} 
        syntaxTheme="xonokai"
      />
    </div>
  );
}