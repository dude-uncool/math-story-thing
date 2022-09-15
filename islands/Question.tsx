import { Button } from "../components/Button.tsx";

type variable = {
    letter: string,
    value: number
}

function generateRandomNumber(min = 1, max = 10): number {
    return Math.floor((Math.random() * (max - min) + min))
}

function generateLetter(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function generateExpression(variables: variable[]): string {
    const variableLetters: string[] = []
    variables.forEach(variable => {
        variableLetters.push(variable.letter)
    })

    const terms: string[] = []
    for (let i = 0; i < 2; i++) {
        terms.push(`${Math.random() >= 0.5 ? '-' : i != 0 ? '+' : ''}${generateRandomNumber()}${variableLetters[i] ? variableLetters[i] : ''}`)
    }

    return terms.join('')
}

function solveExpression(expression: string, variables: variable[]) {
    const expressionSplitPlus = expression.split("+")
    const expressionSplit: string[] = []
    expressionSplitPlus.forEach((expression) => expressionSplit.push(...expression.split("-")))
    const terms = expressionSplit.filter((term) => term != "")
    console.log(terms)
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i]
        if (/[a-z]/.test(term.charAt(-1))) {
            const letter = variables[i].letter
        }
    }
}

function generateQuestion(): { variables: variable[], expression: string } {
    const variableLength = generateRandomNumber(1, 3)
    const variables: variable[] = [];
    for (let i = 0; i < variableLength; i++) {
        variables.push({
            letter: generateLetter(),
            value: generateRandomNumber()
        })
    }

    const expression = generateExpression(variables)
    // console.log(expression)
    // solveExpression(expression, variables)

    return { variables, expression }
}

export default function Question() {
    const { variables, expression } = generateQuestion()
    return (
        <div>
            <pre class="font-bold text-xl">{variables.map(variable => `${variable.letter} = ${variable.value}\n`)}</pre>
            <p class="font-bold text-xl">{expression}</p>
            <p class="font-bold font-italic text-xl">x=</p>
        </div>
    );
}