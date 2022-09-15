import { options } from "https://esm.sh/v94/preact@10.11.0/src/index.d.ts";
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

    return terms.join('\u200B')
}

function solveExpression(expression: string, variables: variable[]) {
    const terms = expression.split('\u200B')
    console.log(terms, variables)
    const termsCalculated = []
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i]
        let termCalculated;
        if (/[a-z]/.test(term)) {
            const value = variables[i].value
            termCalculated = parseInt(term.slice(0, -1)) * value
        } else {
            termCalculated = parseInt(term)
        }
        termsCalculated.push(termCalculated)
    }
    console.log(termsCalculated)
    return termsCalculated.reduce((a, b) => a + b, 0)
}

function generateQuestion(): { variables: variable[], expression: string, options: number[], answer: number } {
    const variableLength = generateRandomNumber(1, 3)
    const variables: variable[] = [];
    for (let i = 0; i < variableLength; i++) {
        variables.push({
            letter: generateLetter(),
            value: generateRandomNumber()
        })
    }

    const expression = generateExpression(variables)
    console.log(expression)
    const options: number[] = []
    const answer = solveExpression(expression, variables)
    options.push(answer)
    for (let i = 0; i < 3; i++) {
        let variation = generateRandomNumber(5, 10)
        Math.random() >= 0.5 ? variation -= 15 : null
        options.push(answer + variation)
    }
    console.log(options)

    return { variables, expression, options, answer }
}

export default function Question() {
    const { variables, expression, options, answer } = generateQuestion()
    return (
        <div>
            <pre class="font-bold text-xl">{variables.map(variable => `${variable.letter} = ${variable.value}\n`)}</pre>
            <p class="font-bold text-xl">{expression}</p>
            {options.map(option => <Button class="font-bold text-2xl" onClick={() => { if (option == answer) alert("correct") }}>{option}</Button>)}
        </div>
    );
}