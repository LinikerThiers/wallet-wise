import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const getLast5Months = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 4; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const month = date.toLocaleString('pt-BR', { month: 'long' }); // e.g., "Janeiro"
        months.push({ month, year: date.getFullYear(), mesAno: date.getFullYear() * 100 + (date.getMonth() + 1) });
    }

    return months;
};

const SliderMeses = ({ onSelectMonth }) => {
    const [months, setMonths] = useState([]);

    useEffect(() => {
        setMonths(getLast5Months());
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        afterChange: (current) => onSelectMonth(months[current].mesAno),
    };

    return (
        <div className="w-full mb-8">
            <Slider {...settings}>
                {months.map(({ month }, index) => (
                    <div key={index} className="flex items-center justify-center">
                        <h3 className="text-l lg:text-2xl text-purple-800 font-semibold text-center">{month}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Define prop types for the component
SliderMeses.propTypes = {
    onSelectMonth: PropTypes.func.isRequired, // onSelectMonth should be a function and is required
};

export default SliderMeses;
