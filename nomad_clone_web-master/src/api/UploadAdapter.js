import axios from "axios";

export default class UploadAdapter {
  constructor(loader, url) {
    this.url = url;
    this.loader = loader;
    this.loader.file.then((pic) => (this.file = pic));
    this.upload();
  }
  // Starts the upload process.
  upload() {
    if (typeof this.file == "undefined" || this.file == null) {
      return;
    }
    const formdate = new FormData();
    formdate.append("file", this.file); // your image

    return new Promise((resolve, reject) => {
      axios
        .post(this.url, formdate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("nomadToken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          // resolve(response.data);
          resolve({
            default: response.data.url,
          });
        })
        .catch((error) => {
          reject("Server Error");
        });
    });
  }
}
