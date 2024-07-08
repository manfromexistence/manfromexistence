import { createContext, useContext } from "react";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  EditorTestCases,
  defaultBlockSpecs,
  defaultProps,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import { createReactBlockSpec } from "../../schema/ReactBlockSpec";

const ReactCustomParagraph = createReactBlockSpec(
  {
    type: "reactCustomParagraph",
    propSchema: defaultProps,
    content: "inline",
  },
  {
    render: (props) => (
      <p ref={props.contentRef} className={"react-custom-paragraph"} />
    ),
    toExternalHTML: () => (
      <p className={"react-custom-paragraph"}>Hello World</p>
    ),
  }
);

const SimpleReactCustomParagraph = createReactBlockSpec(
  {
    type: "simpleReactCustomParagraph",
    propSchema: defaultProps,
    content: "inline",
  },
  {
    render: (props) => (
      <p ref={props.contentRef} className={"simple-react-custom-paragraph"} />
    ),
  }
);

export const TestContext = createContext<true | undefined>(undefined);

const ReactContextParagraphComponent = (props: any) => {
  const testData = useContext(TestContext);
  if (testData === undefined) {
    throw Error();
  }

  return <div ref={props.contentRef} />;
};

const ReactContextParagraph = createReactBlockSpec(
  {
    type: "reactContextParagraph",
    propSchema: defaultProps,
    content: "inline",
  },
  {
    render: ReactContextParagraphComponent,
  }
);

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    reactCustomParagraph: ReactCustomParagraph,
    simpleReactCustomParagraph: SimpleReactCustomParagraph,
    reactContextParagraph: ReactContextParagraph,
  },
});

export const customReactBlockSchemaTestCases: EditorTestCases<
  typeof schema.blockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema
> = {
  name: "custom react block schema",
  createEditor: () => {
    return BlockNoteEditor.create({
      schema,
      uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
    });
  },
  documents: [
    {
      name: "reactCustomParagraph/basic",
      blocks: [
        {
          type: "reactCustomParagraph",
          content: "React Custom Paragraph",
        },
      ],
    },
    {
      name: "reactCustomParagraph/styled",
      blocks: [
        {
          type: "reactCustomParagraph",
          props: {
            textAlignment: "center",
            textColor: "orange",
            backgroundColor: "pink",
          },
          content: [
            {
              type: "text",
              styles: {},
              text: "Plain ",
            },
            {
              type: "text",
              styles: {
                textColor: "red",
              },
              text: "Red Text ",
            },
            {
              type: "text",
              styles: {
                backgroundColor: "blue",
              },
              text: "Blue Background ",
            },
            {
              type: "text",
              styles: {
                textColor: "red",
                backgroundColor: "blue",
              },
              text: "Mixed Colors",
            },
          ],
        },
      ],
    },
    {
      name: "reactCustomParagraph/nested",
      blocks: [
        {
          type: "reactCustomParagraph",
          content: "React Custom Paragraph",
          children: [
            {
              type: "reactCustomParagraph",
              content: "Nested React Custom Paragraph 1",
            },
            {
              type: "reactCustomParagraph",
              content: "Nested React Custom Paragraph 2",
            },
          ],
        },
      ],
    },
    {
      name: "simpleReactCustomParagraph/basic",
      blocks: [
        {
          type: "simpleReactCustomParagraph",
          content: "React Custom Paragraph",
        },
      ],
    },
    {
      name: "simpleReactCustomParagraph/styled",
      blocks: [
        {
          type: "simpleReactCustomParagraph",
          props: {
            textAlignment: "center",
            textColor: "orange",
            backgroundColor: "pink",
          },
          content: [
            {
              type: "text",
              styles: {},
              text: "Plain ",
            },
            {
              type: "text",
              styles: {
                textColor: "red",
              },
              text: "Red Text ",
            },
            {
              type: "text",
              styles: {
                backgroundColor: "blue",
              },
              text: "Blue Background ",
            },
            {
              type: "text",
              styles: {
                textColor: "red",
                backgroundColor: "blue",
              },
              text: "Mixed Colors",
            },
          ],
        },
      ],
    },
    {
      name: "simpleReactCustomParagraph/nested",
      blocks: [
        {
          type: "simpleReactCustomParagraph",
          content: "Custom React Paragraph",
          children: [
            {
              type: "simpleReactCustomParagraph",
              content: "Nested React Custom Paragraph 1",
            },
            {
              type: "simpleReactCustomParagraph",
              content: "Nested React Custom Paragraph 2",
            },
          ],
        },
      ],
    },
    {
      name: "reactContextParagraph/basic",
      blocks: [
        {
          type: "reactContextParagraph",
          content: "React Context Paragraph",
        },
      ],
    },
  ],
};
