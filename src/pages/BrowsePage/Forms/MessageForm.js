import { ActionButton } from "../ui/Buttons/ActionButton"

export const MessageForm= ({onclose}) => {
    return(
        <div>
            Select a row!
            <ActionButton variant="green" onClick={onclose} > 
                OK
            </ActionButton>
        </div>
    )
}