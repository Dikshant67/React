import {useEffect, useRef} from "react";
import {useKey} from "./useKey";

export function Search({ setQuery,query }) {
    const inputElement = useRef(null);

    useKey("Enter",function (){
        if(document.activeElement === inputElement.current) {return;}
            inputElement.current?.focus();
            setQuery("");

    })
    // useEffect(function (){
    //     function callback(e){
    //
    //     }
    //     document.addEventListener("keydown", callback);
    //     return () => {document.addEventListener("keydown", callback);};
    //
    // },[setQuery]);
 //  useEffect(()=> {
 //  const el=document.querySelector(".snbhearch");
 // console.log(el);
 // el.focus();
 //  },[])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
      value={query}
    />
  );
}
