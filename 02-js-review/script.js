const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}
/**
 * Destructuring
 */

const books = getBooks();
const book = getBook(2);
book;

// const title=book.title;
// title;
// const author=book.author;
// author;
// console.log(author,title)
const {
  title,
  author,
  pages,
  publicationDate,
  genres,
  translations,
  hasMovieAdaptation,
  reviews,
} = book;
title;
author;
translations;
publicationDate;
genres;
const gen1 = genres[0];
const gen2 = genres[1];
gen1;
gen2;
const [primarygen, secondarygen, terti] = genres;
console.log(primarygen);
console.log(secondarygen);
terti;
//the spread operator
//used to pass the last/remaining elements in arrray to pass in bundled array

const [one, two, ...four] = genres;
one;
two;
four;

const addon_to_genres = [...genres, "horror"];
//also to paass one  array as elements in another array
addon_to_genres;

const updatedBook = {
  ...book,
  //adding a new property
  moviePublicationDate: "2001-12-12",
  //ovewriting an existing property
  pages: 1232,
};

updatedBook;
const summary = `${title},a ${pages} pages book is written by ${
  author.split("")[2]
} `;
//ternary Operator in js
summary;
pageRange = pages > 1000 ? "over a thousand " : "less than thousand ";
pageRange;
//arrow functions
// function getYear(str) {
//   return str.split("-")[0];
// }

const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));

const add = (a, b) => a + b;
console.log(add(3, 322));

const greet = (name) => `Hi ${name}`;
console.log(greet("Thorfin"));

const getUserDetails = (name, age) => {
  return {
    name: name,
    age: age,
    idAdult: age >= 18,
  };
};
hasMovieAdaptation;
console.log(getUserDetails("Dikshant", 17).idAdult);
//Short Circuiting

console.log(false && "This book ");

const abc = true;

console.log(abc && "This is the one who knocks");

console.log("thorfin" && "vinland");
console.log("hi" && "bye");
console.log(0 && "some string");
console.log(1 && "some string");
console.log(1 && 1);
console.log(0 || 1);
// console.log(book.reviews.librarything.reviewsCount);
// const count = book.reviews.librarything.reviewsCount || "no data";
// count;
//nullish coalescing operator
//for ignoring 0 as a nullish character ,it considers undefined and null values only
// const count2 = book.reviews.librarything.reviewsCount ?? "no data";
// count2;

//----------------------------------------------
//Optional Chaining
//if any values gives undefined value and we are fetching furthere value from that undefined value in that case optional chaining removes that error
//int this case book.reviews.librarything returns undefined values so further this optional chaining option will not try to read the property
function getTotalReviewCount(book) {
  const goodreadsCount = book?.reviews?.goodreads?.reviewsCount;
  const librarythingCount = book?.reviews.librarything?.reviewsCount ?? 0;
  return goodreadsCount + librarythingCount;
}
console.log(getTotalReviewCount(book));

//usage of the map method

const arr = [1, 2, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => el * 2);
arr;
const titles = books.map((book) => book.title);
titles;

const essentialData = books.map((a) => ({
  title: a.title,
  author: a.author,
  reviewsCount: getTotalReviewCount(a),
}));
essentialData;
const shortbooks = books
  .filter((v) => v.pages < 500)
  .filter((a) => a.hasMovieAdaptation);
shortbooks;
const pagesAllBooks = books.reduce((acc, b) => acc + b.pages, 0);
pagesAllBooks;
const sorted = arr.slice().sort((a, b) => b - a);
sorted;
//1)Add book object to array
const newBook = {
  id: 6,
  title: "Harry Potter and Chamber of Secrets",
  author: "J K Rowling",
};
const booksAfterAdd = [...books, newBook];
booksAfterAdd;

//2)Delete Book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
booksAfterDelete;

//3)Update the book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 1210 } : book
);
booksAfterUpdate;

console.log();
fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
  res.json().then((data) => console.log(data))
);
async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);
  return data;
}
getTodos();
console.log("jonas");
