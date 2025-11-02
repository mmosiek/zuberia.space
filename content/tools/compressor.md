+++
title = "Kompresuj obrazy"
extra.hide_table_of_contents = true
+++

<div class="compressor p-4 bg-gray-50 rounded-lg shadow-sm">
Obsługiwane formaty: <strong>JPG, JPEG, PNG, WebP</strong><br>
Kompresja odbywa się lokalnie w przeglądarce więc twoje dane nie są nigdzie wysyłane.

---

Obrazy:<br>
<input type="file" id="fileInput" accept=".jpg,.jpeg,.png,.webp" autocomplete="off" multiple class="mb-2"><br>

<label for="qualitySelect">Jakość:</label><br>
<select id="qualitySelect" class="mb-2">
  <option value="0.1">Ekstra Niska (~90%)</option>
  <option value="0.2">Bardzo niska (~80%)</option>
  <option value="0.3">Niska (~70%)</option>
  <option value="0.5">Średnia (~50%)</option>
  <option value="0.8" selected>Wysoka (~20%)</option>
  <option value="0.9">Bardzo Wysoka (~10%)</option>
</select><br>

---

<button id="compressBtn" class="bg-blue-600 text-white px-3 py-1 rounded mb-2">Kompresuj</button>
<button id="zipBtn" class="bg-green-600 text-white px-3 py-1 rounded mb-2" style="display:none;">📦 Pobierz wszystko jako ZIP</button>
<p id="status" class="text-sm text-gray-600 mt-2"></p>
<div id="downloadLinks" class="mt-3"></div>
</div>

<script src="/js/jszip.min.js"></script>
<script src="/js/compress.js"></script>


