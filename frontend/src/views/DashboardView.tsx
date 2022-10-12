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

type ComicType = "XKCD" | 'lunsj';

export default function DashboardView() {

  const [currentComicId, setCurrentComicId] = useState<number>(2680);
  const [comicType, setComicType] = useState<ComicType>('XKCD');

  async function getComic(id: number, comicType: ComicType): Promise<ComicResponse> {
    
    const comicUrl: { [key in ComicType]: string} = {
      'XKCD': `xkcd/${id.toString()}/info.0.json`,
      'lunsj': `lunsj/${id.toString()}`
    };

    const result = await fetch(comicUrl[comicType]);
    return result.json();
  }

  const { data: comic, isLoading } = useQuery([{ currentComicId, comicType }], () => getComic(currentComicId, comicType));

  return (
    <div className="flex flex-1 flex-col justify-center items-center bg-amber-600 h-screen">
      <div className="w-50 p-4 bg-white rounded-lg flex flex-col items-center">
      <h1 className="pb-4">{comic?.title}</h1>
      <div className="w-96 min-h-[20vh] flex justify-center">
        { !isLoading ? <img src={comic?.img} alt={comic?.alt} /> : <h1>is loading...</h1> }
      </div>
      <div className="flex w-full justify-between pt-4">
        <Button title="< previous" onClick={() => setCurrentComicId(currentComicId - 1)}/>
        <Button title={comicType} onClick={() => setComicType(comicType === "XKCD" ? 'lunsj' : 'XKCD')}/>
        <Button title="next >"  onClick={() => setCurrentComicId(currentComicId + 1)}/>
      </div>
      </div>
    </div>
  );
}

