
import { Carousel, Image } from 'react-bootstrap'

function CarouselComponent() {
  return (
    <Carousel className="carousel">
    <Carousel.Item>
      <Image className="d-block w-100" src="https://vida.bg/wp-content/uploads/2021/10/VIDA_Banner_BG.jpg" alt="Home Page" />
    </Carousel.Item>
    <Carousel.Item>
      <Image className="d-block w-100" src="https://vida.bg/wp-content/uploads/2021/10/Spirits_Banner-BG.jpg" alt="Home Page" />
    </Carousel.Item>
    <Carousel.Item>
      <Image className="d-block w-100" src="http://vida.bg/wp-content/uploads/2022/10/Jim-Beam-EN.jpg" alt="Home Page" />
    </Carousel.Item>
    <Carousel.Item>
      <Image className="d-block w-100" src="https://vida.bg/wp-content/uploads/2021/09/kraken-category-header.png" alt="Home Page" />
    </Carousel.Item>

  </Carousel>
  )
}

export default CarouselComponent;
