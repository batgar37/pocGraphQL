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

  Mutation:{
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
    }
  }
};
