import { useState } from "react";

const poemStanzas = [
  `The sun dips low, a golden hue,
The sky ignites in shades of blue.
The trees stand tall, their leaves aflutter,
Whispering secrets to one another.`,

  `In your eyes, I find my home,
A place where I no longer roam.
Your touch, a balm, your voice, a song,
With you, I know I belong.`,

  `The clock ticks on, relentless, steady,
Moments fleeting, never ready.
Yet in each second, life does bloom,
A fleeting dance, a fleeting room.`,

  `Dark clouds gather, thunder roars,
A tempest brews behind closed doors.
Yet in the chaos, a light does gleam,
A fragile hope, a fragile dream.`,

  `Through valleys deep and mountains high,
I wander 'neath the endless sky.
Each step a story, each path a rhyme,
A journey measured not by time.`,

  `In the quiet of the night,
Dreams take flight, beyond our sight.
Whispers of what could have been,
A world unseen, a life unseen.`,

  `The waves crash loud, the waves crash free,
The ocean sings its melody.
A timeless tune, a siren's call,
It beckons one, it beckons all.`,

  `Through trials faced and battles fought,
Lessons learned, wisdom sought.
Each scar a mark, each tear a tale,
A spirit strong that will not fail.`,
];

function App() {
  return (
    <div className="App">
      <TextExpander text={poemStanzas[0]} wordLimit={4} />
      <TextExpander text={poemStanzas[1]} wordLimit={10} />
    </div>
  );
}
function TextExpander({ text, wordLimit }) {
  const [text1, setText] = useState(text);
  const count = text.split(/\s+/).filter((word) => word.length > 0).length;
  console.log(count);
  function onShowAll() {
    setText(text);
  }
  function onCollapse() {
    if (count > wordLimit) {
      const para = text.substring(0, wordLimit * 5);
      console.log(para);
      setText(para);
    }
  }

  return (
    <div>
      <p>
        {text1}
        <button onClick={() => onShowAll()}>Show all</button>
        <button onClick={() => onCollapse()}>On Collapse</button>
      </p>
    </div>
  );
}
export default App;
