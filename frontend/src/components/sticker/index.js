import React from "react";
import { Times } from "../../icons";

export default function Sticker({ number }) {
  return (
    <div className="sticker">
      <div className="sticker__removeBox">
        <Times />
      </div>
      <div className="sticker__number">{number}</div>
    </div>
  );
}
