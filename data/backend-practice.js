const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/documentation"); //creates a new request
xhr.send(); // sends request
// xhr.response; // returns response
