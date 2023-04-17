import React, { useCallback, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getVideo } from '../../api';
import Header from '../../components/Header';
import VideoPlayer from '../../components/VideoPlayer';
import AiContext from '../../hooks/AiContext';
import UserInput from '../../components/UserInput';

export default function Playphrase() {
  const {
    notify, isLogged, style, src, setSrc, subtitle, setSubtitle,
  } = useContext(AiContext);

  const searchVideo = useCallback(async (query) => {
    notify('Loading ...');
    try {
      const response = await getVideo(query.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
      setSubtitle(response.data.data.arraySegments);
      setSrc(response.data.data.arrayClips);
      toast.dismiss();
    } catch (error) {
      notify('something gone wrong');
    }
  }, [getVideo, notify, setSubtitle, setSrc, toast]);

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <div>
      <Header />
      <div className="playphrase-container">
        <h1 style={{ color: style.color }}>Playphrase</h1>
        <UserInput submitMessage={searchVideo} />
        {src && <VideoPlayer urls={src} subtitle={subtitle} />}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={100000}
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
