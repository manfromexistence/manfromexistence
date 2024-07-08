import { useState } from "react"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import {
  Badge,
  Box,
  Button,
  Field,
  For,
  Group,
  Input,
  InputAddon,
  InputElement,
  Span,
  Stack,
  useRecipe,
} from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Input",
  decorators: [
    (Story: React.ElementType) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Variants = () => {
  const recipe = useRecipe("Input")
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <Input variant={v} placeholder="Placeholder" />
              </td>
            </tr>
          )}
        </For>
        <tr>
          <td>
            <Span fontSize="sm" color="fg.muted" minW="8ch">
              unstyled
            </Span>
          </td>
          <td>
            <Input unstyled placeholder="Placeholder" />
          </td>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useRecipe("Input")
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.size}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <Stack>
                  <Input size={v} placeholder="Placeholder" />
                  <Input variant="filled" size={v} placeholder="Placeholder" />
                </Stack>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithButton = () => {
  return (
    <Stack maxW="sm" gap="4">
      <Field.Root>
        <Field.Label>
          First Name
          <Field.RequiredIndicator fallback={<Badge>Optional</Badge>} />
        </Field.Label>
        <Input />
      </Field.Root>
      <Field.Root>
        <Field.Label>Last Name</Field.Label>
        <Input />
      </Field.Root>
      <Button alignSelf="flex-start" variant="solid" mt="3">
        Submit
      </Button>
    </Stack>
  )
}

export const WithAddon = () => (
  <Stack gap="10">
    <Group>
      <InputElement>$</InputElement>
      <Input ps="8" placeholder="Phone number..." />
    </Group>

    <Group attached>
      <Input placeholder="Placeholder" />
      <InputAddon>.com</InputAddon>
    </Group>
  </Stack>
)

export const PasswordInput = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Group>
      <Input
        paddingEnd="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputElement placement="end">
        <button onClick={handleClick}>
          {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      </InputElement>
    </Group>
  )
}

export const WithStates = () => (
  <Stack align="start">
    <Input placeholder="Idle" />
    <Input invalid placeholder="invalid" />
    <Input disabled placeholder="disabled" />
    <Input readOnly placeholder="readOnly" />
  </Stack>
)

export const WithLabel = () => {
  return (
    <Field.Root id="first-name" required>
      <Field.Label>
        Amount <Field.RequiredIndicator color="fg.error" />
      </Field.Label>
      <Input placeholder="Enter amount" />
      <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
    </Field.Root>
  )
}
