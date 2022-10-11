import React from "react";
import { useQuery } from "react-query";

interface ComicResponse {
  day: string;
  month: string;
  year: string;
  num: string;
  link: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
}

export default function DashboardView() {
  
  async function getComic(): Promise<ComicResponse> {
    const result = await fetch("xkcd/2680/info.0.json");
    return result.json();
  }

  const { data: comic } = useQuery(["2680"], () => getComic(), { retry: false });

  return (
    <div className="flex flex-1 flex-col justify-center">
      <h1>{comic?.alt}</h1>
      <img className="w-96" src={comic?.img} alt={comic?.alt} />
    </div>
  );
}

