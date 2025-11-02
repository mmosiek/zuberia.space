+++
title = "Convert Images"
extra.hide_table_of_contents = true
+++

<div class="converter p-4 bg-gray-50 rounded-lg shadow-sm">
Supported formats: <strong>JPG, JPEG, PNG, WebP, GIF</strong><br>
Conversion happens locally in your browser, so your files are not uploaded anywhere.

---

Images:<br>
<input type="file" id="fileInput" accept=".jpg,.jpeg,.png,.webp" autocomplete="off" multiple class="mb-2"><br>

<label for="formatSelect">Convert to format:</label><br>
<select id="formatSelect" class="mb-2">
  <option value="png" selected>PNG</option>
  <option value="jpg">JPG</option>
  <option value="webp">WebP</option>
  <option value="gif">GIF</option>
</select><br>

---

<button id="convertBtn" class="bg-blue-600 text-white px-3 py-1 rounded mb-2">Convert</button>
<button id="zipBtn" class="bg-green-600 text-white px-3 py-1 rounded mb-2" style="display:none;">📦 Download All as ZIP</button>
<p id="status" class="text-sm text-gray-600 mt-2"></p>
<div id="downloadLinks" class="mt-3"></div>
</div>

<script src="/js/jszip.min.js"></script>
<script src="/js/gif.js"></script>
<script src="/js/converter.js"></script>


