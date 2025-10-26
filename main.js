const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("value-inp").value;

  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Extract main info
      const wordData = data[0];
      const meaning = wordData.meanings[0];
      const definition = meaning.definitions[0];
      const phonetic = wordData.phonetics[0];

      // Update HTML with real data
      result.innerHTML = `
        <div class="word">
          <h3>${wordData.word}</h3>
          <button onclick="playSound()">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>

        <div class="details">
          <p>${meaning.partOfSpeech}</p>
          <p>${phonetic.text || ''}</p>
        </div>

        <p class="word-meaning">
          ${definition.definition}
        </p>
      `;

      // Set up pronunciation sound if available
      sound.setAttribute("src", phonetic.audio);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
    });
});

function playSound() {
  sound.play();

}
