+++
title = "Compress Images"
extra.hide_table_of_contents = true
+++

<div class="compressor p-4 bg-gray-50 rounded-lg shadow-sm">
Supported formats: <strong>JPG, JPEG, PNG, WebP</strong><br>
Compression happens locally in your browser, so your files are not sent anywhere.

---

Images:<br>
<input type="file" id="fileInput" accept=".jpg,.jpeg,.png,.webp" autocomplete="off" multiple class="mb-2"><br>

<label for="qualitySelect">Quality:</label><br>
<select id="qualitySelect" class="mb-2">
  <option value="0.1">Extra Low (~90%)</option>
  <option value="0.2">Very Low (~80%)</option>
  <option value="0.3">Low (~70%)</option>
  <option value="0.5">Medium (~50%)</option>
  <option value="0.8" selected>High (~20%)</option>
  <option value="0.9">Very High (~10%)</option>
</select><br>

---

<button id="compressBtn" class="bg-blue-600 text-white px-3 py-1 rounded mb-2">Compress</button>
<button id="zipBtn" class="bg-green-600 text-white px-3 py-1 rounded mb-2" style="display:none;">📦 Download All as ZIP</button>
<p id="status" class="text-sm text-gray-600 mt-2"></p>
<div id="downloadLinks" class="mt-3"></div>
</div>

<script src="/js/jszip.min.js"></script>
<script src="/js/compress.js"></script>


