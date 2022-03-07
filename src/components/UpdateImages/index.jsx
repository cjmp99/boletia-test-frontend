import React, { useContext, useState } from "react";
import { Carousel, Button, Form } from "react-bootstrap";
import BoletiaContext from "../../context/context";
import useOnChangeValue from "../../hooks/useOnChangeValue";

const UpdateImages = () => {
    const [options, setOptions] = useState({
        bannerDesktop: null,
        bannerTablet: null,
        bannerMobile: null,
    });
    const {
        event,
        replaceImageDesktop,
        replaceImageTablet,
        replaceImageMobile,
        showModal
    } = useContext(BoletiaContext);
    const { setData } = useOnChangeValue();

    const updateImageDesktop = () => {
        replaceImageDesktop(options.bannerDesktop, event._id);
        showModal(true, setData);
    };

    const updateImageTablet = () => {
        replaceImageTablet(options.bannerTablet, event._id);
        showModal(true, setData);
    };

    const updateImageMobile = () => {
        replaceImageMobile(options.bannerMobile, event._id);
        showModal(true, setData);
    };


    return (
        <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_BACKEND_URI_IMAGES}/${event?.bannerDesktop}`}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>Desktop</h3>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image Desktop</Form.Label>
                <Form.Control
                onChange={(e) =>
                    setOptions({ ...options, bannerDesktop: e.target.files[0] })
                }
                type="file"
                />
            </Form.Group>
            {options.bannerDesktop && (
                <Button onClick={updateImageDesktop}>Replace image</Button>
            )}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_BACKEND_URI_IMAGES}/${event?.bannerTablet}`}
            alt="Second slide"
            />

            <Carousel.Caption>
            <h3>Tablet</h3>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image Tablet</Form.Label>
                <Form.Control
                onChange={(e) =>
                    setOptions({ ...options, bannerTablet: e.target.files[0] })
                }
                type="file"
                />
            </Form.Group>
            {options.bannerTablet && <Button onClick={updateImageTablet}>Replace image</Button>}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_BACKEND_URI_IMAGES}/${event?.bannerMobile}`}
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Mobile</h3>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image Mobile</Form.Label>
                <Form.Control
                onChange={(e) =>
                    setOptions({ ...options, bannerMobile: e.target.files[0] })
                }
                type="file"
                />
            </Form.Group>
            {options.bannerMobile && <Button onClick={updateImageMobile}>Replace image</Button>}
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
};

export default UpdateImages;
