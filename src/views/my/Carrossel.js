import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import baner1 from "1.png";
import baner2 from "2.png";
import baner3 from "3.png";
import baner4 from "4.png";

export default class extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={72}
        naturalSlideHeight={30}
        totalSlides={4}
        isPlaying={true}
        interval={3000}>
        <Slider>
          <Slide index={0}>
          	<Image src={baner1} hasMasterSpinner={true} />
          </Slide>
          <Slide index={1}>
          	<Image src={baner2} hasMasterSpinner={true} />
          </Slide>
          <Slide index={2}>
          	<Image src={baner3} hasMasterSpinner={true} />
          </Slide>
          <Slide index={3}>
          	<Image src={baner4} hasMasterSpinner={true} />
          </Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}