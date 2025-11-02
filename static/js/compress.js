document.addEventListener("DOMContentLoaded", () => {
  const compressBtn = document.getElementById('compressBtn'),
        zipBtn = document.getElementById('zipBtn'),
        fileInput = document.getElementById('fileInput'),
        status = document.getElementById('status'),
        downloadLinks = document.getElementById('downloadLinks'),
        qualitySelect = document.getElementById('qualitySelect');

  const allowed = ['jpg','jpeg','png','webp'];
  let compressedFiles = [];

  const formatMB = s => (s/1024/1024).toFixed(2) + " MB";

  compressBtn.onclick = () => {
    let files = Array.from(fileInput.files);
    if(!files.length) return alert("Wybierz plik(i)!");

    const unsupported = [];
    files = files.filter(f => allowed.includes(f.name.split('.').pop().toLowerCase()) || unsupported.push(f.name));
    if(unsupported.length) alert(`Pominięto nieobsługiwane pliki:\n${unsupported.join('\n')}`);
    if(!files.length) return alert("Nie wybrano obsługiwanych plików!");

    zipBtn.style.display = "none";
    compressedFiles = [];
    downloadLinks.innerHTML = "";
    status.textContent = `⏳`;

    let processed = 0;
    const checkProcessed = () => {
      processed++;
      status.textContent = `✅ ${processed} / ${files.length}`;
      if(processed === files.length && files.length > 1){
        zipBtn.style.display = "inline-block";
      }
    };

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const maxSize = 1920;
          let w=img.width,h=img.height;
          if(w>h && w>maxSize){ h*=maxSize/w; w=maxSize; }
          else if(h>maxSize){ w*=maxSize/h; h=maxSize; }

          const canvas = document.createElement("canvas");
          canvas.width=w; canvas.height=h;
          canvas.getContext("2d").drawImage(img,0,0,w,h);

          canvas.toBlob(blob => {
            let url,name,cSize = blob.size, oSize = file.size;
            if(cSize>=oSize){
              url = URL.createObjectURL(file);
              name = file.name;
              cSize = oSize;
            } else {
              url = URL.createObjectURL(blob);
              name = `compressed-${file.name}`;
            }
            compressedFiles.push({name, blob: cSize>=oSize ? file : blob});

            const div = document.createElement("div");
            div.style.marginBottom="4px";
            const link = document.createElement("a");
            link.href=url;
            link.download=name;
            link.textContent=`📥 ${name} (${formatMB(oSize)} -> ${formatMB(cSize)})`;
            link.style.textDecoration="underline";
            link.onclick = ()=>setTimeout(()=>URL.revokeObjectURL(url),1000);
            div.appendChild(link);
            downloadLinks.appendChild(div);

            checkProcessed();
          }, "image/jpeg", parseFloat(qualitySelect.value));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  zipBtn.onclick = async () => {
    if(!compressedFiles.length) return alert("Najpierw skompresuj pliki!");
    status.textContent="⏳";
    const zip = new JSZip();
    compressedFiles.forEach(f => zip.file(f.name,f.blob));
    const content = await zip.generateAsync({type:"blob"});
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href=url;
    link.download="compressed_images.zip";
    link.click();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    status.textContent="✅";
  };

  document.addEventListener('paste', e => {
    const dt = new DataTransfer();
    [...fileInput.files].forEach(f => dt.items.add(f));
    [...(e.clipboardData || e.originalEvent.clipboardData).items]
      .filter(i => i.kind === 'file')
      .map(i => i.getAsFile())
      .filter(f => f && /\.(jpe?g|png|webp)$/i.test(f.name))
      .forEach(f => dt.items.add(f));
    fileInput.files = dt.files;
  });
});
