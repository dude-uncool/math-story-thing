const dialogs = [
    "One day on a thursday night, Tony Stark and Albert Einstein met in the library. They started to talk about technology in the past and future.",
    "After that they started talking about math, specifically algebra. Albert Einstein started to give questions to Tony Stark.",
    "\"That was pretty easy,\" said Tony Stark, \"lets try something harder\" \"Lets try some simplification problems\"",
    ""
]

interface DialogsProps {
    currDialog: number
}

export default function Dialogs(props: DialogsProps) {
    const { currDialog } = props
    return (
        <div>
            <div>
                {dialogs[currDialog]}
                {dialogs[currDialog] === undefined ? "This dialog has not been added" : ''}
                {dialogs[currDialog] === undefined ? '' : <img src={`images/${currDialog + 1}.png`} width={900} />}
            </div>
        </div>
    )
}