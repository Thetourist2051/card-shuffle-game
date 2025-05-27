export interface CardInterface {
  id: string;
  suit: Suit;
  rank: string;
  showcard?: boolean;
}

export type Suit = "spade" | "heart" | "diamond" | "club";

