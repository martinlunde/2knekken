import React from "react";
import { useQuery } from "react-query";

export default function DashboardView() {
  async function getComic() {
    const result = await fetch("xkcd/2680/info.0.json");
    return result.json();
  }

  const { data } = useQuery(["2680"], () => getComic(), { retry: false });

  return (
    <div>
      <h1>{data?.alt}</h1>
    </div>
  );
}

