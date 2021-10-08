import * as C from "./styles";
import { Item } from "../../types/Item";
import { formatDate } from "../../helpers/dateFilter";
import { categories } from "../../data/categories";

type Props = {
  item: Item;
};

export const TableItem = ({ item }: Props) => {
  return (
    <C.TableLine>
      <C.TableColumn>{formatDate(item.date)}</C.TableColumn>
      <C.TableColumn>
        <C.Category
          color={categories[item.category].color}
          fontColor={categories[item.category].fontColor}
        >
          {categories[item.category].title}
        </C.Category>
      </C.TableColumn>
      <C.TableColumn>{item.title}</C.TableColumn>
      <C.TableColumn>
        <C.Value color={categories[item.category].expense ? "red" : "green"}>
          R${" "}
          {item.value.toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </C.Value>
      </C.TableColumn>
    </C.TableLine>
  );
};
