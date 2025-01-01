import { Stack } from "../../../shared/ui/Stack/Stack"
import { ActionButton } from "../ui/Buttons/ActionButton"

export const MessageForm= ({onclose}) => {
    return(
        <Stack direction="column" gap={16} >
            Select a row!
            <ActionButton variant="green" onClick={onclose} > 
                OK
            </ActionButton>
        </Stack>
    )
}