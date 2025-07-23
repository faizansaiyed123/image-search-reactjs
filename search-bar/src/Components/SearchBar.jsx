import { useEffect, useState } from "react";

function SearchBar() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const accessKey = "Ass your Unsplash keyt here and then run ";

  let page = 1;

  const getData = async (searchData) => {
    if (searchData !== "") {
      const url = `https://api.unsplash.com/search/photos?query=${searchData}&page=${page}&client_id=${accessKey}`;
      const fetching = await fetch(url);
      const jsonData = await fetching.json();
      setData(jsonData.results);
    } else {
      setData([]);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData(input);
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="container">
      <h1>Unsplash Image Search</h1>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search beautiful images..."
          onKeyUp={handleInput}
        />
      </div>

      <div className="image-grid">
        {data.length > 0 &&
          data.map((img, i) => (
            <div className="image-card" key={i}>
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash image"}
              />
              <p className="photographer">📸 {img.user.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;