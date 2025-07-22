import React, { useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";

function Home() {
  const images = [
    "/shopping.jpg",
    "/shopping2.jpg",
    "/shopping3.jpg",
    "/kurti.jpg",
    "/kurti2.jpg",
    "/shopping4.jpg",
  ];
  const [currentImage, setCurrentImage] = React.useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage, length]);
  return (
    <div
      className="slider"
      style={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <SlArrowLeft
        className="sliderArrow"
        onClick={() => setCurrentImage((currentImage - 1 + length) % length)}
      />

      {images?.map((img, index) => {
        return (
          <div key={index}>
            {index === currentImage && (
              <Image
                src={images[currentImage]}
                alt={images[currentImage]}
                width={850}
                className="sliderImage"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                height={500}
              />
            )}
          </div>
        );
      })}
      <SlArrowRight
        className="sliderArrow"
        onClick={() => setCurrentImage((currentImage + 1) % length)}
      />
    </div>
  );
}

export default Home;
