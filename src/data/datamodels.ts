export interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export const EMPTY_FORM: Item = { 
    id: "", 
    name: "", 
    quantity: 1, 
    category: "Electronics" 
};