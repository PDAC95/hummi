import React from 'react';
import AccordionItem from './AccordionItem';
import type { FAQ } from '../../sections/about/SectionThree'; 


// Define the component props
interface AccordionProps {
    data?: FAQ[];
    setActive: (index: number | null) => void;
    active?: number | null;
}

const Accordion: React.FC<AccordionProps> = ({
    data = [],
    setActive,
    active = 2
}) => {
    const handleToggle = (index: number): void => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    };

    return (
        <div className="">
            {data.map((faq, index) => (
                <AccordionItem
                    key={faq.id || index}
                    handleToggle={handleToggle}
                    faq={faq}
                    active={active}
                // index={index}
                />
            ))}
        </div>
    );
};

export default Accordion;