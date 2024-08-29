import * as React from "react";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "novel";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

export interface IRenderJsonProps {
  json: JSONContent;
}

export default function RenderJson({ json }: IRenderJsonProps) {
  const outPut = React.useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      ListItem,
      Underline,
      OrderedList,
      CodeBlock,
      Blockquote,
      Heading,
      Link,
      TextStyle,
      BulletList,
      TaskItem,
      TaskList
    ]);
  }, [json]);
  return (
    <div
      className="prose capitalize m-auto w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3  prose-li:marker:text-primary"
      dangerouslySetInnerHTML={{ __html: outPut }}
    />
  );
}
