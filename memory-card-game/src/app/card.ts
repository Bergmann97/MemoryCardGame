export interface Card {
    id: number;
    state: "covered" | "uncovered" | "paired" | "unclickable";
}
