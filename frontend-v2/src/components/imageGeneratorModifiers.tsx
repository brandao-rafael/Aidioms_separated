import React, { useState } from "react";

type ImageGeneratorModifiersProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const ImageGeneratorModifiers: React.FC<ImageGeneratorModifiersProps> = ({
  handleChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <fieldset>
      <h3>Modifiers</h3>
      <div>
        <div>
          <legend>Style</legend>
          <select name="style" onChange={(e) => handleChange(e)}>
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
          <legend>Time Period</legend>
          <select name="time-period" onChange={(e) => handleChange(e)}>
            <option value="">Select Time Period</option>
            <option value="Ancient">Ancient</option>
            <option value="Medieval">Medieval</option>
            <option value="Renaissance">Renaissance</option>
            <option value="Victorian">Victorian</option>
            <option value="Modern">Modern</option>
            <option value="Futuristic">Futuristic</option>
          </select>
        </div>
        <div>
          {/* This need to be a dropdown */}
          <legend>Advanced Filters</legend>
          <button type="button" onClick={() => setShowFilters(!showFilters)}>
            More Filters{" "}
          </button>
          {showFilters && (
            <ul>
              <li>
                <select name="mood-theme" onChange={(e) => handleChange(e)}>
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
                <select name="complexity" onChange={(e) => handleChange(e)}>
                  <option value="">Complexity</option>
                  <option value="Simple">Simple</option>
                  <option value="Detailed">Detailed</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Intricate">Intricate</option>
                </select>
              </li>
              <li>
                <select name="color-scheme" onChange={(e) => handleChange(e)}>
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
                <select name="lighting" onChange={(e) => handleChange(e)}>
                  <option value="">Lighting</option>
                  <option value="Bright">Bright</option>
                  <option value="Soft">Soft</option>
                  <option value="Shadowy">Shadowy</option>
                  <option value="High contrast">High contrast</option>
                </select>
              </li>
              <li>
                <select name="setting" onChange={(e) => handleChange(e)}>
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
                <select name="perspective" onChange={(e) => handleChange(e)}>
                  <option value="">Perspective</option>
                  <option value="Top-down">Top-down</option>
                  <option value="Side view">Side view</option>
                  <option value="First-person">First-person</option>
                  <option value="Third-person">Third-person</option>
                  <option value="Isometric">Isometric</option>
                </select>
              </li>
              <li>
                <select name="size" onChange={(e) => handleChange(e)}>
                  <option value="">Size</option>
                  <option value="256x256">Small</option>
                  <option value="512x512">Medium</option>
                  <option value="1024x1024">Large</option>
                </select>
              </li>
            </ul>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export default ImageGeneratorModifiers;
