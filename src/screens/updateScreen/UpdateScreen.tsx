import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const UpdateScreen = () => {
  const [imageSelectedPrevious, setImageSelectedPrevious] = useState("");
  const [totalImages, setTotalImages] = useState([]);
  const changeImage = (e: any) => {
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e: any) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result);
        setTotalImages((totalImages) => totalImages.concat(e.target.result));
      };
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <>
      <div className="flex col justify-center align-center mt-10">
        <div
          className="image-upload-wrap mr-10 ml-10 w-50 text-center color-primary"
          style={{
            height: "100px",
            border: "5px solid #1976d2",
          }}
        >
          <label className="">
            Please drag the image here
            <input
              className="file-upload-input"
              type="file"
              accept="image/x-png,image/jpg,image/jpeg"
              multiple
              onChange={(e) => {
                changeImage(e);
              }}
              style={{
                width: "100%",
                height: "100%",
                outline: "none",
                opacity: "0",
                cursor: "pointer",
              }}
            />
          </label>
        </div>
      </div>
      {imageSelectedPrevious && (
        <div className="flex justify-center align-center mt-10">
          <img
            src={imageSelectedPrevious}
            alt=""
            height="150px"
            width="250px"
          />
        </div>
      )}

      <div className="w-50 m-auto">
        <h2 className="text-center"> Library Upload Images</h2>
        <Slider {...settings}>
          {totalImages?.map((images, index) => {
            return (
              <div
                key={index}
                style={{
                  background: "red",
                  border: "1px solid black",
                }}
              >
                <img
                  src={images}
                  style={{ width: "100px", height: "100px" }}
                  alt={"prop"}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};
