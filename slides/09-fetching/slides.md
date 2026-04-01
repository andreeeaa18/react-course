---
title: 'React Course'
theme: neversink
transition: slide-left
layout: cover
color: sky-light
info: 'React Course · Crudu Cristian · 2026'
lineNumbers: true
draw:
  enabled: true
favicon: './react.svg'
---

# Comunicarea cu Backend-ul
Fetch API și HTTP în React

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce este HTTP?

:: content ::

<div class="grid grid-cols-2 gap-8 text-base">

<div class="space-y-4">

**HTTP** = HyperText Transfer Protocol

- Protocol **text-based** — poți citi mesajele raw cu ochiul liber
- Funcționează pe modelul **client → server** (request → response)
- **Stateless** — serverul nu ține minte nimic între request-uri
- Stă deasupra **TCP** care se ocupă de livrarea efectivă a datelor

<AdmonitionType type="info">

**HTTPS** = HTTP + **TLS** (criptare). Același protocol, dar mesajele sunt criptate în tranzit. Astăzi, orice site serios folosește HTTPS.

</AdmonitionType>

</div>

<div class="flex flex-col items-center gap-0 text-sm">

  <div class="bg-sky-100 border-2 border-sky-400 rounded-xl px-8 py-3 text-center w-56 font-bold text-sky-800">
    HTTP / HTTPS
    <div class="text-xs font-normal text-sky-600">Aplicație — mesajele noastre</div>
  </div>
  <div class="w-px h-4 bg-gray-300"></div>
  <div class="bg-amber-50 border-2 border-amber-300 rounded-xl px-8 py-3 text-center w-56 font-bold text-amber-800">
    TLS
    <div class="text-xs font-normal text-amber-600">Securitate — criptare</div>
  </div>
  <div class="w-px h-4 bg-gray-300"></div>
  <div class="bg-green-50 border-2 border-green-300 rounded-xl px-8 py-3 text-center w-56 font-bold text-green-800">
    TCP
    <div class="text-xs font-normal text-green-600">Transport — livrare fiabilă</div>
  </div>
 

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Evoluția HTTP — versiuni

:: content ::

<div class="text-sm">

<!-- Axa cronologică -->
<div class="relative px-6 mb-5">
  <div class="absolute top-3.5 left-6 right-6 h-0.5 bg-gray-300 z-0"></div>
  <div class="flex justify-between relative z-10">
    <div class="flex flex-col items-center">
      <div class="w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
      <div class="font-bold text-gray-700 text-xs mt-1">0.9</div>
      <div class="text-xs text-gray-500">1991</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="w-4 h-4 rounded-full bg-amber-400 border-2 border-white"></div>
      <div class="font-bold text-amber-700 text-xs mt-1">1.0</div>
      <div class="text-xs text-amber-600">1996</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="w-5 h-5 rounded-full bg-sky-500 border-2 border-white"></div>
      <div class="font-bold text-sky-700 text-xs mt-1">1.1</div>
      <div class="text-xs text-sky-600">1997</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="w-4 h-4 rounded-full bg-violet-500 border-2 border-white"></div>
      <div class="font-bold text-violet-700 text-xs mt-1">2</div>
      <div class="text-xs text-violet-600">2015</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
      <div class="font-bold text-emerald-700 text-xs mt-1">3</div>
      <div class="text-xs text-emerald-600">2022</div>
    </div>
  </div>
</div>

<!-- Carduri detalii -->
<div class="grid grid-cols-5 gap-2">

  <div class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs space-y-0.5">
    <div>Doar <code>GET</code></div>
    <div>Fără headers</div>
    <div>Fără status codes</div>
    <div class="text-gray-500">Răspuns = doar HTML</div>
  </div>

  <div class="rounded-lg border border-amber-300 bg-amber-50 p-2 text-xs space-y-0.5">
    <div>Headers + status codes</div>
    <div><code>POST</code>, <code>HEAD</code></div>
    <div><code>Content-Type</code></div>
    <div class="text-red-600 font-semibold">1 req = 1 conexiune TCP</div>
  </div>

  <div class="rounded-lg border-2 border-sky-400 bg-sky-50 p-2 text-xs space-y-0.5">
    <div class="text-green-700 font-semibold">Conexiuni persistente</div>
    <div><code>PUT</code>, <code>PATCH</code>, <code>DELETE</code></div>
    <div>Chunked transfer, cache</div>
    <div class="text-sky-700 font-bold">Încă cel mai folosit</div>
  </div>

  <div class="rounded-lg border border-violet-300 bg-violet-50 p-2 text-xs space-y-0.5">
    <div class="text-green-700 font-semibold">Multiplexing (paralel)</div>
    <div>Protocol binar, nu text</div>
    <div>Header compression</div>
    <div class="text-violet-700">~35% din trafic</div>
  </div>

  <div class="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-xs space-y-0.5">
    <div class="font-semibold">QUIC peste UDP</div>
    <div>0-RTT — conexiune instant</div>
    <div>Rezistent la packet loss</div>
    <div class="text-emerald-700">~30% din trafic</div>
  </div>

</div>

<AdmonitionType type="info" class="mt-3">

**HTTP/3** e folosit deja de Google, Cloudflare și Meta. Avantajul major: pe rețele mobile sau instabile, conexiunea nu se pierde la schimbarea de IP (ex: treci de la Wi-Fi la 4G). Browserele moderne îl suportă, dar serverele adoptă mai lent.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Un Request HTTP — cum arată?

:: content ::

<div class="grid grid-cols-[1fr_auto] gap-6 text-sm">

<div class="rounded-lg overflow-hidden border-2 border-gray-300 font-mono text-sm">
  <div class="bg-sky-100 px-4 py-2 border-b-2 border-sky-300">
    <span class="text-sky-900 font-bold">POST /api/users HTTP/1.1</span>
  </div>
  <div class="bg-amber-50 px-4 py-2 border-b border-amber-200 text-amber-900 leading-relaxed">
    Host: api.example.com<br>
    Content-Type: application/json<br>
    Authorization: Bearer eyJhbGci...<br>
    Accept: application/json
  </div>
  <div class="bg-gray-100 px-4 py-1 border-b border-gray-300">
    <span class="text-gray-400 italic text-xs">&nbsp;</span>
  </div>
  <div class="bg-green-50 px-4 py-2 text-green-900">
    { "name": "Ana", "email": "ana@ex.com" }
  </div>
</div>

<div class="flex flex-col justify-between text-xs py-1">
  <div class="flex items-center gap-2">
    <span class="text-sky-600">←</span>
    <div>
      <div class="font-bold text-sky-800">Request Line</div>
      <div class="text-gray-500">metodă + path + versiune</div>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-amber-600">←</span>
    <div>
      <div class="font-bold text-amber-800">Headers</div>
      <div class="text-gray-500">perechi cheie: valoare</div>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-gray-400">←</span>
    <div>
      <div class="font-bold text-gray-600">Linie goală</div>
      <div class="text-gray-500">separator obligatoriu</div>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-green-600">←</span>
    <div>
      <div class="font-bold text-green-800">Body</div>
      <div class="text-gray-500">date trimise (opțional)</div>
    </div>
  </div>
</div>

</div>

<AdmonitionType type="tip" class="mt-3">

Fiecare mesaj HTTP e **pur text**. Deschide **DevTools → Network → click pe un request → Headers** și vei vedea exact această structură.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Un Response HTTP — cum arată?

:: content ::

<div class="grid grid-cols-[1fr_auto] gap-6 text-sm">

<div class="rounded-lg overflow-hidden border-2 border-gray-300 font-mono text-sm">
  <div class="bg-sky-100 px-4 py-2 border-b-2 border-sky-300">
    <span class="text-sky-900 font-bold">HTTP/1.1 200 OK</span>
  </div>
  <div class="bg-amber-50 px-4 py-2 border-b border-amber-200 text-amber-900 leading-relaxed">
    Content-Type: application/json<br>
    Cache-Control: max-age=3600<br>
    ETag: "abc123"<br>
    X-RateLimit-Remaining: 99
  </div>
  <div class="bg-gray-100 px-4 py-1 border-b border-gray-300">
    <span class="text-gray-400 italic text-xs">&nbsp;</span>
  </div>
  <div class="bg-green-50 px-4 py-2 text-green-900">
    [{ "id": 1, "name": "Ana Popescu" },<br>
    &nbsp;{ "id": 2, "name": "Ion Dumitrescu" }]
  </div>
</div>

<div class="flex flex-col justify-between text-xs py-1">
  <div class="flex items-center gap-2">
    <span class="text-sky-600">←</span>
    <div>
      <div class="font-bold text-sky-800">Status Line</div>
      <div class="text-gray-500">versiune + status code + mesaj</div>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-amber-600">←</span>
    <div>
      <div class="font-bold text-amber-800">Headers</div>
      <div class="text-gray-500">metadata despre răspuns</div>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-gray-400">←</span>
    <div>
      <div class="font-bold text-gray-600">Linie goală</div>
      <div class="text-gray-500">separator obligatoriu</div>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-green-600">←</span>
    <div>
      <div class="font-bold text-green-800">Body</div>
      <div class="text-gray-500">datele cerute (de obicei JSON)</div>
    </div>
  </div>
</div>

</div>

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">

<AdmonitionType type="info">

Structura e **identică** cu cea a request-ului — doar prima linie diferă: **status line** în loc de **request line**.

</AdmonitionType>

<AdmonitionType type="warning">

Browserul **ascunde** aceste detalii — de aceea DevTools e esențial pentru debugging.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ciclul Request-Response

:: content ::

<div class="grid grid-cols-2 gap-8 text-base">

<div class="space-y-4">

Orice comunicare web urmează același tipar simplu:

1. **Client** trimite un **request** (cerere)
2. **Server** procesează cererea
3. **Server** trimite înapoi un **response** (răspuns)

Browserul tău face asta de zeci de ori per pagină — pentru HTML, CSS, imagini, date JSON.

<AdmonitionType type="tip" class="mt-4">

Deschide **DevTools → Network** în Chrome și reîncarcă orice pagină. Vei vedea fiecare request în timp real.

</AdmonitionType>

</div>

<div class="flex gap-4 items-stretch h-56 text-xs">

  <div class="flex flex-col items-center w-24 flex-shrink-0">
    <div class="bg-sky-100 border-2 border-sky-400 rounded-xl px-2 py-3 text-center w-full">
      <div class="text-2xl">🌐</div>
      <div class="font-bold text-sky-800 text-xs">CLIENT</div>
    </div>
    <div class="w-0.5 flex-1 bg-sky-300"></div>
  </div>

  <div class="flex-1 flex flex-col justify-around py-2">
    <div class="space-y-1">
      <div class="flex items-center gap-1">
        <div class="flex-1 h-px bg-sky-400"></div>
        <span class="bg-sky-50 border border-sky-300 px-1.5 py-0.5 rounded font-mono text-sky-800 whitespace-nowrap">GET /api/users</span>
        <div class="flex-1 h-px bg-sky-400"></div>
        <span class="text-sky-500 font-bold text-base">→</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-green-500 font-bold text-base">←</span>
        <div class="flex-1 h-px bg-green-400"></div>
        <span class="bg-green-50 border border-green-300 px-1.5 py-0.5 rounded font-mono text-green-800 whitespace-nowrap">200 OK + JSON</span>
        <div class="flex-1 h-px bg-green-400"></div>
      </div>
    </div>
    <div class="space-y-1">
      <div class="flex items-center gap-1">
        <div class="flex-1 h-px bg-sky-400"></div>
        <span class="bg-sky-50 border border-sky-300 px-1.5 py-0.5 rounded font-mono text-sky-800 whitespace-nowrap">POST /api/login</span>
        <div class="flex-1 h-px bg-sky-400"></div>
        <span class="text-sky-500 font-bold text-base">→</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-green-500 font-bold text-base">←</span>
        <div class="flex-1 h-px bg-green-400"></div>
        <span class="bg-green-50 border border-green-300 px-1.5 py-0.5 rounded font-mono text-green-800 whitespace-nowrap">201 Created</span>
        <div class="flex-1 h-px bg-green-400"></div>
      </div>
    </div>
    <div class="space-y-1">
      <div class="flex items-center gap-1">
        <div class="flex-1 h-px bg-sky-400"></div>
        <span class="bg-sky-50 border border-sky-300 px-1.5 py-0.5 rounded font-mono text-sky-800 whitespace-nowrap">GET /pagina-lipsa</span>
        <div class="flex-1 h-px bg-sky-400"></div>
        <span class="text-sky-500 font-bold text-base">→</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-red-500 font-bold text-base">←</span>
        <div class="flex-1 h-px bg-red-400"></div>
        <span class="bg-red-50 border border-red-300 px-1.5 py-0.5 rounded font-mono text-red-800 whitespace-nowrap">404 Not Found</span>
        <div class="flex-1 h-px bg-red-400"></div>
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center w-24 flex-shrink-0">
    <div class="bg-orange-100 border-2 border-orange-400 rounded-xl px-2 py-3 text-center w-full">
      <div class="text-2xl">⚡</div>
      <div class="font-bold text-orange-800 text-xs">SERVER</div>
    </div>
    <div class="w-0.5 flex-1 bg-orange-300"></div>
  </div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anatomia unui URL

