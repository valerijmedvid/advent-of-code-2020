import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const debug = true

const testFileName = "testData.txt"
const inputFileName = "inputData.txt"

let inputData = []
try {
  inputData = fs
    .readFileSync(path.resolve(__dirname, debug ? testFileName : inputFileName), "utf8")
    .split("\n")
    .map((x) => parseInt(x))
} catch (err) {
  console.error(err)
}

const findTwoNumbers = () => {
  for (let i = 0; i < inputData.length; i++) {
    for (let y = 0; y < inputData.length; y++) {
      if (inputData[i] + inputData[y] === 2020) {
        return [inputData[i], inputData[y]]
      }
    }
  }
}

const findThreeNumbers = () => {
  for (let i = 0; i < inputData.length; i++) {
    for (let y = 0; y < inputData.length; y++) {
      for (let x = 0; x < inputData.length; x++) {
        if (inputData[i] + inputData[y] + inputData[x] === 2020) {
          return [inputData[i], inputData[y], inputData[x]]
        }
      }
    }
  }
}

const [num1, num2] = findTwoNumbers()
const [num3, num4, num5] = findThreeNumbers()

console.log(num1 * num2)
console.log(num3 * num4 * num5)
