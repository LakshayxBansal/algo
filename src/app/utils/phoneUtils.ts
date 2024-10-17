export function checkPhone(mobile: string): boolean {
  if (mobile.length > 0) {
    // Find the index of the first space
    const mobile_arr = mobile.split(' ')
    // Extract the substring before the first space as CountryCode
    const CountryCode = mobile_arr[0];

    // Extract the substring after the first space as Number
    let number : string = "";
    for(let i=1;i<mobile_arr.length;i++){
      number += mobile_arr[i];
    }

    // Array of country codes having 10-digit phone numbers
    const countrycodeHaving10DigitNumbers = ["+91","+92","+93","+86","+977","+975","+95","+880","+94","+960"]; // Add other country codes as needed

    // Check if the Number is not empty and if the CountryCode is in the array
    if (countrycodeHaving10DigitNumbers.includes(CountryCode)) {
      // Check if the Number is 10 digits long
      return number.length === 10;
    }else{
      return (number.length >= 7 && number.length <= 15) ? true : false;
    }
  }

  return true;
}

export function modifyPhone (mobile : string) : string {
  const firstSpaceIndex = mobile.indexOf(" ");
    mobile =
      (firstSpaceIndex !== -1 ? mobile.slice(firstSpaceIndex + 1) : "")
        .length === 0
        ? ""
        : mobile.slice(0, firstSpaceIndex) +
          " " +
          mobile.slice(firstSpaceIndex + 1).replaceAll(" ", "");

  return mobile;
}

export function checkPhoneEmpty(mobile : string) : boolean {
  if (mobile.length > 0) {
    // Find the index of the first space
    const mobile_arr = mobile.split(' ')
    // Extract the substring before the first space as CountryCode
    const CountryCode = mobile_arr[0];

    // Extract the substring after the first space as Number
    let number : string = "";
    for(let i=1;i<mobile_arr.length;i++){
      number += mobile_arr[i];
    }

    // Array of country codes having 10-digit phone numbers
    // const countrycodeHaving10DigitNumbers = ["+91","+92","+93","+86","+977","+975","+95","+880","+94","+960",]; // Add other country codes as needed

    // Check if the Number is not empty and if the CountryCode is in the array
    // if (countrycodeHaving10DigitNumbers.includes(CountryCode)) {
      // Check if the Number is 10 digits long
      return number.length !== 0;
    // }else{
    //   return (number.length > 7 && number.length < 15) ? true : false;
    // }
  }

  return true;
}
