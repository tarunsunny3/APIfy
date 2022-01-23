import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BgRemoverAppStyles.scss";

const BgRemoverApp = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const blobToData = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
  // useEffect(() => {
  //   async function writeFilteredArray() {
  //     let filteredArr = [];
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       let fileObject = selectedFiles[i];
  //       let newVal = { file: fileObject.file };
  //       newVal["link"] = await blobToData(fileObject.file);
  //       filteredArr.push(newVal);
  //     }

  //     setValidFiles([...filteredArr]);
  //   }
  //   writeFilteredArray();
  // }, [selectedFiles]);

  useEffect(() => {
    if (errorMessage.length > 0) {
      var element = document.querySelector("#alert");

      // scroll to element
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  };

  const dragOver = (e) => {
    preventDefault(e);
    setIsActive(true);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
    setIsActive(false);
  };
  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return { result: false, message: "File type not permitted" };
    }
    const fileSize = file.size;
    if (fileSize > 2 * 1024 * 1024) {
      return { result: false, message: "File Size must be less than 2 MB" };
    }
    return { result: true, message: "" };
  };
  const handleFiles = async (files) => {
    // for (let i = 0; i < files.length; i++) {
    let res = validateFile(files[0]);
    if (res.result) {
      let link = await blobToData(files[0]);
      console.log(`link length is ${link.substring(link.length - 5)}`);
      // let imgEl = `<img  src="${link}" />`;

      setSelectedFile({ file: files[0], link });
      let area = document.querySelector("#uploaded-img");
      // area.style.width = "100px";
      // area.style.height = "500px";
      // area.style.display = "block";
      // area.style.display = "inline-block";
      // area.style.position = "relative";
      area.setAttribute("src", link);

      // document.getElementById("upload-area").style.height = "50%";
      // document.getElementById("upload-area").style.width = "100%";
      // document.getElementById("uploaded-img").setAttribute("src", link);
    } else {
      // files[i]["invalid"] = true;
      // setSelectedFiles((prevArray) => [...prevArray, files[i]]);

      setErrorMessage(`(${files[0].name}) ${res.message}`);
      // document.getElementById("alert").scrollIntoView();

      // setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
    }
    // }
  };
  const fileSize = (size) => {
    if (size === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const fileDrop = (e) => {
    setIsActive(false);
    setErrorMessage("");
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
    // var element = document.querySelector("#file-container:last-child");

    // // scroll to element
    // element.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const removeFile = (name) => {
    // const index = validFiles.findIndex((e) => e.file.name === name);
    // const index2 = selectedFiles.findIndex((e) => e.file.name === name);
    // // const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    // validFiles.splice(index, 1);
    // selectedFiles.splice(index2, 1);
    // setValidFiles([...validFiles]);
    // setSelectedFiles([...selectedFiles]);
    setSelectedFile(null);
  };

  const removeBG = async () => {
    var formData = new FormData();
    formData.append("file", selectedFile.file);

    const res = await axios.post("/api/bg/remove-bg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };
  return (
    <div className="bg-container">
      <div className="column-left">
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
      <div className="column-right">
        {errorMessage.length > 0 && (
          <p className="alert-box" id="alert">
            {errorMessage}
            <span>
              <i
                onClick={() => setErrorMessage("")}
                className="fa fa-times-circle close-icon"
                aria-hidden="true"
              ></i>
            </span>
          </p>
        )}

        {/* <div className="upload-body" id="upload-area"> */}
        {selectedFile == null && (
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
        )}
        {/* </div> */}

        {selectedFile != null && (
          <div className="upload-body">
            <div className="image-container">
              <div className="img-container">
                <img
                  src="#"
                  alt="Uploaded image"
                  id="uploaded-img"
                  className="uploaded-image"
                />
                <p
                  onClick={() => {
                    removeFile(selectedFile.name);
                  }}
                >
                  <span>
                    <i
                      className="fa fa-window-close delete-icon"
                      aria-hidden="true"
                    ></i>
                  </span>
                </p>
              </div>
            </div>
            <button onClick={() => removeBG()} className="remove-bg-btn">
              Remove bg
            </button>
          </div>
        )}
        {/*             
            <button
            onClick={() => {
              removeFile(selectedFile.name);
            }}
            className="remove-bg-btn"
          >
            Remove BG
          </button> */}
        {/* <div id="file-container" className="file-display-container">
          {validFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              {/* <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.file.name)}</div>
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.file.name}
                </span>
                <span className="file-size">({fileSize(data.file.size)})</span>{" "} 
              <div className="image-container">
                <img
                  className="uploaded-img"
                  src={data.link}
                  width={200}
                  height={200}
                />
                <p
                  onClick={() => {
                    removeFile(data.file.name);
                    console.log(data.file.name);
                  }}
                >
                  <span>
                    <i
                      className="fa fa-window-close delete-icon"
                      aria-hidden="true"
                    ></i>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div> */}
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
