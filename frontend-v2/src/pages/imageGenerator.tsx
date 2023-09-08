import ImageGeneratorModifiers from "@/components/imageGeneratorModifiers";
import PromptInput from "@/components/promptInput";
import Image from "next/image";
import React, { useEffect } from "react";

interface Image {
  b64_json: string;
}

const ImageGenerator: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [urls, setUrls] = React.useState<Image[]>([]);
  const [quantity, setQuantity] = React.useState('0');
  useEffect(() => {
    setUrls([{b64_json: "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC"}]);
  }, []);
  return (
    <div>
    <div className="image-generator-container">
      <h3>Image Generator</h3>
      <PromptInput submitMessage={(value) => console.log(value)} />
      <div>
        <input
          type="range"
          min="1"
          max="4" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <p>{`Number of images: ${quantity} `}</p>
      </div>
      <ImageGeneratorModifiers handleChange={(e) => console.log(e)} />
      <div>
        {
        urls && urls.map((img: Image) => (
          <Image
            src={`data:image/jpeg;base64,${img.b64_json}`}
            alt="generated by IA"
            key={img.b64_json}
            width={300}
            height={300}
          />
        ))
        }
      </div>
    </div>
  </div>
  );
};

export default ImageGenerator;
