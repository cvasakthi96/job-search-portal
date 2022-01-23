import image1 from "../../../assets/img1.png";
import image2 from "../../../assets/img2.png";
import image3 from "../../../assets/img3.png";
import image4 from "../../../assets/img4.png";
import image5 from "../../../assets/img5.png";
import image6 from "../../../assets/img6.png";
import image7 from "../../../assets/img7.png";
import image8 from "../../../assets/img8.png";
import "./Footer.scss";
export default function Footer() {
  const clientList = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image6,
    image7,
    image8,
  ];
  return (
    <div className="footer-wrapper ">
      <h5 className="companies-text font-weight-bold">
        companies who trust us
      </h5>
      <div className="clients-wrapper">
        <div className="clients">
          {clientList.map((url, index) => {
            return <img className="client-img " key={index} src={url} alt="" />;
          })}
        </div>
      </div>
    </div>
  );
}
