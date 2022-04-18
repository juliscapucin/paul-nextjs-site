import { useEffect, useRef } from "react";

function Paragraph({ textParagraph }) {
  const refParagraph = useRef(null);

  useEffect(() => {
    refParagraph.current.innerHTML = textParagraph;
  }, [refParagraph, textParagraph]);

  return (
    <article className='text-paragraph' ref={refParagraph}>
      {textParagraph}
    </article>
  );
}

export default Paragraph;
