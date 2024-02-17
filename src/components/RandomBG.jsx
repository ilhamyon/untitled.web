import { useState, useEffect } from "react";

const RandomBG = () => {
  const [imageSrc, setImageSrc] = useState("");

  const imageList = ["https://sekolah.link/wp-content/uploads/2022/10/group-excited-teenagers-school-uniforms-using-laptop-together-with-clenched-fist-movements.jpg", "https://sekolah.link/wp-content/uploads/2023/02/Tips-Mencari-Teman-Ketika-Pendaftaran-Siswa-Baru-2048x1365.jpg"];

  useEffect(() => {
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    setImageSrc(randomImage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {imageSrc ? (
          <img
          src={imageSrc}
          alt="best bid & quick quote"
          className="w-full lg:h-screen h-40 object-cover"
          />
      ) : null}
    </>
  );
};

export default RandomBG;
