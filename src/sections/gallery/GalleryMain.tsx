import { useState } from 'react';
import gallery1 from '../../assets/images/gallery/gallery-page-1-1.jpg';
import gallery2 from '../../assets/images/gallery/gallery-page-1-2.jpg';
import gallery3 from '../../assets/images/gallery/gallery-page-1-3.jpg';
import gallery4 from '../../assets/images/gallery/gallery-page-1-4.jpg';
import gallery5 from '../../assets/images/gallery/gallery-page-1-5.jpg';
import gallery6 from '../../assets/images/gallery/gallery-page-1-6.jpg';
import gallery7 from '../../assets/images/gallery/gallery-page-1-7.jpg';
import gallery8 from '../../assets/images/gallery/gallery-page-1-8.jpg';
import gallery9 from '../../assets/images/gallery/gallery-page-1-9.jpg';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Gallery {
    id: number,
    image: string,
    alt: string
}
const GalleryMain:React.FC = () => {
    const galleryData: Gallery[] = [
        {
            id: 1,
            image: gallery1,
            alt: "Gallery Image 1"
        },
        {
            id: 2,
            image: gallery2,
            alt: "Gallery Image 2"
        },
        {
            id: 3,
            image: gallery3,
            alt: "Gallery Image 3"
        },
        {
            id: 4,
            image: gallery4,
            alt: "Gallery Image 4"
        },
        {
            id: 5,
            image: gallery5,
            alt: "Gallery Image 5"
        },
        {
            id: 6,
            image: gallery6,
            alt: "Gallery Image 6"
        },
        {
            id: 7,
            image: gallery7,
            alt: "Gallery Image 7"
        },
        {
            id: 8,
            image: gallery8,
            alt: "Gallery Image 8"
        },
        {
            id: 9,
            image: gallery9,
            alt: "Gallery Image 9"
        },
    ];

    const [open, setOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const images : string[] = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

    return (
        <section className="gallery-page">
            <div className="container">
                <div className="grid_container" style={{overflow:'hidden'}}>
                    {galleryData.map((item, i) => {
                        return (
                            <div key={i} className={`item item_${item?.id}`}>
                                <div className="gallery-page__single">
                                    <div className="gallery-page__img">
                                        <div className="gallery-page__img-box">
                                            <img src={item?.image} alt={item?.alt} />
                                        </div>
                                        <div className="gallery-page__icon" >
                                            <button type="button" className="img-popup" onClick={() => {
                                                setIndex(i);
                                                setOpen(true);
                                            }}>
                                                <span className="icon-plus"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map((src) => ({ src }))}
            />
        </section>
    );
};

export default GalleryMain;