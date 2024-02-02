export interface Auhtor {
    id: number;
    name: string;
    verified: boolean;
    reviews: {
        content: string;
    }[];
    game: {
        title: string;
    };
}
