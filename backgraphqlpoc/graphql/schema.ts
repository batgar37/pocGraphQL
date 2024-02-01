export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!,
        rating: Int!,
        content: String!,
        game: Game!,
        author: Author!
    }

    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!]
    }

    type Query {
        games: [Game]
        game(id: ID!): Game
        reviews: [Review]
        review(id: ID!): Review
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        deleteReview(id: ID!): [Review]
        addReview(review: AddReviewInput): Review
        updateReview(id: ID!, edits: EditReviewInput!): Review
        addGame(game: AddGameInput!): Game
        updateGame(edits: EditGame!): Game
        deleteGame(id:ID!): [Game]
    }

    input AddGameInput {
        title: String!,
        platform: [String!]!
    }

    input EditGame{
        id: ID!,
        title: String!,
        platform: [String!]!
    }

    input AddReviewInput {
        rating: Int!,
        content: String!,
        game_id: String!,
        author_id: String!
    }
    
    input EditReviewInput {
        rating: Int,
        content: String,
        game_id: String,
        author_id: String
    }
`;