:: content ::

<div class="text-sm">

<div class="flex items-stretch gap-0 font-mono text-base justify-center">
  <div class="bg-violet-200 px-3 py-2.5 text-violet-900 font-bold rounded-l-lg border-y-2 border-l-2 border-violet-300">https://</div>
  <div class="bg-blue-200 px-3 py-2.5 text-blue-900 font-bold border-y-2 border-blue-300">api.example.com</div>
  <div class="bg-gray-200 px-3 py-2.5 text-gray-600 border-y-2 border-gray-300">:443</div>
  <div class="bg-green-200 px-3 py-2.5 text-green-900 font-bold border-y-2 border-green-300">/users/42</div>
  <div class="bg-orange-200 px-3 py-2.5 text-orange-900 font-bold border-y-2 border-orange-300">?sort=asc&page=1</div>
  <div class="bg-red-200 px-3 py-2.5 text-red-900 font-bold rounded-r-lg border-y-2 border-r-2 border-red-300">#profile</div>
</div>

<div class="grid grid-cols-6 gap-2 mt-3">

  <div class="bg-violet-50 rounded-lg border border-violet-200 p-2">
    <div class="font-bold text-violet-800 mb-1">Protocol</div>
    <div class="text-xs text-gray-700 space-y-0.5">
      <div><code>https</code> — criptat (TLS)</div>
      <div><code>http</code> — necriptat</div>
      <div class="text-violet-600">Determină <strong>cum</strong> comunicăm</div>
    </div>
  </div>

  <div class="bg-blue-50 rounded-lg border border-blue-200 p-2">
    <div class="font-bold text-blue-800 mb-1">Host</div>
    <div class="text-xs text-gray-700 space-y-0.5">
      <div>Domeniul sau IP-ul serverului</div>
      <div>Se rezolvă prin DNS</div>
      <div class="text-blue-600">Determină <strong>unde</strong> trimitem</div>
    </div>
  </div>

  <div class="bg-gray-50 rounded-lg border border-gray-200 p-2">
    <div class="font-bold text-gray-700 mb-1">Port</div>
    <div class="text-xs text-gray-700 space-y-0.5">
      <div><code>443</code> = HTTPS (implicit)</div>
      <div><code>80</code> = HTTP (implicit)</div>
      <div class="text-gray-500">De obicei omis în URL</div>
    </div>
  </div>

  <div class="bg-green-50 rounded-lg border border-green-200 p-2">
    <div class="font-bold text-green-800 mb-1">Path</div>
    <div class="text-xs text-gray-700 space-y-0.5">
      <div>Identifică <strong>resursa</strong> cerută</div>
      <div><code>/users/42</code> = userul cu id 42</div>
      <div class="text-green-600">Determină <strong>ce</strong> cerem</div>
    </div>
  </div>

  <div class="bg-orange-50 rounded-lg border border-orange-200 p-2">
    <div class="font-bold text-orange-800 mb-1">Query Params</div>
    <div class="text-xs text-gray-700 space-y-0.5">
      <div>Perechi <code>cheie=valoare</code></div>
      <div>Separate prin <code>&</code></div>
      <div class="text-orange-600">Filtre, sortare, paginare</div>
    </div>
  </div>

  <div class="bg-red-50 rounded-lg border border-red-200 p-2">
    <div class="font-bold text-red-800 mb-1">Fragment</div>
    <div class="text-xs text-gray-700 space-y-0.5">
      <div>Navighează în pagină</div>
      <div><strong>Nu se trimite</strong> la server!</div>
      <div class="text-red-600">Procesat doar de browser</div>
    </div>
  </div>

</div>

<AdmonitionType type="tip" class="mt-3">

În JavaScript accesezi părțile unui URL cu `new URL("https://...")` — obții `.protocol`, `.host`, `.pathname`, `.searchParams`, `.hash`.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Metode HTTP

:: content ::

<div class="text-sm">

<div class="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-x-4 gap-y-1 items-center">

  <div class="font-bold text-gray-500 text-xs">Metodă</div>
  <div class="font-bold text-gray-500 text-xs">Scop</div>
  <div class="font-bold text-gray-500 text-xs">Exemplu</div>
  <div class="font-bold text-gray-500 text-xs text-center">Body?</div>
  <div class="font-bold text-gray-500 text-xs text-center">Idempotent?</div>

  <div class="col-span-5 h-px bg-gray-200"></div>

  <div class="font-mono font-bold text-green-700 bg-green-50 px-2 py-1 rounded">GET</div>
  <div>Obține o resursă sau o listă de resurse</div>
  <div class="font-mono text-xs text-gray-600">GET /api/users/42</div>
  <div class="text-center text-red-400">Nu</div>
  <div class="text-center text-green-600">Da</div>

  <div class="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">POST</div>
  <div>Creează o resursă nouă</div>
  <div class="font-mono text-xs text-gray-600">POST /api/users</div>
  <div class="text-center text-green-600">Da</div>
  <div class="text-center text-red-400">Nu</div>

  <div class="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">PUT</div>
  <div>Înlocuiește complet o resursă</div>
  <div class="font-mono text-xs text-gray-600">PUT /api/users/42</div>
  <div class="text-center text-green-600">Da</div>
  <div class="text-center text-green-600">Da</div>

  <div class="font-mono font-bold text-orange-700 bg-orange-50 px-2 py-1 rounded">PATCH</div>
  <div>Actualizează parțial o resursă</div>
  <div class="font-mono text-xs text-gray-600">PATCH /api/users/42</div>
  <div class="text-center text-green-600">Da</div>
  <div class="text-center text-green-600">Da</div>

  <div class="font-mono font-bold text-red-700 bg-red-50 px-2 py-1 rounded">DELETE</div>
  <div>Șterge o resursă</div>
  <div class="font-mono text-xs text-gray-600">DELETE /api/users/42</div>
  <div class="text-center text-gray-400">Rar</div>
  <div class="text-center text-green-600">Da</div>

  <div class="col-span-5 h-px bg-gray-200"></div>

  <div class="font-mono font-bold text-violet-700 bg-violet-50 px-2 py-1 rounded">OPTIONS</div>
  <div>Întreabă ce metode sunt permise</div>
  <div class="font-mono text-xs text-gray-600">OPTIONS /api/users</div>
  <div class="text-center text-red-400">Nu</div>
  <div class="text-center text-green-600">Da</div>

  <div class="font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">HEAD</div>
  <div>Ca GET, dar primești doar headers (fără body)</div>
  <div class="font-mono text-xs text-gray-600">HEAD /api/users/42</div>
  <div class="text-center text-red-400">Nu</div>
  <div class="text-center text-green-600">Da</div>

</div>

<div class="grid grid-cols-2 gap-3 mt-3">

<AdmonitionType type="info">

**Idempotent** = poți apela de 10 ori și rezultatul e identic. `POST` nu e idempotent — fiecare apel creează o resursă nouă.

</AdmonitionType>

<AdmonitionType type="warning">

**OPTIONS** e trimis automat de browser ca **preflight request** înainte de CORS — vom vedea mai în detaliu la secțiunea Fetch.

</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Status Codes

:: content ::

<div class="text-xs w-[95%] mx-auto">

<div class="grid grid-cols-5 gap-1">

  <!-- 1xx -->
  <div class="rounded-lg border-2 border-sky-300 overflow-hidden">
    <div class="bg-sky-100 px-1.5 py-1 font-bold text-sky-800 text-sm">1xx — Informativ</div>
    <div class="px-1.5 py-1.5 space-y-1">
      <div class="flex items-start gap-1">
        <code class="text-sky-700 font-bold shrink-0">100</code>
        <div><strong>Continue</strong> — serverul a primit headers, trimite body-ul</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-sky-700 font-bold shrink-0">101</code>
        <div><strong>Switching Protocols</strong> — upgrade la WebSocket</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-sky-700 font-bold shrink-0">103</code>
        <div><strong>Early Hints</strong> — preîncarcă resurse (CSS, fonturi)</div>
      </div>
    </div>
  </div>

  <!-- 2xx -->
  <div class="rounded-lg border-2 border-green-300 overflow-hidden">
    <div class="bg-green-100 px-1.5 py-1 font-bold text-green-800 text-sm">2xx — Succes</div>
    <div class="px-1.5 py-1.5 space-y-1">
      <div class="flex items-start gap-1">
        <code class="text-green-700 font-bold shrink-0">200</code>
        <div><strong>OK</strong> — răspuns standard pentru GET, PATCH</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-green-700 font-bold shrink-0">201</code>
        <div><strong>Created</strong> — resursa a fost creată (POST)</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-green-700 font-bold shrink-0">204</code>
        <div><strong>No Content</strong> — succes, fără body (DELETE)</div>
      </div>
    </div>
  </div>

  <!-- 3xx -->
  <div class="rounded-lg border-2 border-amber-300 overflow-hidden">
    <div class="bg-amber-100 px-1.5 py-1 font-bold text-amber-800 text-sm">3xx — Redirect</div>
    <div class="px-1.5 py-1.5 space-y-1">
      <div class="flex items-start gap-1">
        <code class="text-amber-700 font-bold shrink-0">301</code>
        <div><strong>Moved Permanently</strong> — URL-ul s-a schimbat definitiv</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-amber-700 font-bold shrink-0">304</code>
        <div><strong>Not Modified</strong> — folosește versiunea din cache</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-amber-700 font-bold shrink-0">307</code>
        <div><strong>Temporary Redirect</strong> — redirecție temporară, păstrează metoda</div>
      </div>
    </div>
  </div>

  <!-- 4xx -->
  <div class="rounded-lg border-2 border-red-300 overflow-hidden">
    <div class="bg-red-100 px-1.5 py-1 font-bold text-red-800 text-sm">4xx — Eroare client</div>
    <div class="px-1.5 py-1.5 space-y-1">
      <div class="flex items-start gap-1">
        <code class="text-red-700 font-bold shrink-0">400</code>
        <div><strong>Bad Request</strong> — JSON malformat</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-red-700 font-bold shrink-0">401</code>
        <div><strong>Unauthorized</strong> — neautentificat</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-red-700 font-bold shrink-0">403</code>
        <div><strong>Forbidden</strong> — fără permisiune</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-red-700 font-bold shrink-0">404</code>
        <div><strong>Not Found</strong> — nu există</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-red-700 font-bold shrink-0">422</code>
        <div><strong>Unprocessable</strong> — validare eșuată</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-red-700 font-bold shrink-0">429</code>
        <div><strong>Too Many Requests</strong> — rate limit</div>
      </div>
    </div>
  </div>

  <!-- 5xx -->
  <div class="rounded-lg border-2 border-violet-300 overflow-hidden">
    <div class="bg-violet-100 px-1.5 py-1 font-bold text-violet-800 text-sm">5xx — Eroare server</div>
    <div class="px-1.5 py-1.5 space-y-1">
      <div class="flex items-start gap-1">
        <code class="text-violet-700 font-bold shrink-0">500</code>
        <div><strong>Internal Error</strong> — bug, excepție neprinsă</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-violet-700 font-bold shrink-0">502</code>
        <div><strong>Bad Gateway</strong> — proxy eșuat</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-violet-700 font-bold shrink-0">503</code>
        <div><strong>Unavailable</strong> — supraîncărcat</div>
      </div>
      <div class="flex items-start gap-1">
        <code class="text-violet-700 font-bold shrink-0">504</code>
        <div><strong>Gateway Timeout</strong> — fără răspuns</div>
      </div>
    </div>
  </div>

