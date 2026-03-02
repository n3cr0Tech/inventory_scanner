interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

const categories = ["Electronics", "Clothing", "Food", "Books"];

const mockItems: { id: string; name: string }[] = [
  { id: "8901234567890", name: "Samsung Galaxy Buds" },
  { id: "7350053850019", name: "IKEA Kallax Shelf" },
  { id: "0012345678905", name: "Levi's 501 Jeans" },
  { id: "4006381333931", name: "Staedtler Markers" },
  { id: "5449000000996", name: "Coca-Cola 500ml" },
  { id: "0075678164125", name: "Axe Body Spray" },
  { id: "0041196890897", name: "Purina Cat Food" },
  { id: "0885909950805", name: "Apple USB-C Cable" },
  { id: "0194252029756", name: "iPhone 14 Case" },
  { id: "3614272049018", name: "Lancôme Mascara" },
  { id: "0011110038564", name: "Kroger Orange Juice" },
  { id: "5000159484695", name: "Cadbury Dairy Milk" },
  { id: "0737628064502", name: "Lodge Cast Iron Pan" },
  { id: "0045496596118", name: "Nintendo Joy-Con" },
  { id: "0681131032878", name: "Anker Power Bank" },
  { id: "4902505193453", name: "Shiseido Sunscreen" },
  { id: "0079400785452", name: "Colgate Toothpaste" },
  { id: "0030000056011", name: "Cheerios Cereal" },
  { id: "0027000563956", name: "Campbell's Soup" },
  { id: "3017620422003", name: "Nutella 400g" },
];

export function createMockData(): Item[] {
  return mockItems.map((item, index) => ({
    ...item,
    quantity: Math.floor(Math.random() * 50) + 1,
    category: categories[index % categories.length],
  }));
}