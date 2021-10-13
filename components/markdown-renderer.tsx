import React from "react";
import DOMPurify from "dompurify";
import marked from "marked";

interface Props {
  content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
  marked.setOptions({ breaks: true });

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(content)),
      }}
    ></div>
  );
};

export default MarkdownRenderer;
