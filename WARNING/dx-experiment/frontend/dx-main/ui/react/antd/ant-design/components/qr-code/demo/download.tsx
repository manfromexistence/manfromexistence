import React from 'react';
import { Button, QRCode } from 'antd';

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const App: React.FC = () => (
  <div id="myqrcode">
    <QRCode value="https://ant.design/" bgColor="#fff" style={{ marginBottom: 16 }} />
    <Button type="primary" onClick={downloadQRCode}>
      Download
    </Button>
  </div>
);

export default App;