</div>

<div class="flex items-center justify-between mt-2 bg-gray-50 rounded-lg px-3 py-1.5">
  <div class="flex items-center gap-1.5">
    <div class="w-3 h-3 rounded-full bg-sky-400"></div>
    <span><strong>1xx</strong> — așteaptă</span>
  </div>
  <div class="flex items-center gap-1.5">
    <div class="w-3 h-3 rounded-full bg-green-400"></div>
    <span><strong>2xx</strong> — totul e bine</span>
  </div>
  <div class="flex items-center gap-1.5">
    <div class="w-3 h-3 rounded-full bg-amber-400"></div>
    <span><strong>3xx</strong> — caută în altă parte</span>
  </div>
  <div class="flex items-center gap-1.5">
    <div class="w-3 h-3 rounded-full bg-red-400"></div>
    <span><strong>4xx</strong> — vina ta (client)</span>
  </div>
  <div class="flex items-center gap-1.5">
    <div class="w-3 h-3 rounded-full bg-violet-400"></div>
    <span><strong>5xx</strong> — vina lor (server)</span>
  </div>
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Request Headers — ce trimite clientul

:: content ::

<div class="text-sm">

Headers sunt perechi **cheie: valoare** atașate fiecărui mesaj HTTP. Ele controlează autentificarea, formatul datelor, cache-ul și multe altele.

<div class="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 mt-3 items-center text-xs">
  <div class="font-bold text-gray-500">Header</div>
  <div class="font-bold text-gray-500">Ce face</div>
  <div class="font-bold text-gray-500">Exemplu</div>
  <div class="col-span-3 h-px bg-gray-200"></div>
  <code class="text-sky-800 font-bold">Content-Type</code>
  <div>Formatul body-ului trimis — serverul știe cum să-l parseze</div>
  <code class="text-gray-500">application/json</code>
  <code class="text-sky-800 font-bold">Accept</code>
  <div>Ce format vrem în răspuns (negociere de conținut)</div>
  <code class="text-gray-500">application/json</code>
  <code class="text-sky-800 font-bold">Authorization</code>
  <div>Token de autentificare — JWT, API key, Basic auth</div>
  <code class="text-gray-500">Bearer eyJhbGci...</code>
  <code class="text-sky-800 font-bold">Cookie</code>
  <div>Trimite automat cookie-urile stocate pentru acest domeniu</div>
  <code class="text-gray-500">session_id=abc123</code>
  <code class="text-sky-800 font-bold">User-Agent</code>
  <div>Informații despre browser — serverul poate adapta răspunsul</div>
  <code class="text-gray-500">Mozilla/5.0 Chrome/...</code>
  <code class="text-sky-800 font-bold">Origin</code>
  <div>Domeniul de unde vine request-ul — esențial pentru CORS</div>
  <code class="text-gray-500">https://my-app.com</code>
  <code class="text-sky-800 font-bold">If-None-Match</code>
  <div>Trimite ETag-ul din cache — serverul returnează 304 dacă e neschimbat</div>
  <code class="text-gray-500">"v1-abc123"</code>
  <code class="text-sky-800 font-bold">Cache-Control</code>
  <div>Controlează caching-ul request-ului (forțează refresh, etc.)</div>
  <code class="text-gray-500">no-cache</code>
  <code class="text-sky-800 font-bold">Referer</code>
  <div>URL-ul paginii de pe care s-a făcut request-ul</div>
  <code class="text-gray-500">https://my-app.com/dashboard</code>
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Response Headers — ce răspunde serverul

:: content ::

<div class="text-sm">

<div class="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 items-center text-xs">
  <div class="font-bold text-gray-500">Header</div>
  <div class="font-bold text-gray-500">Ce face</div>
  <div class="font-bold text-gray-500">Exemplu</div>
  <div class="col-span-3 h-px bg-gray-200"></div>
  <code class="text-green-800 font-bold">Content-Type</code>
  <div>Formatul body-ului din răspuns — browserul știe cum să-l afișeze</div>
  <code class="text-gray-500">application/json; charset=utf-8</code>
  <code class="text-green-800 font-bold">Cache-Control</code>
  <div>Cât timp și cum să fie stocat în cache</div>
  <code class="text-gray-500">max-age=3600, must-revalidate</code>
  <code class="text-green-800 font-bold">ETag</code>
  <div>Versiunea resursei — clientul o trimite înapoi cu <code>If-None-Match</code></div>
  <code class="text-gray-500">"v1-abc123"</code>
  <code class="text-green-800 font-bold">Set-Cookie</code>
  <div>Setează un cookie în browser (sesiune, preferințe, tracking)</div>
  <code class="text-gray-500">session_id=abc; HttpOnly; Secure</code>
  <code class="text-green-800 font-bold">Access-Control-Allow-Origin</code>
  <div>Ce domenii au voie să acceseze răspunsul (CORS)</div>
  <code class="text-gray-500">https://my-app.com</code>
  <code class="text-green-800 font-bold">X-RateLimit-Remaining</code>
  <div>Câte request-uri mai poți face înainte de a fi blocat</div>
  <code class="text-gray-500">97</code>
  <code class="text-green-800 font-bold">Location</code>
  <div>URL-ul pentru redirecționare (folosit cu 301, 302, 307)</div>
  <code class="text-gray-500">https://api.example.com/v2/users</code>
  <code class="text-green-800 font-bold">Retry-After</code>
  <div>Câte secunde să aștepți înainte de a re-încerca (cu 429, 503)</div>
  <code class="text-gray-500">60</code>
  <code class="text-green-800 font-bold">Content-Length</code>
  <div>Dimensiunea body-ului în bytes — util pentru progress bars</div>
  <code class="text-gray-500">4523</code>
</div>

<AdmonitionType type="tip" class="mt-3">

Headers sunt **case-insensitive** — `Content-Type`, `content-type` și `CONTENT-TYPE` sunt identice. Headerele care încep cu `X-` sunt custom (non-standard).

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# JSON — Formatul Standard al API-urilor

:: content ::

<div class="grid grid-cols-[1fr_auto] gap-6 text-sm">

<div class="space-y-3">

**JSON** (JavaScript Object Notation) — formatul pe care aproape orice API modern îl folosește. E un subset strict al JavaScript — arată ca un obiect JS, dar cu reguli mai rigide.

```json
{
  "id": 42,
  "name": "Ana Popescu",
  "email": "ana@example.com",
  "roles": ["user", "admin"],
  "address": {
    "city": "Cluj",
    "country": "România"
  },
  "active": true,
  "createdAt": "2026-01-15T10:30:00Z"
}
```

<div class="grid grid-cols-3 gap-2 text-xs mt-1">
  <div class="bg-blue-50 rounded px-2 py-1"><code>"text"</code> — String</div>
  <div class="bg-green-50 rounded px-2 py-1"><code>42</code>, <code>3.14</code> — Number</div>
  <div class="bg-amber-50 rounded px-2 py-1"><code>true</code> / <code>false</code> — Boolean</div>
  <div class="bg-violet-50 rounded px-2 py-1"><code>[...]</code> — Array</div>
  <div class="bg-orange-50 rounded px-2 py-1"><code>{...}</code> — Object</div>
  <div class="bg-gray-100 rounded px-2 py-1"><code>null</code> — Null</div>
</div>

</div>

<div class="space-y-3 text-xs w-64">

<div class="font-bold text-sm mb-1">JSON vs JavaScript Object</div>

<div class="rounded-lg border border-gray-200 overflow-hidden">
  <div class="bg-red-50 px-3 py-1.5 font-bold text-red-800 text-xs">JSON (strict)</div>
  <div class="px-3 py-1.5 font-mono text-xs">
    { <span class="text-green-700">"name"</span>: <span class="text-blue-700">"Ana"</span> }
  </div>
</div>

<div class="rounded-lg border border-gray-200 overflow-hidden">
  <div class="bg-green-50 px-3 py-1.5 font-bold text-green-800 text-xs">JS Object (flexibil)</div>
  <div class="px-3 py-1.5 font-mono text-xs">
    { <span class="text-green-700">name</span>: <span class="text-blue-700">'Ana'</span> }
  </div>
</div>

