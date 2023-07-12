import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

import moment from 'moment';

interface Props {
    onSliderUpdate: (hour: number) => void;
}

const currentHour = new Date().getHours();

const Slider = forwardRef(({ onSliderUpdate }: Props, ref) => {
    const [labelPosition, setLabelPosition] = useState(0);
    const [sliderString, setSliderString] = useState('');
    const sliderRef = useRef<HTMLInputElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        reset() {
            sliderRef.current!.value = '0';
            handleSliderChange();
        },

        onInit() {
            for (let i = 0; i <= currentHour; i++) {
                sliderRef.current!.value = i.toString();
                handleSliderChange();
            }
        },
    }));

    const handleSliderChange = () => {
        const sliderValue = Number(sliderRef.current!.value);
        const parentWidth = parentRef.current!.clientWidth - 10;

        setLabelPosition(sliderValue * (parentWidth / 23));

        const militaryTime = `${sliderValue.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
        })}:00`;

        const standardTime = moment(militaryTime, 'HH:mm').format('hh:mm A');
        setSliderString(standardTime);

        onSliderUpdate(sliderValue);
    };

    window.addEventListener('resize', () => handleSliderChange());

    return (
        <div className="slider" ref={parentRef}>
            <span className="slider-label" style={{ left: labelPosition - 25 }}>
                {sliderString}
            </span>
            <input
                ref={sliderRef}
                onChange={handleSliderChange}
                type="range"
                min="0"
                max="23"
                className="slider-bar"
            />
        </div>
    );
});

export default Slider;
