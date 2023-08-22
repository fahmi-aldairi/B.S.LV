import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../Style/Testimonial.css";

const sliderImageUrl = [
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419521579593819/Component_1.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419522011611136/Component_2.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419522359726160/Component_3.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419522754003125/Component_4.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419523160838154/Component_10.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419523622223923/Component_11.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124419524020678678/Component_12.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603168823005294/1124420329733890068/Component_5.png",
  },
];

function Testimonial() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <>
      <div className="AA">
        <div className="parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            arrows={false}
            dotListClass="custom-dot-list-style"
            transitionDuration={5000}
          >
            {sliderImageUrl.map((imageUrl, index) => {
              return (
                <div className="slider" key={index}>
                  <img
                    src={imageUrl.url}
                    alt="movie"
                    className="ms-0 testmonimage"
                    style={{ minWidth: "80px" }}
                  />
                </div>
              );
            })}
          </Carousel>
          <br />
        </div>
      </div>
    </>
  );
}

export default Testimonial;
