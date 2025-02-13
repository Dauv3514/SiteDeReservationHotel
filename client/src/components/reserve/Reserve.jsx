import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./reserve.css"

export const Reserve = ({setOpen, hotelId}) => {
  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)}/>
            <span>Selectionnez vos chambres:</span>
        </div>
    </div>
  )
}

export default Reserve