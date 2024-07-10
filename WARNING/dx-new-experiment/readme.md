Sumon
here is the new obj = {
  "slate-50": "210 40% 98%",
  "slate-100": "210 40% 96%",
  "slate-200": "214 31% 91%",
  "slate-300": "213 26% 83%",
  "slate-400": "215 20% 65%",
  "slate-500": "215 16% 46%",
  "slate-600": "215 19% 34%",
  "slate-700": "215 24% 26%",
  "slate-800": "217 32% 17%",
  "slate-900": "222 47% 11%",
  "slate-950": "229 84% 4%",
  ...
}
there are 10 colors varients in each color names
So, you map through all colors divide them with 10 
items put the value of as it is written then for white
put "0 0% 100%". and console log this:
  "the color name of 10 items of all items (example gray)": {
    "light": {
      "background": "white",
      "foreground": "gray-950",
      "card": "white",
      "card-foreground": "gray-950",
      "popover": "white",
      "popover-foreground": "gray-950",
      "primary": "gray-900",
      "primary-foreground": "gray-50",
      "secondary": "gray-100",
      "secondary-foreground": "gray-900",
      "muted": "gray-100",
      "muted-foreground": "gray-500",
      "accent": "gray-100",
      "accent-foreground": "gray-900",
      "destructive": "red-500",
      "destructive-foreground": "gray-50",
      "border": "gray-200",
      "input": "gray-200",
      "ring": "gray-950"
    },
    "dark": {
      "background": "gray-950",
      "foreground": "gray-50",
      "card": "gray-950",
      "card-foreground": "gray-50",
      "popover": "gray-950",
      "popover-foreground": "gray-50",
      "primary": "gray-50",
      "primary-foreground": "gray-900",
      "secondary": "gray-800",
      "secondary-foreground": "gray-50",
      "muted": "gray-800",
      "muted-foreground": "gray-400",
      "accent": "gray-800",
      "accent-foreground": "gray-50",
      "destructive": "red-900",
      "destructive-foreground": "gray-50",
      "border": "gray-800",
      "input": "gray-800",
      "ring": "gray-300"
    }
  },