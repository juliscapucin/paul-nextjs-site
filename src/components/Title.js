import { useRef } from "react";

function Title({ text }) {
  const ref = useRef(null);

  return (
    <div className='title' ref={ref}>
      <h1>{text}</h1>
    </div>
  );
}

export default Title;
