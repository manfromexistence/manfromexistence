import { styled, keyframes } from '@pigment-css/react';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const Component = styled.div(({ theme }) => ({
  color: (theme.vars ?? theme).palette.primary.main,
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
}));

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
  font-size: ${({ theme }) => (theme.vars ?? theme).size.font.h1};
`;

const SliderRail2 = styled.span`
  display: block;
  opacity: 0.38;
  font-size: ${({ theme }) => (theme.vars ?? theme).size.font.h1};
  ${SliderRail} {
    display: none;
  }
`;
