import React, { useState } from "react";
import { useQuery } from "react-query";
import Button from "../components/Button";

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

  const [currentComicId, setCurrentComicId] = useState<number>(2680);

  async function getComic(id: number): Promise<ComicResponse> {
    // const result = await fetch(`xkcd/${id.toString()}/info.0.json`);
    const result = await fetch(`lunsj/${id.toString()}`);
    return result.json();
  }

  const { data: comic, isLoading } = useQuery([{ currentComicId }], () => getComic(currentComicId));

  return (
    <div className="flex flex-1 flex-col justify-center">
      <h1>{comic?.title}</h1>
      {!isLoading ? <img className="w-96" src={comic?.img} alt={comic?.alt} /> : <h1>is loading...</h1>}
      <div>
        <Button title="< previous" onClick={() => setCurrentComicId(currentComicId - 1)} />
        <Button title="next >" onClick={() => setCurrentComicId(currentComicId + 1)} />
      </div>
    </div>
  );
}

