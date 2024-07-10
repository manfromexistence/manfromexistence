// Inspired by https://github.dev/modulz/stitches-site code demo
import React from "react";
import refractor from "refractor/core";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import bash from "refractor/lang/bash";
import css from "refractor/lang/css";
import diff from "refractor/lang/diff";
import hastToHtml from "hast-util-to-html";
import rangeParser from "parse-numeric-range";
import {clsx} from "@nextui-org/shared-utils";

import {Pre} from "./pre";
import {WindowActions} from "./window-actions";

import highlightLine from "@/libs/rehype-highlight-line";
import highlightWord from "@/libs/rehype-highlight-word";

refractor.register(js);
refractor.register(jsx);
refractor.register(bash);
refractor.register(css);
refractor.register(diff);

type PreProps = Omit<React.ComponentProps<typeof Pre>, "css">;

export type CodeBlockProps = PreProps & {
  language: "js" | "jsx" | "bash" | "css" | "diff";
  title?: string;
  value?: string;
  highlightLines?: string;
  mode?: "static" | "typewriter";
  showLineNumbers?: boolean;
  showWindowIcons?: boolean;
  className?: string;
};

/**
 * recursively get all text nodes as an array for a given element
 */
function getTextNodes(node: any): any[] {
  let childTextNodes = [];

  if (!node.hasChildNodes()) return [];

  const childNodes = node.childNodes;

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType == Node.TEXT_NODE) {
      childTextNodes.push(childNodes[i]);
    } else if (childNodes[i].nodeType == Node.ELEMENT_NODE) {
      Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
    }
  }

  return childTextNodes;
}

/**
 * given a text node, wrap each character in the
 * given tag.
 */
function wrapEachCharacter(textNode: any, tag: string, count: number) {
  const text = textNode.nodeValue;
  const parent = textNode.parentNode;

  const characters = text.split("");

  characters.forEach(function (character: any, letterIndex: any) {
    const delay = (count + letterIndex) * 50;
    var element = document.createElement(tag);
    var characterNode = document.createTextNode(character);

    element.appendChild(characterNode);
    element.style.opacity = "0";
    element.style.transition = `all ease 0ms ${delay}ms`;

    parent.insertBefore(element, textNode);

    // skip a couple of frames to trigger transition
    requestAnimationFrame(() => requestAnimationFrame(() => (element.style.opacity = "1")));
  });

  parent.removeChild(textNode);
}

function CodeTypewriter({value, className, css, ...props}: any) {
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const wrapper = wrapperRef.current as any;

    if (wrapper) {
      var allTextNodes = getTextNodes(wrapper);

      let count = 0;

      allTextNodes?.forEach((textNode) => {
        wrapEachCharacter(textNode, "span", count);
        count = count + textNode.nodeValue.length;
      });
      wrapper.style.opacity = "1";
    }

    return () => (wrapper.innerHTML = value);
  }, []);

  return (
    <Pre className={className} css={css} {...props}>
      <code
        dangerouslySetInnerHTML={{__html: value}}
        ref={wrapperRef}
        className={className}
        style={{opacity: 0}}
      />
    </Pre>
  );
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>((_props, forwardedRef) => {
  const {
    language,
    value,
    title,
    highlightLines = "0",
    className = "",
    mode,
    showLineNumbers,
    showWindowIcons,
    ...props
  } = _props;

  let result: any = refractor.highlight(value || "", language);

  result = highlightLine(result, rangeParser(highlightLines));

  result = highlightWord(result);

  // convert to html
  result = hastToHtml(result);

  // TODO reset theme
  const classes = `language-${language}`;
  const codeClasses = clsx("absolute w-full px-4 pb-6", showWindowIcons ? "top-10" : "top-0");

  if (mode === "typewriter") {
    return <CodeTypewriter className={classes} css={css} value={result} {...props} />;
  }

  return (
    <Pre
      ref={forwardedRef}
      className={clsx("code-block", classes, className)}
      data-line-numbers={showLineNumbers}
      {...props}
    >
      {showWindowIcons && <WindowActions title={title} />}
      <code dangerouslySetInnerHTML={{__html: result}} className={clsx(classes, codeClasses)} />
    </Pre>
  );
});

CodeBlock.displayName = "NextUI - CodeBlock";

export default CodeBlock;
