import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getVideo } from '../../api';
import Header from '../../components/Header';
import VideoPlayer from '../../components/VideoPlayer';
import AiContext from '../../hooks/AiContext';
import UserInput from '../../components/UserInput';

export default function Playphrase() {
  const { notify, isLogged } = useContext(AiContext);
  const [src, setSrc] = useState();

  const searchVideo = async (query) => {
    notify('Loading ...');
    try {
      const response = await getVideo(query.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
      setSrc(response.data.urls);
      toast.dismiss();
    } catch (error) {
      notify('something gone wrong');
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <div>
      <Header />
      <div className="playphrase-container">
        <UserInput submitMessage={searchVideo} />
        {src && <VideoPlayer urls={src} />}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={15000}
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
  );
}
