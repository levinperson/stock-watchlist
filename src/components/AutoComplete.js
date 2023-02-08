import { useContext } from "react";
import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";
import tradingIcon from "../images/icon.png";
import tradingWords from "../images/words.png";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "260px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          const includeDot = result.symbol.includes(".");
          const includeComma = result.symbol.includes(":");
          if (includeDot === false && includeComma === false) {
            return (
              <li
                onClick={() => {
                  addStock(result.symbol);
                  setSearch("");
                }}
                key={result.symbol}
                className="dropdown-item"
              >
                {result.description} ({result.symbol})
              </li>
            );
          }
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="mt-4 w-50 p-5 rounded mx-auto">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
          alignItems: "center",
        }}
      >
        <img
          src={tradingIcon}
          alt="images"
          style={{ height: "75px", marginRight: "10px" }}
        />
        <img src={tradingWords} alt="words" style={{ height: "65px" }} />
      </div>

      <div className="form-floating dropdown">
        <input
          type="text"
          style={{ backgroundColor: "rgb(145, 158, 171, 0.04)" }}
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search Stock Symbol</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
