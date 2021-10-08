import { Category } from "../types/Category";

export const categories: Category = {
  food: {
    title: "Alimentação",
    color: "blue",
    fontColor: "#FFFFFF",
    expense: true,
  },
  bill: { title: "Conta", color: "brown", fontColor: "#FFFFFF", expense: true },
  salary: {
    title: "Salário",
    color: "green",
    fontColor: "#FFFFFF",
    expense: false,
  },
};
