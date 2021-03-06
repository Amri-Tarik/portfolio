let loader = document.getElementById("loader");
let templist;

document.getElementById("button").addEventListener("click", (event) => {
  event.preventDefault();
  transition("intro", "form1");
});

document.getElementById("stylish").addEventListener("click", (event) => {
  document.getElementById("stylish").style.filter =
    "drop-shadow(3px 3px 5px black)";
});

document.getElementById("button2").addEventListener("click", (event) => {
  event.preventDefault();
  let stylish = document.getElementById("stylish");
  if (stylish.value == "") {
    stylish.style.filter = "drop-shadow(5px 5px 10px red) ";
  } else {
    document.getElementById("button2").style.display = "none";
    document.getElementById("loader").style.display = "inline-block";
    let _data = {
      id: stylish.value,
    };
    fetch("https://aoai-express.uraveragegeek.repl.co/auth", {
      method: "POST",
      body: JSON.stringify(_data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.validation == "ok") {
          document.getElementById("gm").innerHTML = data.gm + "%";
          document.getElementById("gi").innerHTML = data.gi + "%";
          document.getElementById("ge").innerHTML = data.ge + "%";
          transition("form1", "stats");
        } else {
          document.getElementById("loader").style.display = "none";
          document.getElementById("button2").style.display = "inline";
          stylish.style.filter = "drop-shadow(5px 5px 10px red)";
        }
      });
  }
});

let fillieres = ["gm", "gi", "ge"];

fillieres.forEach((element) => {
  document.getElementById("b" + element).addEventListener("click", (event) => {
    event.preventDefault();
    let temp = document.getElementById("b" + element);
    loader.style.display = "inline-block";
    document.getElementById("b" + element).replaceWith(loader);
    let _data = {
      id: stylish.value,
    };
    fetch("https://aoai-express.uraveragegeek.repl.co/" + element, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        templist = data.list;
        if (data.form == "ok") {
          for (let i = 0; i < data.l; i++) {
            addRow("pform", data.list[i], i);
          }
          transition("stats", "form2");
        } else {
          loader.replaceWith(temp);
        }
      });
  });
});

document.getElementById("button8").addEventListener("click", (e) => {
  e.preventDefault();
  let choices = [];
  for (let i = 0; i < templist.length; i++) {
    let temp = "q" + i;
    const rbs = document.querySelectorAll('input[name="' + temp + '"]');
    for (const rb of rbs) {
      if (rb.checked) {
        selectedValue = rb.value;
        break;
      }
    }
    let obj = {};
    obj[temp] = selectedValue;
    choices.push(obj);
  }
  console.log(choices);
  loader.style.display = "none";
  transition("form2", "stats");
  setTimeout(() => {
    document.getElementById("pform").textContent = "";
  }, 500);
});

function transition(id1, id2) {
  document.getElementById(id2).classList.remove("fadeOutUp");
  document.getElementById(id1).classList.add("fadeOutUp");
  setTimeout(() => {
    document.getElementById(id1).style.display = "none";
    setTimeout(() => {
      document.getElementById(id2).style.display = "block";
    }, 500);
  }, 500);
}

M.AutoInit();
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems);
});

function addRow(parent, list, i) {
  const div = document.createElement("div");
  div.className = "col s12 m6";
  div.innerHTML =
    `<h4 class="sectext neon">${list.question}</h4>
  <form action="#">` +
    answers(i, list) +
    `</form>`;
  document.getElementById(parent).appendChild(div);
}

function answers(i, list) {
  let temp = ``;
  for (let j = 0; j < list.answer.length; j++) {
    temp += `<p>
    <label>
      <input
        value="${j}"
        class="with-gap"
        name="q${i}"
        type="radio"
      />
      <span class="sectext neon" style="font-size : 1.5em">${list.answer[j]}</span>
    </label>
  </p>`;
  }
  return temp;
}
