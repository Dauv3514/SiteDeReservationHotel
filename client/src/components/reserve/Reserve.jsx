import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./reserve.css"
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Reserve = ({setOpen, hotelId}) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // const isAvailable = (roomnumber) => {
  //   const isFound = roomnumber.unavailableDates.some((date) =>
  //     alldates.includes(new Date(date).getTime())
  //   );

  //   return !isFound;
  // };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)}/>
            <span>Sélectionnez une chambre:</span>
            {data.map(item=>(
              <div className="rItem" key={item.id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.description}</div>
                  <div className="rMax">
                    Nombre maximales de personnes: <b>{item.maxpeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomnumbers.map((roomnumber) => (
                    <div className="room">
                      <label>{roomnumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomnumber.number}
                        onChange={handleSelect}
                        // disabled={!isAvailable(roomnumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
                Réserve maintenant !
            </button>
        </div>
    </div>
  )
}

export default Reserve