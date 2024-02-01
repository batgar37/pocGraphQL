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

    updateGame(parent, args) {},

    deleteGame(parent, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },

    addGame(parent, args) {
      let id = 1;
      db.games.array.forEach((element) => {
        if (element.id >= id) {
          id = element.id + 1;
        }
      });
      let game = {
        id: id,
        ...args.game,
      };
      db.games.push(game);
      return game;
    },
  },
};