<div class="space-y-1 mt-2">
  <div class="font-bold text-sm">Diferențe cheie:</div>
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div>Cheile <strong>trebuie</strong> în ghilimele duble</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div>Doar ghilimele duble, nu simple</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div>Fără virgulă la sfârșit (trailing comma)</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div>Fără comentarii (<code>//</code> sau <code>/* */</code>)</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div>Fără <code>undefined</code>, <code>Date</code>, <code>Function</code></div>
  </div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# JSON în JavaScript

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="space-y-3">

**Parsare — String → Object:**

```js
// Răspunsul vine ca string de la server
const text = '{"name": "Ana", "age": 22}';

// Parsăm în obiect JavaScript
const data = JSON.parse(text);
console.log(data.name); // "Ana"
console.log(data.age);  // 22

// ⚠️ Dacă string-ul e invalid → eroare!
try {
  JSON.parse("not json");
} catch (e) {
  console.error("JSON invalid:", e.message);
}
```

<AdmonitionType type="tip">

`fetch()` face automat `JSON.parse()` când apelezi `response.json()` — nu trebuie să parsezi manual.

</AdmonitionType>

</div>

<div class="space-y-3">

**Serializare — Object → String:**

```js
const user = { name: "Ana", age: 22, active: true };

// Compact (pentru trimitere la server)
JSON.stringify(user);
// '{"name":"Ana","age":22,"active":true}'

// Pretty print (pentru debug)
JSON.stringify(user, null, 2);

// Cu replacer — filtrează câmpuri
JSON.stringify(user, ["name", "age"]);
// '{"name":"Ana","age":22}'
```

**Ce se pierde la `stringify`:**

<div class="text-xs space-y-1">
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div><code>undefined</code> → dispare complet din obiect</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-red-500 font-bold shrink-0">✗</span>
    <div><code>Function</code> → dispare complet</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-amber-500 font-bold shrink-0">!</span>
    <div><code>Date</code> → devine string ISO (<code>"2026-01-15T..."</code>), nu revine automat la Date la parse</div>
  </div>
  <div class="flex items-start gap-1.5">
    <span class="text-amber-500 font-bold shrink-0">!</span>
    <div><code>NaN</code>, <code>Infinity</code> → devin <code>null</code></div>
  </div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Înainte de Fetch — XMLHttpRequest

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="space-y-3">

**XMLHttpRequest (XHR)** — modul vechi de a face request-uri HTTP din browser. Introdus de Microsoft în 1999, a fost standard-ul web timp de ~15 ani.

```js
// ❌ XMLHttpRequest — mult de scris și bazat pe callbackuri
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/users');
xhr.responseType = 'json';

xhr.onload = function () {
  if (xhr.status === 200) {
    console.log(xhr.response);
  } else {
    console.error('Eroare:', xhr.status);
  }
};

xhr.onerror = function () {
  console.error('Eroare de rețea');
};

xhr.send();
```

</div>

<div class="space-y-3">

**De ce s-a trecut la Fetch?**

<div class="space-y-2 text-xs">
  <div class="flex items-start gap-2">
    <span class="text-red-500 font-bold shrink-0">XHR</span>
    <div>API bazat pe <b>events și callbacks</b> — greu de compus și de citit</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-red-500 font-bold shrink-0">XHR</span>
    <div>Nu suportă <b>Promises</b> — callback hell cu request-uri în lanț</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-red-500 font-bold shrink-0">XHR</span>
    <div>API inconsistent — <code>onload</code>, <code>onerror</code>, <code>onreadystatechange</code></div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-red-500 font-bold shrink-0">XHR</span>
    <div>Nu suportă <b>streaming</b> al răspunsului</div>
  </div>
</div>

<div class="space-y-2 text-xs mt-3">
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">fetch</span>
    <div>Bazat pe <b>Promises</b> → <code>async/await</code>, ușor de compus</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">fetch</span>
    <div>API simplu și consistent: <code>fetch(url, options)</code></div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">fetch</span>
    <div>Suportă <b>streaming</b>, <b>AbortController</b>, <b>Request/Response</b> objects</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">fetch</span>
    <div>Standard modern — suportat în toate browserele și Node.js 18+</div>
  </div>
</div>

<AdmonitionType type="info" class="mt-3">

Librării precum **jQuery.ajax()** și **Axios** au apărut ca wrapper-uri peste XHR. Axios e încă popular, dar `fetch` nativ e suficient în 2026.

</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# fetch() — Anatomia unui apel

:: content ::

<div class="text-sm space-y-4">

<div class="grid grid-cols-2 gap-6">

<div>

```js
// Sintaxa completă
const response = await fetch(url, {
  method: 'POST',           // GET, POST, PUT, PATCH, DELETE
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
  },
  body: JSON.stringify(data), // doar pentru POST/PUT/PATCH
  signal: controller.signal,  // pentru anulare (AbortController)
  credentials: 'include',    // trimite cookies cross-origin
  mode: 'cors',              // cors | no-cors | same-origin
  cache: 'no-cache',         // default | no-cache | reload | ...
});
```

</div>

<div>

**Obiectul Response:**

<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs items-center">
  <code class="text-sky-800 font-bold">response.ok</code>
  <div><code>true</code> dacă status e 200-299</div>
  <code class="text-sky-800 font-bold">response.status</code>
  <div>Codul numeric (200, 404, 500...)</div>
  <code class="text-sky-800 font-bold">response.statusText</code>
  <div>Mesajul ("OK", "Not Found"...)</div>
  <code class="text-sky-800 font-bold">response.headers</code>
  <div>Obiect Headers (cu <code>.get()</code>)</div>
  <code class="text-sky-800 font-bold">response.url</code>
  <div>URL-ul final (după redirects)</div>
  <div class="col-span-2 h-px bg-gray-200 my-1"></div>
  <div class="col-span-2 font-bold text-gray-600">Metode de extragere a body-ului:</div>
  <code class="text-green-800 font-bold">.json()</code>
  <div>Parsează ca JSON → obiect JS</div>
  <code class="text-green-800 font-bold">.text()</code>
  <div>Returnează ca string brut</div>
  <code class="text-green-800 font-bold">.blob()</code>
  <div>Pentru fișiere binare (imagini, PDF)</div>
  <code class="text-green-800 font-bold">.formData()</code>
  <div>Pentru date de formular</div>
  <code class="text-green-800 font-bold">.arrayBuffer()</code>
  <div>Buffer binar raw</div>
</div>

</div>

</div>

<AdmonitionType type="warning">

Body-ul poate fi citit **o singură dată**! Dacă apelezi `.json()` și apoi `.text()` pe același response, al doilea apel va eșua. Folosește `response.clone()` dacă ai nevoie de body de mai multe ori.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# GET Request — primul fetch

:: content ::

<FetchBasicDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# POST Request — trimitem date

:: content ::

<FetchPostDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# fetch() nu aruncă eroare la 404!

:: content ::

<div class="text-sm mb-2">

Cea mai frecventă greșeală: `fetch` consideră orice răspuns de la server ca succes. **Doar erorile de rețea** (server down, DNS fail, CORS blocat) aruncă excepție.

</div>

<FetchErrorDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — De ce nu merge fetch-ul?

:: content ::

<div class="text-sm">

<div class="grid grid-cols-[1fr_auto] gap-6">

<div class="space-y-3">

**CORS** (Cross-Origin Resource Sharing) — browserul blochează request-urile între domenii diferite ca protecție de securitate.

**Ce înseamnă "origin" diferit?**

<div class="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 text-xs items-center mt-1">
  <code>http://localhost:3000</code> <span class="text-green-600 font-bold">→ same origin</span>
  <code>http://localhost:3000/api</code> <span class="text-green-600 font-bold">→ same origin</span>
  <code>http://localhost:<strong>4000</strong></code> <span class="text-red-500 font-bold">→ cross-origin (port diferit)</span>
  <code><strong>https</strong>://localhost:3000</code> <span class="text-red-500 font-bold">→ cross-origin (protocol diferit)</span>
  <code>https://<strong>api.example</strong>.com</code> <span class="text-red-500 font-bold">→ cross-origin (host diferit)</span>
</div>

<div class="rounded-lg overflow-hidden border-2 border-red-300 text-xs font-mono mt-3">
  <div class="bg-red-50 px-3 py-2 text-red-800">
    Access to fetch at <strong>'https://api.example.com'</strong><br>
    from origin <strong>'http://localhost:3000'</strong> has been<br>
    blocked by CORS policy: No 'Access-Control-Allow-Origin'<br>
    header is present on the requested resource.
  </div>
</div>

</div>

<div class="w-56 space-y-2">

<AdmonitionType type="warning">

CORS e o protecție a **browserului**, nu a serverului! Același request merge din Postman, `curl` sau Node.js.

</AdmonitionType>

<AdmonitionType type="info">

Fără CORS, un site cu intenții rele ar putea face request-uri la banca ta folosind cookie-urile tale de sesiune.

</AdmonitionType>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — Request-uri Simple

:: content ::

<div class="text-sm space-y-4">

Pentru request-uri **simple** (GET, HEAD, sau POST cu `Content-Type: text/plain`, `application/x-www-form-urlencoded` sau `multipart/form-data`), browserul trimite direct request-ul și verifică răspunsul:

<div class="flex items-stretch gap-4 mt-2">

  <div class="bg-sky-100 rounded-lg p-4 border-2 border-sky-300 flex-1">
    <div class="font-bold text-sky-800 mb-2">Browser → Server</div>
    <div class="font-mono text-xs space-y-0.5">
      <div>GET /api/users HTTP/1.1</div>
      <div>Host: api.example.com</div>
      <div class="text-sky-700 font-bold">Origin: http://localhost:3000</div>
    </div>
  </div>

  <div class="flex items-center text-gray-300 text-2xl">→</div>

  <div class="bg-green-100 rounded-lg p-4 border-2 border-green-300 flex-1">
    <div class="font-bold text-green-800 mb-2">Server → Browser</div>
    <div class="font-mono text-xs space-y-0.5">
      <div>HTTP/1.1 200 OK</div>
      <div>Content-Type: application/json</div>
      <div class="text-green-700 font-bold">Access-Control-Allow-Origin: *</div>
    </div>
  </div>

</div>

<div class="grid grid-cols-2 gap-4 mt-2">

<AdmonitionType type="info">

Browserul **adaugă automat** `Origin` la orice request cross-origin. Nu poți controla sau elimina acest header din JavaScript.

</AdmonitionType>

<AdmonitionType type="warning">

Dacă serverul **nu include** `Access-Control-Allow-Origin` în răspuns, browserul blochează accesul la date — chiar dacă serverul a răspuns cu 200 OK.

</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — Preflight Request

:: content ::

<div class="text-sm space-y-3">

Pentru request-uri **complexe** (POST cu JSON, PUT, DELETE, custom headers), browserul trimite **mai întâi** un request `OPTIONS` pentru a cere permisiunea. De ce? Aceste operații pot **modifica date** pe server — browserul verifică înainte să le trimită.

<div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 mt-2 text-xs">

  <div class="flex items-center justify-center">
    <div class="bg-violet-200 text-violet-800 font-bold rounded-full w-7 h-7 flex items-center justify-center">1</div>
  </div>
  <div class="bg-violet-50 rounded-lg p-3 border border-violet-200">
    <div class="font-bold text-violet-800 mb-1">Browser trimite automat OPTIONS (preflight)</div>
    <div class="font-mono space-y-0.5">
      <div>OPTIONS /api/users HTTP/1.1</div>
      <div>Origin: http://localhost:3000</div>
      <div>Access-Control-Request-Method: DELETE</div>
      <div>Access-Control-Request-Headers: Authorization, Content-Type</div>
    </div>
    <div class="text-gray-500 mt-1">„Vreau să fac DELETE cu header Authorization — ai voie să-mi permiți?"</div>
  </div>

  <div class="flex items-center justify-center">
    <div class="bg-violet-200 text-violet-800 font-bold rounded-full w-7 h-7 flex items-center justify-center">2</div>
  </div>
  <div class="bg-violet-50 rounded-lg p-3 border border-violet-200">
    <div class="font-bold text-violet-800 mb-1">Serverul confirmă ce permite</div>
    <div class="font-mono space-y-0.5">
      <div>HTTP/1.1 204 No Content</div>
      <div>Access-Control-Allow-Origin: http://localhost:3000</div>
      <div>Access-Control-Allow-Methods: GET, POST, DELETE</div>
      <div>Access-Control-Allow-Headers: Authorization, Content-Type</div>
      <div>Access-Control-Max-Age: 86400</div>
    </div>
    <div class="text-gray-500 mt-1">„Da, accept DELETE cu Authorization. Ține minte 24h (<code>Max-Age</code>)."</div>
  </div>

  <div class="flex items-center justify-center">
    <div class="bg-green-200 text-green-800 font-bold rounded-full w-7 h-7 flex items-center justify-center">3</div>
  </div>
  <div class="bg-green-50 rounded-lg p-3 border border-green-200">
    <div class="font-bold text-green-800 mb-1">Abia acum browserul trimite request-ul real</div>
    <div class="font-mono">DELETE /api/users/42 HTTP/1.1</div>
    <div class="text-gray-500 mt-1">Preflight-ul se repetă doar după expirarea <code>Max-Age</code>.</div>
  </div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — Soluția 1: Configurare Server

:: content ::

<div class="text-sm space-y-4">

Serverul adaugă explicit headerele care permit accesul cross-origin:

```js
// Express.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // permite cookies cross-origin
}));
```

<AdmonitionType type="info">

**Soluția standard** — funcționează atât în development cât și în producție. Backend-ul decide explicit cine are acces la resurse.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — Soluția 2: Proxy în Dev Server

:: content ::

<div class="text-sm space-y-4">

CORS e o restricție **doar a browserului** — comunicarea server-to-server nu are CORS. Un **proxy** (un intermediar care face request-uri în locul tău) exploatează asta: `fetch('/api/users')` merge la Vite (same-origin, deci **fără CORS**), iar Vite redirecționează server-side către API:

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
};
```

<div class="text-sky-700"><code>fetch('/api/users')</code> → browserul trimite la <code>localhost:3000</code> (same-origin) → Vite trimite server-side la <code>localhost:4000</code></div>

<AdmonitionType type="warning">

Funcționează **doar în development**. În producție, configurați CORS pe server (soluția 1) sau folosiți un reverse proxy (Nginx).

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — Soluția 3: Reverse Proxy în Producție

:: content ::

<div class="text-sm space-y-4">

<div class="grid grid-cols-2 gap-6">

<div class="space-y-3">

Un **reverse proxy** (ex: Nginx, Caddy) e un server care stă **în fața** aplicațiilor tale și rutează request-urile către serviciul corect. Clientul vede un **singur domeniu** — nu știe că în spate sunt servere diferite.

<div class="text-xs space-y-1 mt-2">

**În producție**, aplicația React e un **build static** (HTML, CSS, JS) — nu un dev server. Nginx servește aceste fișiere direct de pe disc și redirecționează request-urile API către backend:

</div>

<AdmonitionType type="info" class="mt-2">

Browserul vede totul ca **same-origin** (`example.com`) — CORS nu se aplică deloc, nu e nevoie de headere speciale.

</AdmonitionType>

</div>

<div class="space-y-3">

<div class="flex flex-col items-center gap-0 text-xs">

  <div class="bg-sky-100 border-2 border-sky-400 rounded-xl px-6 py-2 text-center w-48 font-bold text-sky-800">
    Browser
    <div class="text-xs font-normal text-sky-600">example.com</div>
  </div>
  <div class="w-px h-5 bg-gray-300"></div>

  <div class="bg-amber-100 border-2 border-amber-400 rounded-xl px-6 py-3 text-center w-56 font-bold text-amber-800">
    Reverse Proxy (Nginx)
    <div class="text-xs font-normal text-amber-600">example.com — port 80/443</div>
  </div>

  <div class="grid grid-cols-2 gap-8 mt-0">
    <div class="flex flex-col items-center">
      <div class="w-px h-5 bg-gray-300"></div>
      <div class="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-2 text-center font-bold text-green-800">
        Fișiere Statice
        <div class="text-xs font-normal text-green-600">React build — /var/www/</div>
      </div>
      <div class="text-gray-500 mt-1">example.com/*</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="w-px h-5 bg-gray-300"></div>
      <div class="bg-violet-50 border-2 border-violet-300 rounded-xl px-4 py-2 text-center font-bold text-violet-800">
        Backend API
        <div class="text-xs font-normal text-violet-600">Express — port 4000</div>
      </div>
      <div class="text-gray-500 mt-1">example.com/api/*</div>
    </div>
  </div>

</div>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# CORS — Soluția 3: Configurare Nginx

:: content ::

<div class="text-sm space-y-4">

<div class="grid grid-cols-2 gap-5">

<div class="space-y-3">

```nginx
server {
  listen 80;
  server_name example.com;

  # Fișierele React (build static)
  location / {
    root /var/www/react-app/dist;
    try_files $uri /index.html;
  }

  # Redirecționare API către backend
  location /api/ {
    proxy_pass http://localhost:4000;
  }
}
```

</div>

<div class="space-y-3">

<div class="font-bold text-sm mb-1">De ce reverse proxy în loc de CORS headers?</div>

<div class="text-xs space-y-2">
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">Un singur domeniu</span>
    <div>Simplifică autentificarea — cookies și tokens funcționează fără configurări speciale</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">SSL într-un singur loc</span>
    <div>Nginx gestionează HTTPS — backend-ul rămâne simplu pe HTTP</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">Zero headere CORS</span>
    <div>Nu mai trebuie să configurezi <code>Access-Control-Allow-Origin</code> — totul e same-origin</div>
  </div>
  <div class="flex items-start gap-2">
    <span class="text-green-600 font-bold shrink-0">Performanță</span>
    <div>Nginx servește fișiere statice foarte rapid, fără a încărca backend-ul</div>
  </div>
</div>

<AdmonitionType type="info" class="mt-2">

Acesta este setup-ul standard în producție pentru majoritatea aplicațiilor React + API.

</AdmonitionType>

</div>

</div>

</div>

---
layout: section
color: sky-light
---

# Fetch în React

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Tiparul: useEffect + useState

:: content ::

<div class="text-sm space-y-3">

Orice fetch în React urmează același tipar — **3 state-uri** și un `useEffect`:

<div class="grid grid-cols-[1fr_auto] gap-6">

<div>

```jsx
const [data, setData] = useState(null);       // datele primite
const [loading, setLoading] = useState(true); // indicator de încărcare
const [error, setError] = useState(null);     // mesaj de eroare

useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);       // ← rulează indiferent de succes/eroare
    }
  }
  fetchData();
}, []);                         // ← [] = doar la mount
```

</div>

<div class="w-48 text-xs space-y-2">

<div class="bg-sky-50 rounded-lg p-2 border border-sky-200">
  <div class="font-bold text-sky-800">loading = true</div>
  <div class="text-gray-500">Afișează spinner sau skeleton</div>
</div>

<div class="bg-green-50 rounded-lg p-2 border border-green-200">
  <div class="font-bold text-green-800">data = {...}</div>
  <div class="text-gray-500">Randează datele</div>
</div>

<div class="bg-red-50 rounded-lg p-2 border border-red-200">
  <div class="font-bold text-red-800">error = "..."</div>
  <div class="text-gray-500">Afișează mesaj de eroare</div>
</div>

<AdmonitionType type="warning">

Nu poți face `useEffect` async direct — de aceea declarăm funcția separată înăuntru.

</AdmonitionType>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Fetch la mount

:: content ::

<FetchNaiveDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema: Race Conditions

:: content ::

<div class="text-sm space-y-3">

Ce se întâmplă când user-ul schimbă rapid un filtru sau navighează între pagini?

<div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-start mt-2">

<div class="space-y-2">

**Scenariu**: user-ul navighează între 3 profiluri

<div class="bg-gray-50 rounded-lg p-3 border border-gray-200 font-mono text-xs space-y-1.5 mt-2">

<div class="text-gray-500 mb-1">Request-uri trimise:</div>
<div class="flex items-center gap-2">
  <span class="text-sky-600">→</span>
  <span>fetch User 1</span>
</div>
<div class="flex items-center gap-2">
  <span class="text-sky-600">→</span>
  <span>fetch User 2</span>
</div>
<div class="flex items-center gap-2">
  <span class="text-sky-600">→</span>
  <span>fetch User 3</span>
</div>
<div class="h-px bg-gray-200 my-1"></div>
<div class="text-gray-500 mb-1">Răspunsuri (ordinea în care ajung):</div>
<div class="flex items-center gap-2">
  <span class="text-green-600">←</span>
  <span>User 3 răspunde</span>
  <span class="text-gray-400 ml-auto">t=1.2s</span>
  <span class="text-green-600">setUser(3) ✓</span>
</div>
<div class="flex items-center gap-2">
  <span class="text-red-600">←</span>
  <span>User 1 răspunde</span>
  <span class="text-gray-400 ml-auto">t=3s</span>
  <span class="text-red-600">setUser(1) ✗</span>
</div>
<div class="flex items-center gap-2">
  <span class="text-red-600">←</span>
  <span>User 2 răspunde</span>
  <span class="text-gray-400 ml-auto">t=3.3s</span>
  <span class="text-red-600">setUser(2) ✗</span>
</div>

</div>

</div>

<div class="flex flex-col items-center gap-2 pt-10">
  <div class="w-px h-12 bg-gray-300"></div>
  <div class="text-gray-400 text-xl">⇒</div>
  <div class="w-px h-12 bg-gray-300"></div>
</div>

<div class="space-y-3">

**Rezultat**: UI-ul arată **User 2**, deși utilizatorul a cerut **User 3**

<div class="bg-red-50 rounded-lg p-3 border border-red-200 mt-2 text-xs space-y-2">
  <div class="font-bold text-red-800">De ce se întâmplă?</div>
  <div>Nu contează <strong>când</strong> trimiți request-urile — contează <strong>cât durează</strong> fiecare răspuns. Latența variază: un server poate răspunde în 200ms sau în 3s, în funcție de load, rețea, cache.</div>
  <div>Fiecare răspuns apelează <code>setUser()</code>, iar <strong>ultimul care ajunge</strong> câștigă — care nu e neapărat cel cerut de utilizator.</div>
</div>

<AdmonitionType type="warning" class="mt-3">

Acesta e un bug **subtil** — funcționează perfect când rețeaua e rapidă, dar apare sub latență variabilă.

</AdmonitionType>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Race Condition în acțiune

:: content ::

<div class="text-sm mb-2">

Apasă rapid pe butoane diferite — delay-ul random simulează latență variabilă. Uneori vei vedea **user-ul greșit** afișat cu roșu. Deschide **UserProfile.js** să vezi codul fără protecție.

</div>

<RaceConditionDemo />

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Soluția: AbortController

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="space-y-3">

**AbortController** permite anularea unui request `fetch` aflat în curs. Îl folosim în **cleanup-ul** `useEffect`:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function fetchUser() {
    try {
      const res = await fetch(
        `/api/users/${userId}`,
        { signal: controller.signal }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  }

  fetchUser();
  return () => controller.abort();
}, [userId]);
```

</div>

<div class="space-y-3">

**Cum funcționează:**

<div class="space-y-2 text-xs">

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">1. userId se schimbă (ex: 1 → 2)</div>
  <div>React rulează cleanup-ul effect-ului <strong>anterior</strong> → <code>controller.abort()</code></div>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200">
  <div class="font-bold text-amber-800 mb-1">2. fetch-ul pentru User 1 primește AbortError</div>
  <div>Promise-ul este respins cu <code>err.name === 'AbortError'</code> — îl ignorăm, nu e o eroare reală</div>
</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">3. Effect-ul nou pornește fetch pentru User 2</div>
  <div>Cu un <strong>controller nou</strong> — nu e afectat de abort-ul anterior</div>
</div>

<div class="bg-violet-50 rounded-lg p-3 border border-violet-200">
  <div class="font-bold text-violet-800 mb-1">4. La unmount — ultimul fetch e anulat</div>
  <div>Previne <code>setState</code> pe un component deja demontat</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-2">

`AbortController` e un API web standard (nu React) — funcționează și cu `XMLHttpRequest`, `EventSource`, sau orice API care acceptă un `signal`.

</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: AbortController — fără race conditions

:: content ::

<div class="text-sm mb-2">

Acum fiecare schimbare de user anulează request-ul anterior. Apasă **"Unmount"** pentru a vedea cleanup-ul. Compară cu demo-ul anterior — niciun mismatch!

</div>

<FetchAbortDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Custom Hook: useFetch

:: content ::

<div class="text-sm space-y-3">

Tiparul `useState` × 3 + `useEffect` + `AbortController` se repetă la **fiecare** fetch. Soluția: extragem totul într-un custom hook reutilizabil.

<div class="grid grid-cols-2 gap-4 text-xs">

<div class="bg-red-50 rounded-lg p-3 border border-red-200">
  <div class="font-bold text-red-800 mb-2">Fără hook — cod duplicat în fiecare component</div>

```jsx
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => { /* 15 linii fetch... */ }, []);
  // ...
}

function PostList() {
  const [data, setData] = useState(null);    // ← identic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => { /* 15 linii fetch... */ }, []);
  // ...
}
```

</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-2">Cu hook — o singură linie per component</div>

```jsx
function UserList() {
  const { data, loading, error } = useFetch('/api/users');
  // gata! focus pe UI
}

function PostList() {
  const { data, loading, error } = useFetch('/api/posts');
  // la fel de simplu
}
```

<div class="mt-3 text-green-700">

Hook-ul `useFetch` încapsulează:
- Cele 3 state-uri (data, loading, error)
- AbortController + cleanup
- Verificarea `response.ok`
- Funcție `refetch` pentru reîncărcare manuală

</div>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: useFetch hook

:: content ::

<div class="text-sm mb-2">

Deschide tab-ul **useFetch.js** pentru a vedea implementarea hook-ului. Observă cum **App.js** devine mult mai curat.

</div>

<UseFetchDemo />

---
layout: section
color: sky-light
---

# Strategii de Caching

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce cache?

:: content ::

<div class="text-sm space-y-4">

Fără cache, fiecare navigare re-descarcă aceleași date. Cu cache, experiența devine instant.

<div class="grid grid-cols-3 gap-4">

<div class="rounded-lg border-2 border-red-200 overflow-hidden">
  <div class="bg-red-50 px-3 py-2 font-bold text-red-800">Fără cache</div>
  <div class="p-3 text-xs space-y-1">
    <div>User deschide pagina → <strong>fetch</strong> (1.2s)</div>
    <div>Navighează la altă pagină</div>
    <div>Revine → <strong>fetch din nou</strong> (1.2s)</div>
    <div class="text-red-600 font-bold mt-2">Aceleași date, descărcate de 2 ori</div>
  </div>
</div>

<div class="rounded-lg border-2 border-green-200 overflow-hidden">
  <div class="bg-green-50 px-3 py-2 font-bold text-green-800">Cu cache</div>
  <div class="p-3 text-xs space-y-1">
    <div>User deschide pagina → <strong>fetch</strong> (1.2s)</div>
    <div>Navighează la altă pagină</div>
    <div>Revine → <strong>din cache</strong> (0ms)</div>
    <div class="text-green-600 font-bold mt-2">Instant! Date re-validate în background</div>
  </div>
