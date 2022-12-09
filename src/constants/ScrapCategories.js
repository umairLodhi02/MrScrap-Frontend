export const SCRAP_CATEGORIES = [
  { id: 1, name: "Radi Kaghaz", rate: "55" },
  { id: 2, name: "Mix Plastic", rate: "70" },
  { id: 3, name: "Tin Dabba", rate: "105" },
  { id: 4, name: "Steel", rate: "180" },
];

export const calculatePrice = (quantity, category) => {
  let cat = SCRAP_CATEGORIES.filter((c) => c.name === category);
  console.log(quantity, category, cat);

  return quantity * cat[0].rate;
};

export const SCRAP_STATUS = [
  { id: 1, name: "Under Review" },
  { id: 2, name: "Accepted" },
  { id: 3, name: "Picked" },
];
