import React from "react";

import "./BgRemoverAppStyles.scss";

const BgRemoverApp = () => {
  const [isActive, setIsActive] = React.useState(false);
  const dragOver = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setIsActive(false);
  };
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}
  const handleFiles = (files) => {
}
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
        handleFiles(files);
    }
  };
  return (
    <div className="container">
      <div className="column1">
        <div className="text-box">
          <p className="content-title">Remove Image background</p>
          <p className="content-subtitle">100% automatic and free</p>
          <img
            className="bg-image"
            src="/bg.jfif"
            alt="sample background image"
          />
        </div>
      </div>
      <div className="column2">
        <div className="upload-body">
          <div
            className={`drag-area ${isActive ? "active" : ""}`}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
            <div className="icon">
              <i className="fas fa-cloud-upload-alt"></i>
            </div>
            <header>Drag & Drop to Upload File</header>
            <span>OR</span>
            <button>Browse File</button>
            <input type="file" hidden />
          </div>
        </div>
        {/* <div className="upload-box">
          <p>
            <span>
              <i className="fas fa-2x fa-image image-icon"></i>
            </span>
          </p>
          <p className="content">
            File should be png, jpg and should be less than 5mb
          </p>

          <button className="upload-btn">
            Upload Image &nbsp;
            <span>
              <i className="fas fa-file-upload"></i>
            </span>
          </button>
          <p className="bottom-text">or drop the file?</p>
        </div> */}
      </div>
    </div>
  );
};

export default BgRemoverApp;
