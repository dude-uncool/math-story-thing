import Button from "../islands/Button.tsx";

type variable = {
    letter: string,
    value: number
}

type returnValue = {
    variables?: variable[],
    question?: string,
    expression: string,
    options: (number | string)[],
    answer: number | string
}

function generateRandomNumber(min = 1, max = 10): number {
    return Math.floor((Math.random() * (max - min) + min))
}

function generateLetter(blacklist = ""): string {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    if (blacklist) {
        const start = alphabet.indexOf(blacklist);
        const end = start + blacklist.length;
        alphabet = alphabet.substring(0, start - 1) + alphabet.substring(end)
    }
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function generateExpression(variables: variable[], length = 2): string {
    const variableLetters: string[] = []
    variables.forEach(variable => {
        variableLetters.push(variable.letter)
    })

    const terms: string[] = []
    for (let i = 0; i < length; i++) {
        terms.push(`${Math.random() >= 0.5 ? '-' : i != 0 ? '+' : ''}${generateRandomNumber()}${variableLetters[i] ? variableLetters[i] : ''}`)
    }

    return terms.join('\u200B')
}

function solveExpression(expression: string, variables: variable[]): number {
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

function simplifyExpression(expression: string): string {
    console.log(expression)
    type termVariable = {
        term: string,
        variable: string
    }
    const terms = expression.split('\u200B').map((term) => term.replace('\u200B', ''))
    const termVariables: termVariable[] = []
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i]
        if (/[a-z]/.test(term)) {
            termVariables.push({ term, variable: term.slice(-1) })
        } else {
            termVariables.push({ term, variable: "\u200B" })
        }
    }

    const likeTerms: termVariable[][] = []
    for (let i = 0; i < termVariables.length; i++) {
        const term = termVariables[i];
        if (likeTerms.length == 0) {
            likeTerms.push([term])
        }
        else {
            const likeTerm = likeTerms.find(likeTerm => likeTerm[0].variable === term.variable)
            if (likeTerm) {
                likeTerm.push(term)
            }
            else {
                likeTerms.push([term])
            }
        }
    }
    console.log(likeTerms)
    const expressionSimplified: string[] = []
    likeTerms.forEach((likeTerm, i) => {
        const termNumbers: number[] = []
        likeTerm.forEach(termVariable => {
            termNumbers.push(parseInt(termVariable.term.slice(0, -1)))
        })
        console.log(termNumbers)
        const simplified = termNumbers.reduce((a, b) => a + b, 0)
        expressionSimplified.push(`${simplified > 0 && i != 0 ? '+' : ''}${simplified}${likeTerm[0].variable}`)
    })

    return expressionSimplified.join('')
}

function level1(): returnValue {
    const variableLength = generateRandomNumber(1, 3)
    const variables: variable[] = [];
    for (let i = 0; i < variableLength; i++) {
        variables.push({
            letter: generateLetter(variables.map(variable => variable.letter).join('')),
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
    return { variables, expression, options, answer }
}

function level2(): returnValue {
    const variable = {
        letter: generateLetter(),
        value: 1
    }
    const expression = generateExpression([variable, variable])

    const answer = simplifyExpression(expression)
    const options = [answer]
    for (let i = 0; i < 3; i++) {
        options.push(`${generateRandomNumber(1, 10)}${variable.letter}`)
    }
    return { question: "Simplify the following expression", expression, options, answer }
}

function level3(): returnValue {
    const variables = []
    for (let i = 0; i < 2; i++) {
        const variable = {
            letter: generateLetter(),
            value: 1
        }
        variables.push(variable, variable)
    }
    const variablesShuffled = variables
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    const expression = generateExpression(variablesShuffled, 4)

    const answer = simplifyExpression(expression)
    const options = [answer]
    for (let i = 0; i < 3; i++) {
        const e = []
        for (let j = 0; j < 4; j += 2) {
            e.push(`${generateRandomNumber(-10, 10)}${variables[j].letter}`)
        }
        options.push(e.join('+'))
    }
    return { question: "Simplify the following expression", expression, options, answer }
}

function generateQuestion(level: number): returnValue {
    console.log(level)
    const { variables, expression, options, question = undefined, answer } = level == 1 ? level1() : level == 2 ? level2() : level3()
    const optionsShuffled = options
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return { variables, question, expression, options: optionsShuffled, answer }
}

interface QuestionProps {
    level: number
}

export default function Question(props: QuestionProps) {
    if (props.level == 0) return null
    console.log('question')
    return generateQuestion(props.level)
}