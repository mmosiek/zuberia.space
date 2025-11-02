+++
title = "Konwertuj obrazy"
extra.hide_table_of_contents = true
+++

<div class="converter p-4 bg-gray-50 rounded-lg shadow-sm">
Obsługiwane formaty: <strong>JPG, JPEG, PNG, WebP, GIF</strong><br>
Konwersja odbywa się lokalnie w przeglądarce, więc twoje dane nie są nigdzie wysyłane.

---

Obrazy:<br>
<input type="file" id="fileInput" accept=".jpg,.jpeg,.png,.webp,.gif" autocomplete="off" multiple class="mb-2"><br>

<label for="formatSelect">Konwertuj do formatu:</label><br>
<select id="formatSelect" class="mb-2">
  <option value="png" selected>PNG</option>
  <option value="jpg">JPG</option>
  <option value="webp">WebP</option>
  <option value="gif">GIF</option>
</select><br>

---

<button id="convertBtn" class="bg-blue-600 text-white px-3 py-1 rounded mb-2">Konwertuj</button>
<button id="zipBtn" class="bg-green-600 text-white px-3 py-1 rounded mb-2" style="display:none;">📦 Pobierz wszystko jako ZIP</button>
<p id="status" class="text-sm text-gray-600 mt-2"></p>
<div id="downloadLinks" class="mt-3"></div>
</div>

<script src="/js/jszip.min.js"></script>
<script src="/js/gif.js"></script>
<script src="/js/converter.js"></script>



