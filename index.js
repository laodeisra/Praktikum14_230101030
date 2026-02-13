window.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", fetchData);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
});

async function fetchData() {
  const inputRaw = document.getElementById("searchInput").value.trim();
  if (!inputRaw) return;

  let formattedInput = inputRaw
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");

  const skeleton = document.getElementById("skeleton");
  const resultArea = document.getElementById("resultArea");
  const errorArea = document.getElementById("errorArea");

  skeleton.style.display = "grid";
  resultArea.style.display = "none";
  errorArea.style.display = "none";

  const sparqlQuery = `
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?label ?abstract ?image ?activeStart (GROUP_CONCAT(DISTINCT ?genreName; separator=", ") AS ?genres) ?hometownName
    WHERE {
        {
          # Cara 1: Cek Resource Langsung (misal dbr:Queen_(band) atau dbr:Queen)
          ?musician rdfs:label ?label .
          FILTER (lang(?label) = 'en')
          FILTER (str(?label) = "${inputRaw}" || str(?label) = "${inputRaw.toLowerCase()}" || contains(str(?musician), "${formattedInput}"))
        }
        
        # Filter wajib agar yang muncul hanya Musisi/Band
        ?musician rdf:type ?type .
        FILTER (?type IN (dbo:Band, dbo:MusicalArtist))

        OPTIONAL { ?musician dbo:abstract ?abstract . FILTER (lang(?abstract) = 'id') }
        OPTIONAL { ?musician dbo:abstract ?abstract . FILTER (lang(?abstract) = 'en') }
        OPTIONAL { ?musician dbo:thumbnail ?image . }
        OPTIONAL { ?musician dbo:genre ?genreLink . ?genreLink rdfs:label ?genreName . FILTER (lang(?genreName) = 'en') }
        OPTIONAL { ?musician dbo:hometown ?hometown . ?hometown rdfs:label ?hometownName . FILTER (lang(?hometownName) = 'en') }
        OPTIONAL { ?musician dbo:activeYearsStartYear ?activeStart . }
    } 
    GROUP BY ?label ?abstract ?image ?activeStart ?hometownName
    LIMIT 1`;

  const url = `https://dbpedia.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const bindings = data.results.bindings;

    if (bindings && bindings.length > 0) {
      renderResult(bindings[0], formattedInput);
    } else {
      throw new Error(
        `Musisi "${inputRaw}" tidak ditemukan. Coba tambahkan kata '(band)' jika hasil tidak muncul.`,
      );
    }
  } catch (error) {
    errorArea.innerText = error.message;
    errorArea.style.display = "block";
    skeleton.style.display = "none";
  }
}

function renderResult(item, resourceName) {
  const resultArea = document.getElementById("resultArea");
  const skeleton = document.getElementById("skeleton");
  const img = document.getElementById("resImg");
  const imgWrapper = document.getElementById("imgWrapper");

  document.getElementById("resName").innerText = item.label
    ? item.label.value
    : "Unknown";
  document.getElementById("resAbstract").innerText = item.abstract
    ? item.abstract.value
    : "Deskripsi tidak tersedia.";
  document.getElementById("resGenre").innerText = item.genres
    ? item.genres.value
    : "-";
  document.getElementById("resHometown").innerText = item.hometownName
    ? item.hometownName.value
    : "-";
  document.getElementById("resActiveYear").innerText = item.activeStart
    ? item.activeStart.value
    : "-";
  document.getElementById("resLink").href =
    `http://dbpedia.org/page/${resourceName}`;

  const revealContent = () => {
    skeleton.style.display = "none";
    resultArea.style.display = "grid";
  };

  img.style.opacity = "0";
  imgWrapper.classList.add("shimmer-effect");

  if (item.image) {
    const secureUrl = item.image.value.replace("http://", "https://");
    img.src = secureUrl;

    img.onload = () => {
      imgWrapper.classList.remove("shimmer-effect");
      img.style.opacity = "1";
      revealContent();
    };

    img.onerror = () => {
      imgWrapper.classList.remove("shimmer-effect");
      imgWrapper.style.backgroundColor = "#ccc";
      revealContent();
    };
  } else {
    imgWrapper.classList.remove("shimmer-effect");
    imgWrapper.style.backgroundColor = "#ccc";
    revealContent();
  }
}
