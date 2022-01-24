import "./Footer.scss";
export default function Footer() {
  const clientList = [
    "img1.png",
    "img2.png",
    "img3.png",
    "img4.png",
    "img5.png",
    "img6.png",
    "img7.png",
    "img3.png",
    "img2.png",
    "img8.png",
  ];
  return (
    <div className="footer-wrapper ">
      <h5 className="companies-text font-weight-bold">
        companies who trust us
      </h5>
      <div className="clients-wrapper">
        <div className="clients">
          {clientList.map((url, index) => {
            console.log(`assets/${url}`);
            return (
              <img
                className="client-img "
                key={index}
                src={`assets/images/${url}`}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
