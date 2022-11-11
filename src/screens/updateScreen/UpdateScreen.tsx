import React, { useState } from "react";

export const UpdateScreen = () => {
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState("");
  const changeImage = (e: any) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e: any) => {
        e.preventDefault();
        console.log("render", e.target.result);
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
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
          {/* <div>
            <h3 className="color-primary"> Preview image with drag and drop</h3>
          </div> */}
        </div>
      </div>
      {ImageSelectedPrevious && (
        <div className="flex justify-center align-center mt-10">
          <img
            src={ImageSelectedPrevious}
            alt=""
            height="150px"
            width="250px"
          />
        </div>
      )}
    </>
  );
};
