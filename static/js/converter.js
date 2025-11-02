document.addEventListener("DOMContentLoaded", () => {
  const convertBtn = document.getElementById('convertBtn'),
        zipBtn = document.getElementById('zipBtn'),
        fileInput = document.getElementById('fileInput'),
        status = document.getElementById('status'),
        downloadLinks = document.getElementById('downloadLinks'),
        formatSelect = document.getElementById('formatSelect');

  const allowed = ['jpg','jpeg','png','webp','gif'];
  let convertedFiles = [];

  const formatMB = s => (s/1024/1024).toFixed(2) + " MB";

  convertBtn.onclick = () => {
    let files = Array.from(fileInput.files);
    if(!files.length) return alert("Wybierz plik(i)!");

    const unsupported = [];
    files = files.filter(f => allowed.includes(f.name.split('.').pop().toLowerCase()) || unsupported.push(f.name));
    if(unsupported.length) alert(`Pominięto nieobsługiwane pliki:\n${unsupported.join('\n')}`);
    if(!files.length) return alert("Nie wybrano obsługiwanych plików!");

    zipBtn.style.display = "none";
    convertedFiles = [];
    downloadLinks.innerHTML = "";
    status.textContent = `⏳`;

    let processed = 0;
    const checkProcessed = () => {
      processed++;
      status.textContent = `✅ ${processed} / ${files.length}`;
      if(processed === files.length && files.length > 1){
        zipBtn.style.display = "inline-block";
      } else if(processed === files.length) {
        zipBtn.style.display = "none";
      }
    };

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const selectedFormat = formatSelect.value;

          if(selectedFormat === "gif") {
            const gif = new GIF({
              workers: 2,
              quality: 10,
              workerScript: '/js/gif.worker.js'
            });

            gif.addFrame(img, {delay: 500});
            gif.on('finished', blob => {
              const name = file.name.replace(/\.[^.]+$/, '') + '.gif';
              convertedFiles.push({name, blob});

              const div = document.createElement("div");
              div.style.marginBottom="4px";
              const link = document.createElement("a");
              const url = URL.createObjectURL(blob);
              link.href = url;
              link.download = name;
              link.textContent=`📥 ${name} (${formatMB(file.size)})`;
              link.style.display = "block";
              link.style.textDecoration="underline";
              link.className = "text-blue-600";
              link.onclick = ()=>setTimeout(()=>URL.revokeObjectURL(url),1000);
              div.appendChild(link);
              downloadLinks.appendChild(div);

              checkProcessed();
            });

            gif.render();
          } else {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img,0,0,img.width,img.height);

            canvas.toBlob(blob => {
              const name = file.name.replace(/\.[^.]+$/, '') + '.' + selectedFormat;
              convertedFiles.push({name, blob});

              const div = document.createElement("div");
              div.style.marginBottom="4px";
              const link = document.createElement("a");
              const url = URL.createObjectURL(blob);
              link.href = url;
              link.download = name;
              link.textContent=`📥 ${name} (${formatMB(file.size)})`;
              link.style.display = "block";
              link.style.textDecoration="underline";
              link.className = "text-blue-600";
              link.onclick = ()=>setTimeout(()=>URL.revokeObjectURL(url),1000);
              div.appendChild(link);
              downloadLinks.appendChild(div);

              checkProcessed();
            }, 'image/' + selectedFormat, 1);
          }

        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  zipBtn.onclick = async () => {
    if(!convertedFiles.length) return alert("Najpierw skonwertuj pliki!");
    status.textContent="⏳";
    const zip = new JSZip();
    convertedFiles.forEach(f => zip.file(f.name, f.blob));
    const content = await zip.generateAsync({type:"blob"});
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download="converted_images.zip";
    link.click();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    status.textContent="✅";
  };
});
