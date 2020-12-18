import CategoryItem from "components/Category/Item";
import Slider from "react-slick";

const CategoryCarousel = () => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <CategoryItem count={20} name="business" percent="40" stroke="#eb06ff" />
      <CategoryItem count={40} name="personal" percent="70" stroke="#066aff" />
    </Slider>
  );
};

export default CategoryCarousel;
