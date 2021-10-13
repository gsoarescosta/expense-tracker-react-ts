import { useState, useEffect, FormEvent } from "react";
import * as C from "./App.styles";
import { Item } from "./types/Item";
// import { Category } from "./types/Category";
import { items } from "./data/items";
import { categories } from "./data/categories";
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";
import { InputArea } from "./components/InputArea";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";
import { PhotoItem } from "./components/PhotoItem";

const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }
    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  };

  /* Photos area */
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos();
    console.log(photos.length);
    if (photos.length > 0) {
      console.log(photos[0].name);
      console.log(photos[0].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await Photos.getAll());
    setLoading(false);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  };

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    getPhotos();
  };

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        {loading && (
          <C.ScreenWarning>
            <div className="emoji">⌛</div>
            <div>Carregando ...</div>
          </C.ScreenWarning>
        )}

        {!loading && (
          <>
            <InfoArea
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
              income={income}
              expense={expense}
            />
            <InputArea onAdd={handleAddItem} />
            <TableArea list={filteredList} />
            <C.PhotoHeaderText>Fotos (contas/recibos)</C.PhotoHeaderText>
            <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
              <input type="file" name="image" />
              <input type="submit" value="Enviar" />
              {uploading && "Enviando..."}
            </C.UploadForm>
          </>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((item, index) => {
              return (
                <PhotoItem
                  key={index}
                  url={item.url}
                  name={item.name}
                  onDelete={handleDeleteClick}
                />
              );
            })}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">🤡</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        )}
      </C.Body>
    </C.Container>
  );
};

export default App;
