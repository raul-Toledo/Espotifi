import {React, useState} from 'react';
import { getScrollbarSize, List } from "react-window";
import './LibraryMusic.css';

function RowComponent(props) {
  const songs = props.musicList[props.index];
 const rowColorClass = props.index % 2 === 0 ? "bg-zinc-700" : "bg-zinc-800";
  return (
    <div className={`grow flex flex-row font-bold ${rowColorClass} hover:bg-zinc-200 transition duration-150 ease-in-out`}>
      <div className="w-5 text-center"><p className="font-extralight inline-block align-middle">{songs.id}</p></div>
      <div className="flex-1 text-left"><p>{songs.title}</p> <p className="font-extralight text-shadow-md text-sm">{songs.artist}</p></div>
      <div className="flex-1"><p className="font-extralight inline-block align-middle">{songs.count}</p></div>
      <div className="w-10 text-center"><p className="font-extralight inline-block align-middle">{songs.time}</p></div>
    </div>
  );
}

const LibraryMusic = () => {
    const [size, setSize] = useState(getScrollbarSize);
    const musicList = [
        { id: "1", title: "Zombie", count: "12345", time: "3:45", artist: "The Cranberries" },
        { id: "2", title: "Ode to my family", count: "62701", time: "4:20", artist: "The Cranberries" },
        { id: "3", title: "Linger", count: "54321", time: "4:00", artist: "The Cranberries" },
        { id: "4", title: "Dreams", count: "98765", time: "4:30", artist: "The Cranberries" },
        { id: "5", title: "Salvation", count: "45678", time: "3:50", artist: "The Cranberries" },
    ];

    return(
    <div className="h-full w-full flex flex-col grow text-white ">
      <div className="flex flex-row bg-teal-950 rounded-t-md">
        <div className="grow flex flex-row font-bold">
          <div className="w-5 text-center"><p>#</p></div>
          <div className="flex-1 text-left"><p>Titulo</p></div>
          <div className="flex-1"><p>Reproducciones</p></div>
          <div className="w-10 text-center"><p>🕑</p></div>
        </div>
        <div className="shrink" style={{ width: size }} />
      </div>  
      <div className="overflow-hidden">
        <List
          rowComponent={RowComponent}
          rowCount={musicList.length}
          rowHeight={25}
          rowProps={{ musicList }}
        />
      </div>
    </div>
    );
};

export default LibraryMusic;