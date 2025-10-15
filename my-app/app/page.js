"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breed/whippet/images"
        );

        const data = await response.json();
        setImages(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage + 1 > images.length - 1) {
      return;
    }
    setCurrentImage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentImage - 1 < 0) {
      return;
    }
    setCurrentImage((prev) => prev - 1);
  };

  const handleStart = () => {
    setCurrentImage(0);
  };

  const handleLast = () => {
    setCurrentImage(images.length - 1);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "300px",
        }}
      >
        <h1>Dog Pictures</h1>
      </div>
      {images.length > 0 ? (
        <Image
          src={images[currentImage]}
          alt="dog-photo"
          width={300}
          height={300}
        />
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginTop: "10px",
          maxWidth: "300px",
        }}
      >
        <button onClick={() => handleStart()}>Start</button>
        <button onClick={() => handlePrev()}>Prev</button>
        <button onClick={() => handleNext()}>Next</button>
        <button onClick={() => handleLast()}>Last</button>
      </div>
    </div>
  );
}
