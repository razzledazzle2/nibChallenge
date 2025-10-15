'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dog.ceo/api/breed/whippet/images');

        const data = await response.json();
        setImages(data.message);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [])

  const [currentImage, setCurrentImage] = useState(0)
  

  const handleNext = () => {
    if (currentImage + 1 > images.length - 1) {
      return 
    }
    setCurrentImage(prev => prev + 1) 
  }

  const handlePrev = () => {
    if (currentImage - 1 < 0) {
      return 
    }
    setCurrentImage(prev => prev - 1) 
  }
  return (
    <div className={styles.page}>
      <img 
        src={images[currentImage]}
        height={'300px'}
        width={'300px'}
      />
      <br />
      <button onClick={() => handleNext()}>Next</button>
      <button onClick={() => handlePrev()}>Prev</button>
    </div>
  );
}
