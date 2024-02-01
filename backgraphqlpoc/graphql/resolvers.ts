import db from "../_db";

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(parent, args) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(parent, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(parent, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Mutation: {
    deleteReview(parent, args) {
      db.reviews = db.reviews.filter((review) => review.id !== args.id);
      return db.reviews;
    },
    addReview(parent, args) {
      let review = {
        ...args.review,
        id: Math.floor(Math.random() * 100000).toString(),
      };
      db.reviews.push(review);

      return review;
    },
    updateReview(parent, args) {
      db.reviews = db.reviews.map((review) => {
        if (review.id === args.id) {
          return { ...review, ...args.edits };
        }
        return review;
      });

      return db.reviews.find((review) => review.id === args.id);
    },

    updateGame(_, args) {
      db.games = db.games.map((g) => {
        console.log(`game id to modify is ${args.edits.id}`);
        if (g.id == args.edits.id) {
          console.log(`game id is ${g.id}`);
          return { ...g, ...args.edits };
        }

        return g;
      });

      return db.games.find((g) => g.id === args.edits.id);
    },
    deleteGame(parent, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let id = 1;
      db.games.forEach((element) => {
        if (element.id == id) {
          id += 1;
        }
      });
      let game = {
        id: id.toString(),
        ...args.game,
      };
      db.games.push(game);
      return game;
    },
    deleteAuthor(_,args){
      db.authors=db.authors.filter((a)=>a.id!==args.id)
      return db.authors
    },
    addAuthor(_,args){
      let   author={
        ...args.author,
        id:Math.floor(Math.random() *10000).toString()
      }
      db.authors.push(author)
      return author
    },
    updateAuthor(parent, args) {
      db.authors = db.authors.map((a) => {
        if (a.id == args.id) {
          return { ...a, ...args.edits };
        }

        return a;
      });

      return db.authors.find((a) => a.id === args.id);
    },
  },
};
