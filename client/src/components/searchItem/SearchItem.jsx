import "./searchItem.css";

export const SearchItem = () => {
  return (
    <div className="searchItem">
        <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className="siImg" />
        <div className="siDesc">
            <h1 className="siTitle">Appartemment en Ville</h1>
            <span className="siDistance">500m du centre</span>
            <span className="siTaxiOp">Aéroportuaires taxi gratuit</span>
            <span className="siSubtitle">
            Appartemment avec air conditionné
            </span>
            <span className="siFeatures">Studio entier • 1 salle de bain • 21 m² • 1 lit double</span>
            <span className="siCancelOp">Annulation gratuite </span>
            <span className="siCancelOpSubtitle">
            Vous pouvez annuler plus tard, alors réservez dès maintenant à ce super prix !
            </span>
        </div>
        <div className="siDetails">
            <div className="siRating">
                <span>Excellent</span>
                <button>8.9</button>
            </div>
            <div className="siDetailsTexts">
                <span className="siPrice">123$</span>
                <span className="siTaxOp">Taxes et redevances incluses</span>
                <button className="siCheckButton">Voir la disponibilité</button>
            </div>
        </div>
    </div>
  )
}

export default SearchItem;
