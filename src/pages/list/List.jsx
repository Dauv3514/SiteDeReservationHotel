import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

export const List = () => {

  const location = useLocation();
  console.log(location);
  const [destination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);

  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">
                Search
              </h1>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text"></input>
              </div>
              <div className="lsItem">
                <label>Date d'arrivée</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
                )} au ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && ( <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
                )}
                <input type="text"></input>
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Prix minimum <small>par nuit</small></span>
                    <input type="number" className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Prix maximum <small>par nuit</small></span>
                    <input type="number" className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adultes</span>
                    <input type="number" min={1} className="lsOptionInput" placeholder={options.adultes}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Enfants</span>
                    <input type="number" min={0} className="lsOptionInput" placeholder={options.enfants}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Chambres</span>
                    <input type="number" min={1} className="lsOptionInput" placeholder={options.chambre}/>
                  </div>
                </div>
              </div>
            <button>Search</button>
            </div>
            <div className="listResult">
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
            </div>
          </div>
        </div>
    </div>
  )
}

export default List;