interface InputStyle {
    color: string;
    fontWeight: string;
    background: string;
    border: string;
    fontSize: number;
    padding: string;
    borderRadius: string;
    backgroundColor: string;
    boxShadow: string;
    height?: string | number;
    width?: string | number; 
  }
  
  export const inputStyles: InputStyle = {
    color: "white",
    fontWeight: 'bold',
    background: "linear-gradient(to right, #1769aa, #4dabf5)",
    border: "1px solid #ccc",
    fontSize: 12,
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "white",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  };
  