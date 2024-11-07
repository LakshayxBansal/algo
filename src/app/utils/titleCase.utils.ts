export default function capitalizeFirstChar(str:string) {
    return str.split(' ').map(word => word.length===1 ? word[0].toUpperCase() : word).join(' ');
  }