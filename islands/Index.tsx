import { useCallback, useMemo, useState } from "preact/hooks";
import Question from "../components/Question.tsx";
import Button from "./Button.tsx";
import Dialogs from "./dialogs.tsx";

type variable = {
    letter: string,
    value: number
}

type QuestionReturnValue = {
    variables?: variable[],
    question?: string,
    expression: string,
    options: (number | string)[],
    answer: number | string
}

export default function Home() {
    const [currDialog, setCurrDialog] = useState(0)
    const [question, setQuestion] = useState(Question({ level: currDialog }))
    useMemo(() => {
        setQuestion(Question({ level: currDialog }))
    }, [currDialog])
    console.log(question)
    return (
        <div class="p-4 mx-auto max-w-screen-md">
            <Dialogs currDialog={currDialog} />
            {question ? '' : <Button onClick={() => { setCurrDialog(currDialog + 1); }}>Next</Button>}
            {question ? <div>
                <pre class="font-bold text-xl">{question.variables?.map(variable => `${variable.letter} = ${variable.value}\n`) || question}</pre>
                <p class="font-bold text-xl">{question.expression}</p>
                {question.options.map(option => <Button class="font-bold text-2xl" onClick={() => option == question.answer ? setCurrDialog(currDialog + 1) : alert("Try again")}>{option}</Button>)}
                <br />
            </div> : ''}
        </div>
    );
}
