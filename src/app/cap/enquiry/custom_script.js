// my-custom-script.js
export function makeInputReadOnly(inputId) {
  const inputElement = document.getElementById(inputId);

  if (inputElement) {
    inputElement.readOnly = !inputElement.readOnly;
    if(inputElement.readOnly) {
      inputElement.value  = "Look it changed!!";
    } else {
      inputElement.value = "";
    }

    const email = "a@b.com";
    const password = "type";
        
    const externalApiUrl = 'http://localhost:3000/controllers/';
    const externalApiResponse =  fetch(externalApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other required headers
        },
        body: JSON.stringify({"email": email, "password": password}),
    });
  } else {
    alert("Not Found");
  }

}

//export default {makeInputReadOnly};