</div>

<div class="rounded-lg border-2 border-sky-200 overflow-hidden">
  <div class="bg-sky-50 px-3 py-2 font-bold text-sky-800">Beneficii</div>
  <div class="p-3 text-xs space-y-1.5">
    <div>- UX mai bun — navigare instantă</div>
    <div>- Mai puține request-uri la server</div>
    <div>- Funcționează parțial offline</div>
    <div>- Costuri reduse pe server</div>
  </div>
</div>

</div>

<AdmonitionType type="info">

Cache-ul există pe **3 nivele**: browser (HTTP headers), aplicație (state/context), și librării specializate (TanStack Query, SWR).

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Nivel 1: HTTP Cache (browser)

:: content ::

<div class="text-sm space-y-3">

Browserul are un cache built-in controlat prin **response headers**. Nu trebuie să scrii cod — funcționează automat pentru GET requests.

<div class="grid grid-cols-2 gap-5">

<div class="space-y-3">

**Cache-Control** — serverul decide regulile:

<div class="bg-gray-50 rounded-lg p-3 border border-gray-200 font-mono text-xs space-y-2">
  <div>
    <span class="text-green-700 font-bold">Cache-Control: max-age=3600</span>
    <div class="text-gray-500 font-sans mt-0.5">Folosește cache-ul 1 oră</div>
  </div>
  <div class="h-px bg-gray-200"></div>
  <div>
    <span class="text-amber-700 font-bold">Cache-Control: no-cache</span>
    <div class="text-gray-500 font-sans mt-0.5">Cacheuit, dar verifică cu serverul înainte de utilizare</div>
  </div>
  <div class="h-px bg-gray-200"></div>
  <div>
    <span class="text-red-700 font-bold">Cache-Control: no-store</span>
    <div class="text-gray-500 font-sans mt-0.5">Nu stoca nimic — date sensibile (cont bancar)</div>
  </div>
  <div class="h-px bg-gray-200"></div>
  <div>
    <span class="text-sky-700 font-bold">Cache-Control: max-age=0, must-revalidate</span>
    <div class="text-gray-500 font-sans mt-0.5">Verifică mereu, folosește cache-ul doar dacă e valid</div>
  </div>
</div>

</div>

<div class="space-y-3">

**ETag + If-None-Match** — validare condiționată:

<div class="space-y-2 text-xs">

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">1. Prima cerere</div>
  <div class="font-mono">→ GET /api/users</div>
  <div class="font-mono">← 200 OK + ETag: "v1-abc"</div>
  <div class="text-gray-500 mt-1">Browserul stochează răspunsul + ETag</div>
</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">2. A doua cerere (cache expirat)</div>
  <div class="font-mono">→ GET /api/users</div>
  <div class="font-mono">  If-None-Match: "v1-abc"</div>
  <div class="font-mono">← 304 Not Modified (fără body!)</div>
  <div class="text-green-600 mt-1">Transfer minim — doar confirmă că e valid</div>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200">
  <div class="font-bold text-amber-800 mb-1">3. Dacă s-a schimbat</div>
  <div class="font-mono">← 200 OK + ETag: "v2-def" + body nou</div>
</div>

</div>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Nivel 2: Cache în aplicație

:: content ::

<div class="text-sm space-y-3">

HTTP cache ajută — browserul servește răspunsul din cache fără network request. Dar `fetch()` rămâne **asincron** chiar și din cache: `useState(null)` → randare cu spinner → `useEffect` → `fetch()` rezolvă → `setData()` → re-randare cu date. Acel **flash de loading state** apare la fiecare remontare. Soluția: un cache **sincron** în aplicație:

<div class="grid grid-cols-2 gap-5">

<div class="bg-red-50 rounded-lg p-3 border border-red-200">
  <div class="font-bold text-red-800 mb-2">Fără cache în aplicație</div>

```jsx
// La fiecare remontare:
function UserList() {
  const [data, setData] = useState(null); // 1. null
  // 2. Randare → spinner vizibil
  useEffect(() => {
    fetch('/api/users')    // 3. Async (chiar din cache)
      .then(r => r.json())
      .then(setData);      // 4. Re-randare cu date
  }, []);
  return data ? <ul>...</ul> : <Spinner />;
}
```

<div class="text-xs text-red-600 mt-2">Flash de spinner la fiecare navigare, chiar fără network request</div>
</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-2">Cu cache simplu (Map)</div>

```jsx
// Cache global — supraviețuiește între montări
const cache = new Map();

function useCachedFetch(url) {
  const [data, setData] = useState(cache.get(url));

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        cache.set(url, data);
        setData(data);
      });
  }, [url]);

  return { data, loading: !data };
}
```

<div class="text-xs text-green-600 mt-2"><code>useState(cache.get(url))</code> — date disponibile <strong>sincron</strong> la prima randare, zero flash</div>
</div>

</div>

<AdmonitionType type="tip">

Asta e exact pattern-ul **stale-while-revalidate**: afișează datele vechi (stale) imediat, apoi revalidează în background și actualizează dacă s-au schimbat.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Nivel 3: TanStack Query / SWR

:: content ::

<div class="text-sm space-y-3">

Cache, abort, retry, deduplication, refetch... sunt multe de implementat corect. **TanStack Query** rezolvă totul cu un singur hook:

<div class="grid grid-cols-2 gap-5">

<div class="bg-red-50 rounded-lg p-3 border border-red-200">
  <div class="font-bold text-red-800 mb-2">Manual — useEffect + fetch</div>

```jsx
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('/api/users', { signal: ctrl.signal })
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);
  // + cache? retry? deduplication? refetch?
}
```

</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-2">TanStack Query</div>

```jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('/api/users').then(r => r.json()),
  });
}
```

<div class="text-xs text-green-700 mt-3 space-y-0.5">

- Cache automat + **stale-while-revalidate**
- Deduplicare (2 componente = 1 request)
- Retry automat, refetch la window focus
- Garbage collection, DevTools

</div>
</div>

</div>

</div>


---
layout: section
color: sky-light
---

# Pattern-uri "Avansate"

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Actualizări optimiste

:: content ::

<div class="text-sm mb-2">

Actualizăm UI-ul **instant** (fără a aștepta serverul), apoi facem rollback dacă request-ul eșuează. Perfect pentru like-uri, toggle-uri, reordonare.

</div>

<OptimisticDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Optimistic Updates — cum funcționează

:: content ::

<div class="text-sm space-y-3">

<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 items-start text-xs">

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-2">1. User click → Update instant</div>

```jsx
// Schimbăm state-ul IMEDIAT
setPosts(prev => prev.map(p =>
  p.id === id
    ? { ...p, liked: true, likes: p.likes + 1 }
    : p
));
```

  <div class="text-sky-600 mt-1">UI se actualizează fără delay</div>
</div>

<div class="text-gray-300 text-lg pt-8">→</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200">
  <div class="font-bold text-amber-800 mb-2">2. Trimitem la server</div>

```jsx
try {
  await fetch('/api/posts/' + id + '/like', {
    method: 'POST',
  });
  // Succes! Nu facem nimic — UI e deja corect
} catch (err) {
  // ...
}
```

  <div class="text-amber-600 mt-1">Request-ul e "in procesare"</div>
</div>

<div class="text-gray-300 text-lg pt-8">→</div>

<div class="space-y-2">
<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">3a. Succes</div>
  <div>Nu facem nimic — UI-ul e deja corect!</div>
</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200">
  <div class="font-bold text-red-800 mb-1">3b. Eroare → Rollback</div>

```jsx
catch (err) {
  // Revenim la starea anterioară
  setPosts(prev => prev.map(p =>
    p.id === id
      ? { ...p, liked: false,
          likes: p.likes - 1 }
      : p
  ));
}
```

</div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Polling — date în timp real (simplu)

:: content ::

<div class="text-sm mb-2">

Când datele se schimbă frecvent (prețuri, notificări, status), polling-ul e cea mai simplă soluție: `setInterval` + `fetch`.

</div>

<PollingDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Real-time: Polling vs WebSocket vs SSE

:: content ::

<div class="text-sm">

<div class="grid grid-cols-3 gap-4">

<div class="rounded-lg border-2 border-sky-300 overflow-hidden">
  <div class="bg-sky-100 px-3 py-2 font-bold text-sky-800">Polling</div>
  <div class="p-3 text-xs space-y-2">

```jsx
// La fiecare N secunde
setInterval(() => {
  fetch('/api/notifications')
    .then(res => res.json())
    .then(setData);
}, 5000);
```

  <div class="space-y-1 mt-2">
    <div class="text-green-700">✓ Simplu de implementat</div>
    <div class="text-green-700">✓ Funcționează peste orice infrastructură</div>
    <div class="text-red-600">✗ Delay între events (max N secunde)</div>
    <div class="text-red-600">✗ Request-uri inutile când nu sunt date noi</div>
  </div>
  <div class="mt-2 font-bold text-sky-700">Ideal: dashboards, status pages</div>
  </div>
</div>

<div class="rounded-lg border-2 border-violet-300 overflow-hidden">
  <div class="bg-violet-100 px-3 py-2 font-bold text-violet-800">WebSocket</div>
  <div class="p-3 text-xs space-y-2">

```jsx
// Conexiune bidirecțională persistentă
const ws = new WebSocket('wss://api.ex.com');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  setMessages(prev => [...prev, data]);
};

ws.send(JSON.stringify({ type: 'ping' }));
```

  <div class="space-y-1 mt-2">
    <div class="text-green-700">✓ Bidirecțional (client ↔ server)</div>
    <div class="text-green-700">✓ Latență minimă (real-time)</div>
    <div class="text-red-600">✗ Infrastructură complexă</div>
    <div class="text-red-600">✗ Gestionare reconectare manuală</div>
  </div>
  <div class="mt-2 font-bold text-violet-700">Ideal: chat, multiplayer, trading</div>
  </div>
</div>

<div class="rounded-lg border-2 border-green-300 overflow-hidden">
  <div class="bg-green-100 px-3 py-2 font-bold text-green-800">Server-Sent Events (SSE)</div>
  <div class="p-3 text-xs space-y-2">

```jsx
// Server → Client (unidirecțional)
const source = new EventSource('/api/stream');

source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  setNotifications(prev => [...prev, data]);
};

source.onerror = () => source.close();
```

  <div class="space-y-1 mt-2">
    <div class="text-green-700">✓ Reconectare automată</div>
    <div class="text-green-700">✓ Simplu — doar HTTP</div>
    <div class="text-red-600">✗ Doar server → client</div>
    <div class="text-red-600">✗ Limitat la text (nu binar)</div>
  </div>
  <div class="mt-2 font-bold text-green-700">Ideal: notificări, live feeds, logs</div>
  </div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Debounce + Cancel — Search UX

:: content ::

<div class="text-sm mb-2">

**Debounce** = "așteaptă până se liniștesc lucrurile". Când user-ul tastează, fiecare keystroke resetează un timer (ex: 300ms). Fetch-ul se execută **doar** când user-ul se oprește din tastat — adică după 300ms fără niciun keystroke nou. Fără debounce, `"react"` ar genera 5 request-uri (`r`, `re`, `rea`, `reac`, `react`). Cu debounce — **unul singur**.

Combinăm cu **AbortController** care anulează request-ul anterior dacă user-ul tastează din nou înainte să vină răspunsul.

</div>

<DebounceSearchDemo />

---
layout: section
color: sky-light
---

# Librării pentru Data Fetching

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Tipuri de librării pentru data fetching

:: content ::

<div class="text-sm space-y-3">

Există două categorii de librării care rezolvă probleme **diferite**:

<div class="grid grid-cols-2 gap-5">

<div class="rounded-lg border-2 border-amber-300 overflow-hidden">
  <div class="bg-amber-100 px-3 py-2 font-bold text-amber-800">HTTP Clients — cum trimiți request-uri</div>
  <div class="p-3 text-xs space-y-2">
  <div>Wrappere peste <code>fetch()</code>: auto-parse JSON, erori automate la 4xx/5xx, interceptors, timeout. Exemple: <strong>Axios</strong>, <strong>ky</strong>, <strong>ofetch</strong>.</div>

