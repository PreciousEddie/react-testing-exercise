import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Carousel photos={ TEST_IMAGES } title="images for testing" />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel photos={ TEST_IMAGES } title="images for testing" />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={ TEST_IMAGES }
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={ TEST_IMAGES }
      title="images for testing"
    />
  );

  //expect the first image to show initailly
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();

  //move to the next image using the right arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  //expect the second image to be displayed
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to be displayed again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("checks if the left arrow is missing on the first image and the right arrow is missing on the last image", () => {
  const { container } = render(
    <Carousel photos={ TEST_IMAGES } title="images for testing" />
  );

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // expect left arrow to be missing on the first image
  expect(leftArrow).toBeNull();

  // click on the right arrow to move to the last image
  const totalImages = TEST_IMAGES.length;
  for (let i = 0; i < totalImages - 1; i++) {
    fireEvent.click(rightArrow);
  }

  // expect right arrow to be missing on the last image
  const updatedRightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(updatedRightArrow).toBeNull();
});
