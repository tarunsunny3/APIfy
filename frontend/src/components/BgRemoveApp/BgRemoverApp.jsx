import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import "./BgRemoverAppStyles.scss";

const BgRemoverApp = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        var reader = new FileReader();
        let link = "";
        reader.onload = function (e) {
          link = e.target.result;
        };
        console.log("link is " + link);
        reader.readAsDataURL(current);
        return acc.concat([{ ...current, link }]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

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
      return false;
    }
    const fileSize = file.size;
    if (fileSize > 2 * 1024 * 1024) {
      return false;
    }
    return true;
  };
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        // files[i]["invalid"] = true;
        // setSelectedFiles((prevArray) => [...prevArray, files[i]]);

        setErrorMessage(`(${files[i].name}) File type not permitted`);
        // document.getElementById("alert").scrollIntoView();

        // setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
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
    var reader = new FileReader();
    var imgTag = document.getElementById("uploaded-img");
    reader.onload = function (e) {
      console.log(e.target.result);
    };
    reader.readAsDataURL(files[files.length - 1]);
  };
  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
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
        <img id="uploaded-img" src="#" width={400} height={400} />
        <div id="file-container" className="file-display-container">
          {validFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div
              // onClick={
              //   !data.invalid
              //     ? () => openImageModal(data)
              //     : () => removeFile(data.name)
              // }
              >
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.name}
                </span>
                <span className="file-size">({fileSize(data.size)})</span>{" "}
                <img src={data.link} width={200} height={200} />
              </div>
              <div
                className="file-remove"
                onClick={() => removeFile(data.name)}
              >
                X
              </div>
            </div>
          ))}
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
