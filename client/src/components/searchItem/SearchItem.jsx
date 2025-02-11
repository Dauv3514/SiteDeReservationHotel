import "./searchItem.css";
import { Link } from "react-router-dom";

export const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img src={item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}</span>
            <span className="siTaxiOp">Aéroportuaires taxi gratuit</span>
            <span className="siSubtitle">
            Appartemment avec air conditionné
            </span>
            <span className="siFeatures">{item.description}</span>
            <span className="siCancelOp">Annulation gratuite </span>
            <span className="siCancelOpSubtitle">
            Vous pouvez annuler plus tard, alors réservez dès maintenant à ce super prix !
            </span>
        </div>
        <div className="siDetails">
            {item.rating && <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="siDetailsTexts">
                <span className="siPrice">${item.cheapestprice}</span>
                <span className="siTaxOp">Taxes et redevances incluses</span>
                <Link to={`/hotels/${item.id}`}>
                    <button className="siCheckButton">Voir la disponibilité</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem;
