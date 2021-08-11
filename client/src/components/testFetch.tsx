import React, { FC, useState, useEffect } from "react";

interface Props {
  items: string[];
}

export const TestFetch: FC<Props> = ({ items }) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      client_id: "kI6aD0LqK9uSmqaqAxmm1f2w9UVidheL",
      limit: 200,
    }),
  };
  useEffect(() => {
    fetch("https://api.soundcloud.com/users/rinse_france/likes", options).then((res) => console.log(res));
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
