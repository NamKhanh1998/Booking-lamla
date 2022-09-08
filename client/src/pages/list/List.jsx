import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "./list.scss";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination);
  const [date, setDate] = useState(location.state?.date);
  const [openDate, setOpenDate] = useState(false);
  const [option, setOption] = useState(location.state?.option);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  let url = `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`;
  const { data, loading, error, reFetch } = useFetch(url);

  //Hande function
  const handelClick = () => {
    reFetch();
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination ? destination : ""} />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionItem">
                <div className="lsOptionText">
                  Min Price <small>per night</small>
                </div>
                <input
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  className="lsOptionInput"
                />
              </div>

              <div className="lsOptionItem">
                <div className="lsOptionText">
                  Max Price <small>per night</small>
                </div>
                <input
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                  className="lsOptionInput"
                />
              </div>

              <div className="lsOptionItem">
                <div className="lsOptionText">Aldult</div>
                <input
                  min={1}
                  type="number"
                  className="lsOptionInput"
                  placeholder={option.adult}
                />
              </div>

              <div className="lsOptionItem">
                <div className="lsOptionText">Children</div>
                <input
                  min={0}
                  type="number"
                  className="lsOptionInput"
                  placeholder={option.children}
                />
              </div>

              <div className="lsOptionItem">
                <div className="lsOptionText">Room</div>
                <input
                  min={1}
                  type="number"
                  className="lsOptionInput"
                  placeholder={option.room}
                />
              </div>
            </div>
            <button onClick={handelClick}>Search</button>
          </div>
          <div className="listResult ">
            {loading
              ? "Loading"
              : data.map((item) => <SearchItem item={item} key={item._id} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
