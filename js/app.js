let audioArr = ["A4", "B4", "C4", "C5", "D4", "E4", "F4", "G4"];
let keyboard = ["a", "s", "d", "f", "j", "k", "l", ";"];
let audioTag = document.getElementsByClassName("audio")[0];
let inputBox = document.getElementById("inputBox");
let addBtn = document.getElementById("add");
let recordBox = document.getElementsByClassName("record-box")[0];

let keypad = document.querySelectorAll(".keypad");
let recordArr = [];

keypad.forEach((key) => {});

document.addEventListener("keydown", (event) => {
  if (!keyboard.includes(event.key)) {
    return;
  }
  let clickedKey = document.getElementById(event.key);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 100);
  let keyIndex = keyboard.findIndex((el) => el == event.key);
  audioTag.src = `./../audio/${audioArr[keyIndex]}.mp3`;
  audioTag.addEventListener("loadeddata", () => {
    audioTag.play();
  });
  recordArr[recordArr.length] = clickedKey.textContent;
  inputBox.value = recordArr.join(",");
  console.log(recordArr);
});

addBtn.addEventListener("click", () => {
  if (!inputBox.value) {
    return;
  }
  recordBox.innerHTML += `
    <div class="record-list">
      <p class="record-key">${inputBox.value}</p>
      <button class='replayBtn'>Replay</button>
    </div>`;
  recordArr.length = 0;
  let replayBtns = document.querySelectorAll(".replayBtn");
  replayBtns.forEach((replayBtn) => {
    replayBtn.addEventListener("click", (event) => {
      let delay = 500;

      let replayArr =
        event.target.previousSibling.previousSibling.textContent.split(",");
      replayArr.forEach((key) => {
        setTimeout(
          (el) => {
            audioTag.src = `./../audio/${el}.mp3`;
            console.log(el);
            audioTag.addEventListener("loadeddata", () => {
              audioTag.play();
            });
          },
          delay,
          key
        );
        delay += 500;
      });
      console.log("Replayed");
    });
  });

  inputBox.value = "";
});
