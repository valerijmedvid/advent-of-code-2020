import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const debug = false

const testFileName = "testData.txt"
const inputFileName = "inputData.txt"

let inputData = []
try {
  inputData = fs
    .readFileSync(path.resolve(__dirname, debug ? testFileName : inputFileName), "utf8")
    .split("\n")
} catch (err) {
  console.error(err)
}

const criteria = inputData.map((pass) => {
  const [criteria, sym, password] = pass.split(" ")
  const [min, max] = criteria.split("-").map((x) => parseInt(x))
  const letter = sym.replace(":", "")

  return {
    criteria: { min, max },
    letter,
    password,
    valid1: undefined,
    valid2: undefined,
  }
})

function checkPasswords(criteria) {
  criteria.forEach((line) => {
    const parsedPassword = line.password.split("")
    const filteredPassword = parsedPassword.filter((l) => l == line.letter)
    console.log(parsedPassword[line.criteria.min - 1], parsedPassword[line.criteria.max - 1])

    if (
      line.criteria.min <= filteredPassword.length &&
      filteredPassword.length <= line.criteria.max
    ) {
      line.valid1 = true
    }

    if (
      parsedPassword[line.criteria.min - 1] !== parsedPassword[line.criteria.max - 1] &&
      (parsedPassword[line.criteria.min - 1] === line.letter ||
        parsedPassword[line.criteria.max - 1] === line.letter)
    ) {
      line.valid2 = true
    }
  })
}

checkPasswords(criteria)

console.log(criteria.filter((pass) => pass.valid1).length)
console.log(criteria.filter((pass) => pass.valid2).length)
