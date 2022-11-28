export const SCRAP_CATEGORIES = [
  { id: 1, name: "General", rate: "" },
  { id: 2, name: "Radi Kaghaz", rate: "55" },
  { id: 3, name: "Mix Plastic", rate: "70" },
  { id: 4, name: "Tin Dabba", rate: "105" },
  { id: 5, name: "Steel", rate: "180" },
];

export const calculatePrice = (quantity, price) => {
  return quantity * price;
};
