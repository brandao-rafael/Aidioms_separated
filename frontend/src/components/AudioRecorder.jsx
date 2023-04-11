import React, {
  useState, useRef, useCallback, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import jumpAudio from '../assets/audio/jump.wav';
import AiContext from '../hooks/AiContext';

function AudioRecorder({ speechToText }) {
  const { notify } = useContext(AiContext);
  const [recording, setRecording] = useState(false);
  const [, setAudioBlob] = useState(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const playWarningAudio = useCallback(() => {
    const audio = new Audio(jumpAudio);
    audio.play();
  }, []);

  const timestampInSeconds = () => Date.now() / 1000;

  const startRecording = useCallback(async (timestamp) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const audioChunks = [];
      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      recorder.addEventListener('stop', async () => {
        const newAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioBlob(newAudioBlob);
        if (timestampInSeconds() - timestamp > 0.4) {
          await speechToText(newAudioBlob);
        } else {
          playWarningAudio();
        }
      });
      recorder.start();
      setRecording(true);
    } catch (error) {
      notify('Something gone wrong');
    }
  }, [speechToText, playWarningAudio]);

  const stopRecording = useCallback(() => {
    if (recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, [recording]);

  useEffect(() => () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }, []);

  useEffect(() => {
    let isRecordingStarted = false;

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.code === 'Space' && !isRecordingStarted) {
        isRecordingStarted = true;
        startRecording(timestampInSeconds());
      }
    };

    const handleKeyUp = (event) => {
      if (event.ctrlKey && event.code === 'Space') {
        isRecordingStarted = false;
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [startRecording, stopRecording]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-success"
        onPointerDown={() => startRecording(timestampInSeconds())}
        onPointerUp={stopRecording}
      >
        {recording ? (
          <i className="fa fa-stop" aria-hidden="true" />
        ) : (
          <i className="fa fa-microphone" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

AudioRecorder.propTypes = {
  speechToText: PropTypes.func.isRequired,
};

export default AudioRecorder;