```js
// Axios — cel mai popular HTTP client
import axios from 'axios';
const { data } = await axios.get('/api/users'); // parsat
await axios.post('/api/users', { name: 'Ana' }); // JSON automat

// ky — alternativă modernă, bazată pe fetch (~3KB)
import ky from 'ky';
const users = await ky.get('/api/users').json();
```

  <div class="text-amber-700 mt-1">Rezolvă: <strong>ergonomia</strong> request-urilor HTTP</div>
  </div>
</div>

<div class="rounded-lg border-2 border-violet-300 overflow-hidden">
  <div class="bg-violet-100 px-3 py-2 font-bold text-violet-800">Data Fetching Libraries — cum gestionezi datele</div>
  <div class="p-3 text-xs space-y-2">
  <div>Gestionează ce se întâmplă <strong>după</strong> request: cache, deduplicare, background refetch, retry. Exemple: <strong>TanStack Query</strong>, <strong>SWR</strong>.</div>

```jsx
// TanStack Query — cel mai complet (React, Vue, Solid)
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
});

// SWR (Vercel) — API minimalist, ideal cu Next.js
const { data } = useSWR('/api/users', fetcher);
```

  <div class="text-violet-700 mt-1">Rezolvă: <strong>toate problemele</strong> din acest modul (cache, race conditions, retry...)</div>
  </div>
</div>

</div>

<AdmonitionType type="tip">

Sunt complementare — poți folosi un HTTP client ca `queryFn` într-o librărie de data fetching. Dar **nu ai nevoie de ambele** ca să construiești o aplicație.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce să folosești?

:: content ::

<div class="text-sm space-y-4">

<div class="grid grid-cols-3 gap-4">

<div class="rounded-lg border-2 border-green-300 overflow-hidden">
  <div class="bg-green-100 px-3 py-2 font-bold text-green-800 text-center">Proiecte mici → medii</div>
  <div class="p-3 text-xs space-y-2">

```jsx
// fetch() nativ + custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  // ... pattern-ul din acest modul
}
```

  <div class="text-green-700 space-y-1 mt-1">
    <div>✓ Zero dependențe</div>
    <div>✓ Înțelegi exact ce se întâmplă</div>
    <div>✓ Suficient pentru majoritatea cazurilor</div>
  </div>
  </div>
</div>

<div class="rounded-lg border-2 border-amber-300 overflow-hidden">
  <div class="bg-amber-100 px-3 py-2 font-bold text-amber-800 text-center">Când fetch() devine incomod</div>
  <div class="p-3 text-xs space-y-2">

```js
// Axios — instanță pre-configurată
const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});
const { data } = await api.get('/users');
```

  <div class="text-amber-700 space-y-1 mt-1">
    <div>✓ Auto-parse, interceptors, timeout</div>
    <div>✓ Axios, ky, ofetch</div>
    <div>✗ Nu rezolvă cache/state</div>
  </div>
  </div>
</div>

<div class="rounded-lg border-2 border-violet-300 overflow-hidden">
  <div class="bg-violet-100 px-3 py-2 font-bold text-violet-800 text-center">Aplicații complexe cu multe date</div>
  <div class="p-3 text-xs space-y-2">

