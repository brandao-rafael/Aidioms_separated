import React, { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AiContext from '../../hooks/AiContext';
import { downloadByUrl } from '../../api';
import Header from '../../components/Header';

export default function PostVideo() {
  const { notify, style } = useContext(AiContext);
  const [videoUrl, setVideoUrl] = useState();

  const validateURL = () => /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+$/.test(videoUrl);

  const removePrefix = (url) => url.replace(/^https?:\/\/(www\.)?/, '');

  const handleSubmit = async () => {
    try {
      if (!validateURL()) {
        notify('invalid Url');
      }
      const url = removePrefix(videoUrl);
      await downloadByUrl(url);
      notify('Success, the video will be downloaded soon');
    } catch (error) {
      notify('Something gone wrong');
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', width: '80%', margin: '10px auto' }}>
        <input type="text" className="form-control" style={{ ...style, margin: '0 5px' }} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>Submit</button>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
