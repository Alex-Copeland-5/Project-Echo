document.addEventListener("DOMContentLoaded", () => {
  console.log("document succesfully loaded, baby");
});

document.getElementById("randomBtn").addEventListener("click", function() {
  // Generate a random number between 1 and 100
  let randomNumber = Math.floor(Math.random() * 100) + 1;

  document.getElementById("randomNumberDisplay").textContent = "Your random number is " + randomNumber + "!";
});
