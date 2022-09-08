import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faCalendarDay,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { newSearch } from "../../context/actions";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";

function Header({ type }) {
  //Variable declare
  const [openDate, setOpenDate] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [destination, setDestination] = useState("");

  const { user } = useContext(AuthContext);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  //Handle Function
  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  //DISpatch
  const { dispatch } = useContext(SearchContext);

  const handelSearch = () => {
    dispatch(newSearch({ destination, date, option }));
    navigate("/hotels", { state: { destination, date, option } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {/* {HeaderList} */}
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxi</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's genius
            </h1>
            <p className="headerDesc">
              This summer, make your dream trip a reality. Book and stay for
              less before 30 Sep 2022
            </p>
            {!user && <button className="headerBtn">Sign in/ Register</button>}

            {/* {Header search } */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faBed} />
                <input
                  type="text"
                  placeholder="where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faCalendarDay} />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="date"
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faPerson} />
                <span
                  onClick={() => setOpenOption(!openOption)}
                  className="headerSearchText"
                >
                  {`${option.adult} audult · ${option.children} children · ${option.room} room`}
                </span>

                {/* {OPtion} */}
                {openOption && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={option.adult <= 1}
                          className="optionCounterBtn"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {option.adult}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("children", "d")}
                          disabled={option.children <= 0}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {option.children}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("room", "d")}
                          disabled={option.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {option.room}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <button onClick={handelSearch} className="headerBtn">
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
