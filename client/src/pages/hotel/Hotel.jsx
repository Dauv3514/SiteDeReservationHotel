import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCircleXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useContext,useState } from 'react';
import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

export const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const {data, loading} = useFetch(`/hotels/${id}`)
  
  const{dates, options} = useContext(SearchContext);
  console.log(dates, "voir");

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }
  const handleMove = (direction) => {
    let newSlideNumber;
    if(direction === "left"){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1
    }
    setSlideNumber(newSlideNumber);
  }

  return (
    <div>
      <Navbar />
      <Header type="list"/>
      {loading ? ("loading") : (
      <div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} className="close"/>
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleMove()} className="arrow"/>
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faArrowRight} onClick={() => handleMove()} className="arrow"/>
        </div> }
        <div className="hotelWrapper">
          <button className="bookNow">Réservez dès maintenant !</button>
          <h1 className="hotelTitle">
            Grand Hôtel
          </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellente location - {data.distance}m du centre
          </span>
          <span className="hotelPriceHighlight">
            Réservez un séjour de plus de ${data.cheapestprice} dans cette propriété et obtenez un taxi gratuit pour l'aéroport.
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) =>( 
              <div className="hotelImgWrapper">
                <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.description}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Parfait pour une {days} nuits</h1>
                <span>
                Situé en plein cœur de Cracovie, cet établissement bénéficie d'un excellent score de localisation de 9,8 !
                </span>
                <h2>
                  <b>${days * data.cheapestprice * options.chambre}</b> ({days} nuits)
                </h2>
                <button>Réservez dès maintenant !</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      )}
    </div>
  )
}

export default Hotel;