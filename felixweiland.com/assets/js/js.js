document.addEventListener("DOMContentLoaded", function () {
  // Define an array of opening texts
  const openingTexts = ["Hi there, I am Felix."];

  // Generate a random number based on the length of the opening texts array
  const randomIndex = Math.floor(Math.random() * openingTexts.length);

  // Use the random index to display a random opening text on the page
  const openingText = openingTexts[randomIndex];
  document.getElementById("txt").innerHTML = openingText;

  // FADES
  function fadeInText() {
    var elements = document.getElementsByClassName("fade");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var position = element.getBoundingClientRect();
      if (
        (position.top < window.innerHeight && position.bottom >= 0) ||
        element.parentElement.classList.contains("expanded")
      ) {
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", fadeInText);
  window.addEventListener("load", fadeInText);

  // FOLD-OUTS

  function toggleContent() {
    var target = this.dataset.target;
    var content = document.getElementById(target);
    var button = this;
    var isExpanded = content.classList.toggle("expanded");

    if (isExpanded) {
      button.innerText = "Collapse";
    } else {
      button.innerText = "Expand";
    }

    content.style.maxHeight = isExpanded ? content.scrollHeight + "px" : "0px";

    // Call fadeInText after the animation is complete
    setTimeout(function () {
      fadeInText();
    }, 300); // Adjust this timeout to match your CSS animation duration
  }

  var buttons = document.querySelectorAll(".toggle-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", toggleContent);
  });

  fetch("assets/img/stuff")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, "text/html");
      const images = html.querySelectorAll(
        'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]'
      ); // adjust file extensions as needed
      const imageSources = Array.from(images).map((img) => img.href);
      displayImages(imageSources);
    })
    .catch((error) => console.error(error));

  function displayImages(imageSources) {
    const imageContainer = document.getElementById("image-container");
    imageSources.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      imageContainer.appendChild(img);
    });
  }
});

// IMAGE LOOP