```jsx
// TanStack Query
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

  <div class="text-violet-700 space-y-1 mt-1">
    <div>✓ Cache, deduplicare, retry</div>
    <div>✓ TanStack Query, SWR</div>
    <div>✗ Learning curve, bundle size</div>
  </div>
  </div>
</div>

</div>

<AdmonitionType type="info">

**Recomandare**: Începe cu `fetch()` nativ și un custom hook. Adăugă o librărie doar când simți concret limitările — nu preventiv. Majoritatea proiectelor mici și medii nu au nevoie de un sistem complet de data fetching.

</AdmonitionType>

</div>

---
layout: section
color: sky-light
---

# Când `npm install` devine un atac
### Cazul Axios — Martie 2026

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Un `npm install` obișnuit. Ce poate merge rău?

:: content ::

<div class="text-sm space-y-3">

<div class="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 leading-relaxed">
  <div class="text-gray-500">$ npm install axios</div>
  <div class="mt-1">added 1 package in 2.3s</div>
  <div class="mt-2 text-gray-500">$</div>
  <div class="mt-1 text-red-400 animate-pulse">// În background: RAT instalat. Credențiale colectate. Comunicare cu server C2 în Coreea de Nord.</div>
</div>

<div class="grid grid-cols-3 gap-4 mt-2">

<div class="bg-red-50 rounded-lg p-3 border border-red-200 text-center">
  <div class="text-3xl font-black text-red-700">100M+</div>
  <div class="text-xs text-red-600 mt-1">descărcări pe săptămână</div>
  <div class="text-xs text-gray-500">~80% din mediile cloud</div>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200 text-center">
  <div class="text-3xl font-black text-amber-700">89 sec</div>
  <div class="text-xs text-amber-600 mt-1">de la publicare la prima infecție</div>
  <div class="text-xs text-gray-500">instalare automată de CI/CD</div>
</div>

<div class="bg-violet-50 rounded-lg p-3 border border-violet-200 text-center">
  <div class="text-3xl font-black text-violet-700">Atac</div>
  <div class="text-xs text-violet-600 mt-1">atribuit Coreei de Nord</div>
  <div class="text-xs text-gray-500">gruparea UNC1069 (Mandiant/Google)</div>
</div>

</div>

<div class="text-xs text-center text-gray-500 mt-1">
  Pe <strong>31 martie 2026</strong>, două versiuni malițioase ale Axios au fost publicate pe npm. Atacatorul a compromis contul maintainer-ului principal și a publicat versiuni care instalau un <strong>Remote Access Trojan (RAT)</strong> pe mașina dezvoltatorului — automat, silențios, pe toate sistemele de operare.
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anatomia unui atac pregătit cu grijă

:: content ::

<div class="text-sm space-y-2">

<div class="text-xs text-gray-600 mb-1">Atacul nu a fost improvizat — a fost o operațiune planificată în etape, executată noaptea (ora Europei)</div>

<div class="relative">

<div class="grid grid-cols-5 gap-2 text-xs">

<div class="rounded-lg border border-gray-300 overflow-hidden">
  <div class="bg-gray-100 px-2 py-1.5 font-bold text-gray-700 text-center">Ziua -1</div>
  <div class="p-2 space-y-1.5">
    <div class="font-mono text-gray-400 text-[10px]">30 mar 05:57</div>
    <div>Publică <code class="text-[10px]">plain-crypto-js@4.2.0</code></div>
    <div class="text-gray-500">Versiune <strong>curată</strong> — construiește istoric pe npm pentru a nu ridica suspiciuni</div>
  </div>
</div>

<div class="rounded-lg border border-amber-300 overflow-hidden">
  <div class="bg-amber-100 px-2 py-1.5 font-bold text-amber-700 text-center">Ziua -1 (seara)</div>
  <div class="p-2 space-y-1.5">
    <div class="font-mono text-amber-500 text-[10px]">30 mar 23:59</div>
    <div>Publică <code class="text-[10px]">plain-crypto-js@4.2.1</code></div>
    <div class="text-gray-500">Versiunea <strong>malițioasă</strong> — cu postinstall hook ascuns</div>
  </div>
</div>

<div class="rounded-lg border-2 border-red-400 overflow-hidden bg-red-50/50">
  <div class="bg-red-200 px-2 py-1.5 font-bold text-red-800 text-center">Ora zero</div>
  <div class="p-2 space-y-1.5">
    <div class="font-mono text-red-600 text-[10px]">31 mar 00:21</div>
    <div><strong>axios@1.14.1</strong> publicat pe tag-ul <code class="text-[10px]">latest</code></div>
    <div class="text-red-700 font-medium">Oricine rulează <code>npm install</code> primește această versiune</div>
  </div>
</div>

<div class="rounded-lg border-2 border-red-400 overflow-hidden bg-red-50/50">
  <div class="bg-red-200 px-2 py-1.5 font-bold text-red-800 text-center">+39 min</div>
  <div class="p-2 space-y-1.5">
    <div class="font-mono text-red-600 text-[10px]">31 mar 01:00</div>
    <div><strong>axios@0.30.4</strong> publicat pe tag-ul <code class="text-[10px]">legacy</code></div>
    <div class="text-red-700">Ambele branch-uri (0.x și 1.x) compromise simultan</div>
  </div>
</div>

<div class="rounded-lg border border-green-300 overflow-hidden">
  <div class="bg-green-100 px-2 py-1.5 font-bold text-green-700 text-center">Detecție</div>
  <div class="p-2 space-y-1.5">
    <div class="font-mono text-green-600 text-[10px]">31 mar ~03:15</div>
    <div>npm retrage versiunile malițioase</div>
    <div class="text-gray-500">Socket.dev detectează automat în <strong>6 min</strong>. npm acționează în ~3h</div>
  </div>
</div>

</div>

</div>

<div class="grid grid-cols-2 gap-3 mt-1">

<AdmonitionType type="warning">

**De ce noaptea?** Atacatorii au publicat la 00:21 UTC (02:21 ora Republicii Moldova) — când puțini dezvoltatori sunt online. Pipeline-urile CI/CD însă rulau non-stop, instalând automat versiunile noi.

</AdmonitionType>

<AdmonitionType type="info">

**De ce două versiuni?** Axios menține două branch-uri active (0.x legacy și 1.x). Atacatorii au compromis *ambele* dist-tags ca să maximizeze victimele — indiferent ce versiune foloseai.

</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cum a funcționat atacul — pas cu pas

:: content ::

<div class="text-sm space-y-3">

<div class="grid grid-cols-3 gap-3 text-xs">

<div class="rounded-lg border-2 border-red-300 overflow-hidden">
  <div class="bg-red-100 px-3 py-2 font-bold text-red-800">1. Cont npm compromis</div>
  <div class="p-3 space-y-2">
    <div>Atacatorul a preluat contul npm <strong>jasonsaayman</strong> (maintainer-ul principal Axios)</div>
    <div>Email-ul contului schimbat de la <code class="text-[10px]">...@gmail.com</code> → <code class="text-[10px]">ifstap@proton.me</code></div>
    <div class="bg-red-50 rounded p-2 mt-2">
      <div class="font-bold text-red-700 mb-1">Cum?</div>
      <div>npm-ul permitea publicare prin <strong>token long-lived</strong> care suprascriu MFA — chiar dacă contul avea 2FA activat. Versiunile anterioare foloseau GitHub Actions OIDC cu SLSA provenance. Cele malițioase: publish direct din CLI.</div>
    </div>
  </div>
</div>

<div class="rounded-lg border-2 border-amber-300 overflow-hidden">
  <div class="bg-amber-100 px-3 py-2 font-bold text-amber-800">2. Dependință "fantomă"</div>
  <div class="p-3 space-y-2">
    <div>Singura modificare vizibilă în <code>package.json</code>:</div>
    <div class="font-mono bg-amber-50 rounded p-2">"plain-crypto-js": "^4.2.1"</div>
    <div>Acest pachet <strong>nu e importat nicăieri</strong> în codul Axios</div>
    <div class="bg-amber-50 rounded p-2 mt-1">
      <div class="font-bold text-amber-700 mb-1">De ce?</div>
      <div>Nu trebuie să modifici codul librăriei. npm-ul rulează automat script-ul <code>postinstall</code> al oricărei dependințe. Pachetul există <em>doar</em> pentru acest hook.</div>
    </div>
  </div>
</div>

<div class="rounded-lg border-2 border-violet-300 overflow-hidden">
  <div class="bg-violet-100 px-3 py-2 font-bold text-violet-800">3. Dropper → RAT</div>
  <div class="p-3 space-y-2">
    <div>Script-ul <code>setup.js</code> (4.2KB):</div>
    <div class="space-y-1">
      <div>① Decodează payload: string reversal + Base64 + XOR (<code class="text-[10px]">key: OrDeR_7077</code>)</div>
      <div>② Contactează C2 server → descarcă RAT specific OS-ului</div>
      <div>③ <strong>Anti-forensics</strong>: se auto-șterge cu <code>fs.unlink</code> și înlocuiește <code>package.json</code> cu versiunea curată</div>
    </div>
    <div class="bg-violet-50 rounded p-2 mt-1">
      <div class="text-violet-700">După instalare, <code>node_modules/</code> arată <strong>perfect normal</strong> — nicio urmă vizibilă a atacului</div>
    </div>
  </div>
</div>

</div>

<div class="grid grid-cols-3 gap-3 text-xs mt-1">

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">🍎 macOS</div>
  <div>Binary C++ Mach-O → <code class="text-[10px]">/Library/Caches/com.apple.act.mond</code></div>
  <div class="text-gray-500 mt-1">Denumit să imite un daemon Apple legitim</div>
</div>

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">🪟 Windows</div>
  <div>PowerShell copiat ca <code class="text-[10px]">%PROGRAMDATA%\wt.exe</code>, reflective .NET loading</div>
  <div class="text-gray-500 mt-1">Deghizat ca Windows Terminal, persistență prin Registry</div>
</div>

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">🐧 Linux</div>
  <div>Script Python → <code class="text-[10px]">/tmp/ld.py</code> via curl, rulat cu <code>nohup</code></div>
  <div class="text-gray-500 mt-1">Detașat de terminal, supraviețuiește închiderii sesiunii</div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce fura RAT-ul și cine era în spatele atacului?

:: content ::

<div class="text-sm space-y-3">

<div class="text-xs text-gray-600">Odată instalat, RAT-ul comunica cu un server controlat de atacatori, așteptând comenzi. Iată ce colecta de pe mașina dezvoltatorului:</div>

<div class="grid grid-cols-[1fr_1fr] gap-4">

<div class="rounded-lg border border-red-200 overflow-hidden text-xs">
  <div class="bg-red-100 px-3 py-2 font-bold text-red-800">Ce fura RAT-ul de pe mașina ta</div>
  <div class="p-3 space-y-2">
    <div class="flex items-start gap-2"><span class="text-red-500 mt-0.5">●</span><div><strong>Tokens npm / GitHub</strong> — din <code>~/.npmrc</code>, <code>~/.gitconfig</code>, variabile de mediu</div></div>
    <div class="flex items-start gap-2"><span class="text-red-500 mt-0.5">●</span><div><strong>Chei SSH</strong> — <code>~/.ssh/id_rsa</code>, <code>id_ed25519</code></div></div>
    <div class="flex items-start gap-2"><span class="text-red-500 mt-0.5">●</span><div><strong>Credențiale cloud</strong> — AWS, GCP, Azure config files</div></div>
    <div class="flex items-start gap-2"><span class="text-red-500 mt-0.5">●</span><div><strong>Secrete CI/CD</strong> — variabile de mediu din pipeline-uri</div></div>
    <div class="flex items-start gap-2"><span class="text-red-500 mt-0.5">●</span><div><strong>Fișiere .env</strong> — API keys, database URLs, orice secret local</div></div>
  </div>
</div>

<div class="space-y-2">

<div class="rounded-lg border border-gray-200 overflow-hidden text-xs">
  <div class="bg-gray-100 px-3 py-2 font-bold text-gray-700">Cine a fost în spatele atacului?</div>
  <div class="p-3 space-y-1.5">
    <div>Google/Mandiant au atribuit atacul grupării <strong>UNC1069</strong> — un actor <strong>din Coreea de Nord</strong>, motivat financiar, activ din 2018</div>
    <div>Același grup a vizat anterior ecosistemul crypto și proiecte open-source</div>
    <div class="text-gray-500 mt-1">Nu a fost un hacker amator — a fost o operațiune de stat cu obiective financiare</div>
  </div>
</div>

<div class="rounded-lg border border-amber-200 overflow-hidden text-xs">
  <div class="bg-amber-100 px-3 py-2 font-bold text-amber-800">Impact real</div>
  <div class="p-3 space-y-1.5">
    <div>~<strong>3%</strong> din mediile afectate au arătat execuție efectivă a RAT-ului</div>
    <div>Pe acele mașini, atacatorii au avut acces complet la <strong>toate secretele</strong></div>
    <div>Credențialele furate puteau fi folosite pentru a compromite și alte proiecte — efect de <strong>cascadă</strong></div>
  </div>
</div>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cum s-a putut întâmpla asta?

:: content ::

<div class="text-sm space-y-3">

<div class="text-xs text-gray-600 mb-1">Atacul a exploatat slăbiciuni la <strong>fiecare nivel</strong> al ecosistemului npm — nu doar o singură vulnerabilitate.</div>

<div class="grid grid-cols-2 gap-4">

<div class="space-y-2 text-xs">
<div class="font-bold text-gray-800 mb-1">Probleme de platformă (npm)</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200 space-y-1">
  <div class="font-bold text-red-800">Tokens long-lived bypasează MFA</div>
  <div>Maintainer-ul avea 2FA activat. Nu a contat. npm permitea publicare prin token din CLI care nu necesita a doua autentificare — un legacy path care anula toată securitatea.</div>
</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200 space-y-1">
  <div class="font-bold text-red-800">postinstall rulează cod arbitrar</div>
  <div>npm execută automat script-uri la instalare. Nu există sandboxing, nu există confirmare. <code>npm install</code> = <strong>execuție de cod necunoscut</strong> pe mașina ta.</div>
</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200 space-y-1">
  <div class="font-bold text-red-800">Semver ranges + dist-tags</div>
  <div><code>"axios": "^1.14.0"</code> în <code>package.json</code> = "orice versiune compatibilă". Când atacatorul publică 1.14.1 pe tag-ul <code>latest</code>, toți o primesc automat.</div>
</div>

</div>

<div class="space-y-2 text-xs">
<div class="font-bold text-gray-800 mb-1">Probleme de ecosistem</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200 space-y-1">
  <div class="font-bold text-amber-800">Single point of failure</div>
  <div>Un <strong>singur cont npm</strong> controla un pachet cu 100M+ downloads/săptămână. O singură parolă/token compromis = milioane de mașini expuse.</div>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200 space-y-1">
  <div class="font-bold text-amber-800">Dependențe tranzitive invizibile</div>
  <div>Proiectul tău depinde de axios, care depinde de plain-crypto-js. Tu nu ai adăugat niciodată acest pachet — dar codul lui rulează pe mașina ta.</div>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200 space-y-1">
  <div class="font-bold text-amber-800">CI/CD pipelines — victima perfectă</div>
  <div>Pipeline-urile rulează <code>npm install</code> non-stop, automat, fără supraveghere umană. Au acces la <strong>cele mai valoroase secrete</strong> (deploy keys, cloud credentials).</div>
</div>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce învățăm din asta?

:: content ::

<div class="text-sm space-y-3">

<div class="grid grid-cols-2 gap-5">

<div class="space-y-2">

<div class="font-bold text-gray-800 mb-1">Cum te protejezi ca dezvoltator:</div>

<div class="space-y-2 text-xs">

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">🔒 Lock files — commit-uiește-le mereu</div>
  <div><code>package-lock.json</code> / <code>pnpm-lock.yaml</code> fixează versiunile exacte. Dacă lock file-ul tău era commited înainte de atac, <code>npm ci</code> nu ar fi instalat versiunea malițioasă.</div>
</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">🛡️ npm ci + --ignore-scripts în CI/CD</div>
  <div><code>npm ci</code> respectă strict lock file-ul. <code>--ignore-scripts</code> blochează toate postinstall hooks — cea mai eficientă protecție contra acestui tip de atac.</div>
</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">📌 Pinning exact al versiunilor</div>
  <div>Folosește <code>"axios": "1.14.0"</code> (fără <code>^</code>) pentru dependințe critice. Pierzi auto-updates, dar câștigi control total.</div>
</div>

<div class="bg-green-50 rounded-lg p-3 border border-green-200">
  <div class="font-bold text-green-800 mb-1">🔍 Auditare automată</div>
  <div><code>npm audit</code>, Socket.dev, Snyk — detectează pachete malițioase automat. Socket.dev a detectat acest atac în <strong>6 minute</strong>.</div>
</div>

</div>

</div>

<div class="space-y-2">

<div class="font-bold text-gray-800 mb-1">Perspective mai largi:</div>

<div class="space-y-2 text-xs">

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">npm install = execuție de cod necunoscut</div>
  <div>Fiecare <code>npm install</code> descarcă și (potențial) execută cod din sute de pachete. Tratează-l ca pe un act de încredere, nu ca pe o operație banală.</div>
</div>

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">Open-source ≠ verificat automat</div>
  <div>Axios avea 100M downloads/săptămână. Popularitatea nu înseamnă securitate. Un maintainer obosit cu un token expirat e tot ce trebuie.</div>
</div>

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200">
  <div class="font-bold text-sky-800 mb-1">State-level actors vizează npm</div>
  <div>Acesta nu a fost un hacker amator. A fost o operațiune a Coreei de Nord (UNC1069) — cu infrastructure C2, RAT cross-platform, și anti-forensics. Ecosistemul JavaScript e o țintă strategică.</div>
</div>

</div>

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Recapitulare

:: content ::

<div class="text-sm">

<div class="grid grid-cols-3 gap-4">

<div class="rounded-lg border border-sky-200 p-3 space-y-2">
  <div class="font-bold text-sky-800">HTTP & Fetch API</div>
  <div class="text-xs space-y-1">
    <div>Request-response, stateless</div>
    <div>Metode: GET, POST, PUT/PATCH, DELETE</div>
    <div>Status codes: 2xx / 4xx / 5xx</div>
    <div><code>fetch()</code> returnează Promise</div>
    <div>Verifică <code>response.ok</code> — nu aruncă eroare la 404</div>
  </div>
</div>

<div class="rounded-lg border border-sky-200 p-3 space-y-2">
  <div class="font-bold text-sky-800">CORS</div>
  <div class="text-xs space-y-1">
    <div>Browserul blochează request-uri cross-origin</div>
    <div>Simple requests vs preflight (<code>OPTIONS</code>)</div>
    <div><strong>Soluții</strong>: headere pe server, proxy în dev, reverse proxy (Nginx) în producție</div>
  </div>
</div>

<div class="rounded-lg border border-sky-200 p-3 space-y-2">
  <div class="font-bold text-sky-800">Fetch în React</div>
  <div class="text-xs space-y-1">
    <div>Pattern: <code>useState</code> × 3 + <code>useEffect</code></div>
    <div><strong>AbortController</strong> previne race conditions</div>
    <div>Extrage logica în custom hooks (<code>useFetch</code>)</div>
  </div>
</div>

<div class="rounded-lg border border-sky-200 p-3 space-y-2">
  <div class="font-bold text-sky-800">Cache</div>
  <div class="text-xs space-y-1">
    <div><strong>HTTP</strong>: Cache-Control, ETag — elimină network</div>
    <div><strong>Aplicație</strong>: Map + useState — elimină loading flash</div>
    <div><strong>Librării</strong>: TanStack Query, SWR — totul automat</div>
  </div>
</div>

<div class="rounded-lg border border-sky-200 p-3 space-y-2">
  <div class="font-bold text-sky-800">Patterns avansate</div>
  <div class="text-xs space-y-1">
    <div><strong>Optimistic updates</strong> — UI instant, rollback la eroare</div>
    <div><strong>Debounce</strong> — un request per acțiune, nu per keystroke</div>
    <div><strong>Polling</strong> — setInterval + fetch pentru date live</div>
  </div>
</div>

<div class="rounded-lg border border-sky-200 p-3 space-y-2">
  <div class="font-bold text-sky-800">Librării</div>
  <div class="text-xs space-y-1">
    <div><strong>HTTP clients</strong> (Axios, ky) — ergonomie</div>
    <div><strong>Data fetching</strong> (TanStack Query, SWR) — cache, sync</div>
    <div><code>fetch()</code> nativ e suficient pentru majoritatea proiectelor</div>
  </div>
</div>

</div>

</div>
