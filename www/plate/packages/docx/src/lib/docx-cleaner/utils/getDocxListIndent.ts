export const getDocxListIndent = (element: Element): number => {
  const styleAttribute = element.getAttribute('style') || '';
  const matches = /level(\d+)/i.exec(styleAttribute);

  if (matches && matches.length > 0) {
    const [, level] = matches;

    return Number.parseInt(level, 10);
  }

  return 1;
};
