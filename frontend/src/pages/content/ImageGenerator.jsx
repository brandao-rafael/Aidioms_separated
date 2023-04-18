import React, {
  useCallback, useContext, useEffect,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { generateImage } from '../../api';
// import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import AiContext from '../../hooks/AiContext';
import UserInput from '../../components/UserInput';

export default function ImageGenerator() {
  const {
    isLogged,
    cookies,
    notify,
    style,
    quantity,
    setQuantity,
    url,
    setUrl,
    filter,
    setFilter,
  } = useContext(AiContext);

  const requestImage = useCallback(async (prompt) => {
    notify('loading...');
    try {
      const response = await generateImage(cookies.token, prompt, Number(quantity), filter);
      setUrl(response.data?.base_64);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      notify('Something gone wrong');
    }
  }, [setUrl, url, cookies.token, filter, quantity]);

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    isLogged();
  }, []);
  return (
    <div>
      <Header />
      <div className="image-generator-container">
        <h1 style={{ color: style.color }}>Image Generator</h1>
        <UserInput submitMessage={requestImage} />
        <div className="image-filter">
          <fieldset>
            <h3 style={{ color: style.color }}>Modifiers</h3>
            <div className="filter">
              <div>
                <legend style={{ color: style.color }}>Style</legend>
                <select name="style" onChange={(e) => handleChange(e)} style={style}>
                  <option value="">Select Style</option>
                  <option value="Cartoon">Cartoon</option>
                  <option value="Realistic">Realistic</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Hard-drawn">Hard-drawn</option>
                  <option value="Watercolor">Watercolor</option>
                  <option value="Pixel art">Pixel art</option>
                </select>
              </div>
              <div>
                <legend style={{ color: style.color }}>Time Period</legend>
                <select name="time-period" onChange={(e) => handleChange(e)} style={style}>
                  <option value="">Select Time Period</option>
                  <option value="Ancient">Ancient</option>
                  <option value="Medieval">Medieval</option>
                  <option value="Renaissance">Renaissance</option>
                  <option value="Victorian">Victorian</option>
                  <option value="Modern">Modern</option>
                  <option value="Futuristic">Futuristic</option>
                </select>
              </div>
              <div className="dropdown">
                <legend style={{ color: style.color }}>Advanced Filters</legend>
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={style}>
                  More Filters
                  {' '}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <select name="mood-theme" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Mood/Theme</option>
                      <option value="Happy">Happy</option>
                      <option value="Sad">Sad</option>
                      <option value="Angry">Angry</option>
                      <option value="Playful">Playful</option>
                      <option value="Serious">Serious</option>
                      <option value="Dark">Dark</option>
                      <option value="Romantic">Romantic</option>
                    </select>
                  </li>
                  <li>
                    <select name="complexity" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Complexity</option>
                      <option value="Simple">Simple</option>
                      <option value="Detailed">Detailed</option>
                      <option value="Minimalist">Minimalist</option>
                      <option value="Intricate">Intricate</option>
                    </select>
                  </li>
                  <li>
                    <select name="color-scheme" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Color Scheme</option>
                      <option value="Monochrome">Monochrome</option>
                      <option value="Vibrant">Vibrant</option>
                      <option value="Pastel">Pastel</option>
                      <option value="Muted">Muted</option>
                      <option value="Black and white">Black and white</option>
                      <option value="Sepia">Sepia</option>
                    </select>
                  </li>
                  <li>
                    <select name="lighting" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Lighting</option>
                      <option value="Bright">Bright</option>
                      <option value="Soft">Soft</option>
                      <option value="Shadowy">Shadowy</option>
                      <option value="High contrast">High contrast</option>
                    </select>
                  </li>
                  <li>
                    <select name="setting" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Setting</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Urban">Urban</option>
                      <option value="Rural">Rural</option>
                      <option value="Nature">Nature</option>
                      <option value="Space">Space</option>
                    </select>
                  </li>
                  <li>
                    <select name="perspective" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Perspective</option>
                      <option value="Top-down">Top-down</option>
                      <option value="Side view">Side view</option>
                      <option value="First-person">First-person</option>
                      <option value="Third-person">Third-person</option>
                      <option value="Isometric">Isometric</option>
                    </select>
                  </li>
                  <li>
                    <select name="size" onChange={(e) => handleChange(e)} style={style}>
                      <option value="">Size</option>
                      <option value="256x256">Small</option>
                      <option value="512x512">Medium</option>
                      <option value="1024x1024">Large</option>
                    </select>
                  </li>
                </ul>
              </div>
              <div>
                <legend style={{ color: style.color, textAlign: 'center' }}>{`Number of images: ${quantity} `}</legend>
                <input
                  type="range"
                  min="1"
                  max="4"
                  style={{
                    width: '100%',
                    marginTop: '15px',
                  }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="grid text-center" style={{ '--bs-rows': 2, '--bs-columns': 2 }}>
          {
          url && url.map((img) => (
            <img
              src={`data:image/jpeg;base64,${img.b64_json}`}
              alt="generated by IA"
              key={img.b64_json}
              className="g-col-6"
              style={{ margin: '5px', borderRadius: '5px' }}
              value={`data:image/jpeg;base64,${img.b64_json}`}
            />
          ))
          }
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
    </div>
  );
}
