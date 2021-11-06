const form          = document.querySelector("form")
const fileInput     = document.querySelector(".file-input")
const progressArea  = document.querySelector(".progress-area")
const uploadedArea  = document.querySelector(".uploaded-area")

form.addEventListener("click", event =>{
    if (event.target.className == 'form-input password-input') return

    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];

    if (file) {
        let fileName = file.name;

       /**
        * If file name length is greater than 12 then split it and add "..."
        */
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }

        /**
         * Calling uploadFile with passing file name as an argument
         */
        uploadFile(fileName);
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/upload.php");

    xhr.upload.addEventListener("progress", ({ loaded, total }) => {

       /**
        * Getting percentage of loaded file size
        */
        let fileLoaded = Math.floor((loaded / total) * 100);

       /**
        * Gettting total file size in KB from bytes
        */
        let fileTotal = Math.floor(total / 1000);

        let fileSize;

       /**
        * If file size is less than 1024 then add only KB else convert this KB into MB
        */
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";

        let progressHTML = `
            <li class="row">
              <i class="fas fa-file-alt"></i>
              
              <div class="content">
                  <div class="details">
                      <span class="name">${name} • Uploading</span>
                      <span class="percent">${fileLoaded}%</span>
                  </div>
                  
                  <div class="progress-bar">
                      <div class="progress" style="width: ${fileLoaded}%"></div>
                  </div>
              </div>
            </li>`;

        uploadedArea.classList.add("onprogress");

        progressArea.innerHTML = progressHTML;

        if (loaded == total) {
            progressArea.innerHTML = "";

            let uploadedHTML = `
                <a href="#" class="uploaded-file-link" data-filename="${name}" target="_blank">
                    <li class="row uploaded-file">
                        <div class="content upload">
                            <i class="fas fa-file-alt"></i>
                            
                            <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                            </div>
                        </div>
                        
                        <i class="fas fa-check"></i>
                    </li>
                </a>`;

            uploadedArea.classList.remove("onprogress");

            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
    });

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let filename = xhr.responseText

            let uploadedFileLink = document.querySelector(`[data-filename="${name}"]`)
            uploadedFileLink.href = `http://localhost/file-upload-with-progress/${filename}`
        }
    };


    let data = new FormData(form);

    xhr.send(data);
}
