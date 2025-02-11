import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson, faPlane, faCar, faTaxi} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {format} from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

export const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
      adultes:1,
      enfants: 0,
      chambre:1
 });

 const handleOption = (name, operation) => {
    setOptions(prev=>{ return {
        ...prev, [name] : operation === "i" ? options[name] + 1 : options[name] - 1
    }})
 }

 const navigate = useNavigate();
 const { user } = useContext(AuthContext);

 const{dispatch} = useContext(SearchContext)

 const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload: { destination, dates, options}})
    navigate("hotels", {state: {destination, dates, options}});
 }

  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
            <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Séjours</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Vols</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Locations de voitures</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Attractions</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Taxis aéroportuaires</span>
            </div>
            </div>
            { type !== "list" &&
            <>
            <h1 className="headerTitle">Une vie entière de réductions ? C'est génial.</h1>
            <p className="headerDesc">
                Soyez récompensé pour vos voyages – débloquez des économies instantanées de 10 % ou plus avec un compte Réservation-Hotel gratuit.
            </p>
            {!user && <button className="headerBtn">Se connecter / Inscription</button>}
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                    <input 
                        type="text" 
                        placeholder="Où allez-vous ?" 
                        className="headerSearchInput"
                        onChange={e=>setDestination(e.target.value)}
                    />
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                    <span onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} au ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                    {(openDate && <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date"
                        minDate={new Date()}
                    />)}
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                    <span onClick={()=>setOpenOptions(!openOptions)}className="headerSearchText">{`${options.adultes} adultes - ${options.enfants} enfants ${options.chambre} chambre`}</span>
                    {openOptions && <div className="options">
                    <div className="optionItem">
                            <span className="optionText">Adultes</span>
                            <div className="optionCounter">
                                <button 
                                    disabled={options.adultes <=1}
                                    className="optionCounterButton" 
                                    onClick={()=> handleOption("adultes", "d")}>
                                    -
                                </button>
                                <span className="optionCounterNumber">{options.adultes}</span>
                                <button className="optionCounterButton" onClick={()=> handleOption("adultes", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Enfants</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.adultes <=0} 
                                    className="optionCounterButton" 
                                    onClick={()=> handleOption("enfants", "d")}>
                                    -
                                </button>
                                <span className="optionCounterNumber">{options.enfants}</span>
                                <button className="optionCounterButton" onClick={()=> handleOption("enfants", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Chambre</span>
                            <div className="optionCounter">
                                <button 
                                    disabled={options.adultes <=1}
                                    className="optionCounterButton" 
                                    onClick={()=> handleOption("chambre", "d")}>
                                    -
                                </button>
                                <span className="optionCounterNumber">{options.chambre}</span>
                                <button className="optionCounterButton" onClick={()=> handleOption("chambre", "i")}>+</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="headerSearchItem">
                    <button className="headerBtn" onClick={handleSearch}>Rechercher</button>
                </div>
            </div></>}
        </div>
    </div>
  )
}

export default Header;
