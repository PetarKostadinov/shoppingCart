
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
    <Carousel.Item>
      <Image className="d-block w-100" src="https://cdn-ccnlk.nitrocdn.com/FagQESmbWOQjOsPKkgdiNUYIEZTBiuRg/assets/images/optimized/rev-56322ca/wp-content/uploads/2022/10/Beluga-Category-Banner-1920x314-V1-1920x314.jpg" alt="Home Page" />
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselComponent;
