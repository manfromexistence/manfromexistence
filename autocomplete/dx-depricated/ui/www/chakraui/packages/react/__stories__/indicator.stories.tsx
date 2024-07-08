import { Box, Circle, Indicator, Stack } from "../src"

export default {
  title: "Components / Indicator",
}

const placements = [
  "bottom-end",
  "bottom-start",
  "top-end",
  "top-start",
  "bottom-center",
  "top-center",
  "middle-center",
  "middle-end",
  "middle-start",
] as const

export const Basic = () => (
  <Stack gap="10">
    {placements.map((placement) => (
      <Stack key={placement} gap="3">
        <p>{placement}</p>
        <Box position="relative" width="80px" height="80px" bg="gray.50">
          <Indicator placement={placement}>
            <Circle size="5" bg="red.100">
              3
            </Circle>
          </Indicator>
        </Box>
      </Stack>
    ))}
  </Stack>
)

export const WithOffsetX = () => (
  <Stack gap="10">
    {placements.map((placement) => (
      <Stack key={placement} gap="3">
        <p>{placement}</p>
        <Box position="relative" width="80px" height="80px" bg="gray.50">
          <Indicator placement={placement} offsetX="2">
            <Circle size="5" bg="red.100">
              3
            </Circle>
          </Indicator>
        </Box>
      </Stack>
    ))}
  </Stack>
)

export const WithOffsetY = () => (
  <Stack gap="10">
    {placements.map((placement) => (
      <Stack key={placement} gap="3">
        <p>{placement}</p>
        <Box position="relative" width="80px" height="80px" bg="gray.50">
          <Indicator placement={placement} offsetY="2">
            <Circle size="5" bg="red.100">
              3
            </Circle>
          </Indicator>
        </Box>
      </Stack>
    ))}
  </Stack>
)

export const WithOffset = () => (
  <Stack gap="10">
    {placements.map((placement) => (
      <Stack key={placement} gap="3">
        <p>{placement}</p>
        <Box position="relative" width="80px" height="80px" bg="gray.50">
          <Indicator placement={placement} offset="4">
            <Circle size="5" bg="red.100">
              3
            </Circle>
          </Indicator>
        </Box>
      </Stack>
    ))}
  </Stack>
)
