import { useState } from "react";
import "./Example.css";

export function Example() {
  const [state, setState] = useState(0);
  return (
    <div className="example">
      <h1>{state}</h1>
      <button onClick={() => setState((prev) => prev + 1)}>Click me</button>
    </div>
  );
}
