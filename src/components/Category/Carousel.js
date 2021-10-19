import CategoryItem from "components/Category/Item";
import Slider from "react-slick";
import categories from "assets/data/defaultCategory.json";

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
      {categories &&
        categories.map((cat) => (
          <CategoryItem
            count={40}
            name={cat.category_name}
            percent="70"
            stroke={cat.color}
            key={cat.id}
          />
        ))}
    </Slider>
  );
};

export default CategoryCarousel;
