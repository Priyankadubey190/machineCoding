import { Carousel } from "./component/carousel";
import { sliderData } from "./data/sliderData";
function App() {
  return (
    <Carousel
      items={sliderData}
      autoPlay={true}
      autoPlayInterval={3000}
      showDots={true}
      showArrows={true}
    />
  );
}

export default App;
