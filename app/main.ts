// Examples:
// - decodeBencode("5:hello") -> "hello"
// - decodeBencode("10:hello12345") -> "hello12345"
// = decodeBencode("i52e") -> "52"
function decodeBencode(bencodedValue: string): string | number {
  /* This function is used to decode a bencoded string
    The bencoded string is a string that is prefixed by the length of the string
    **/

  // Check if the first character is a digit
  if (!isNaN(parseInt(bencodedValue[0]))) {
    const firstColonIndex = bencodedValue.indexOf(":");
    if (firstColonIndex === -1) {
      throw new Error("Invalid encoded value");
    }
    return bencodedValue.substring(firstColonIndex + 1);
  } else {
    const first = bencodedValue[0];
    const last = bencodedValue[bencodedValue.length - 1];
    if (first !== "i" && last !== "e") {
      throw new Error("Invalid encoded value");
    }
    const digit = bencodedValue.slice(1, bencodedValue.length - 1);
    const parsedDigit = parseInt(digit);
    if (typeof parsedDigit !== "number") {
      throw new Error("Invalid encoded value");
    }
    return parsedDigit;
  }
}

const args = process.argv;
const bencodedValue = args[3];

if (args[2] === "decode") {
  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.error("Logs from your program will appear here!");

  try {
    const decoded = decodeBencode(bencodedValue);
    console.log(JSON.stringify(decoded));
  } catch (error) {
    //@ts-expect-error error message
    console.error(error.message);
  }
}
