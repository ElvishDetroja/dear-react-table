import React from "react";

const UpArrow = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="8"
    height="8"
    viewBox="27.66099739074707 8.5 43.301002502441406 37.5"
    className={`arrow ${active ? "active" : ""}`}
  >
    <g>
      <path d="m49.309 8.5-21.648 37.5h43.301z" />
    </g>
  </svg>
);

const DownArrow = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="8"
    height="8"
    viewBox="27.66099739074707 8.5 43.301002502441406 37.5"
    transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)"
    className={`arrow ${active ? "active" : ""}`}
  >
    <g>
      <path d="m49.309 8.5-21.648 37.5h43.301z"></path>
    </g>
  </svg>
);

export { UpArrow, DownArrow };
