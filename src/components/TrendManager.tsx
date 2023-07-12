import { setGraphics, createGraphics, resetGraphics } from '../utils/graphics';
import { DailyTrend } from '../utils/types';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment-timezone';

import axios from 'axios';

import Slider from './Slider';
import Calender from './Calender';

const TrendManager = () => {
    const sliderRef = useRef<any>(null);
    const [isInit, setIsInit] = useState(false);

    const fetchData = async (selectedDate: Date) => {
        const { data } = await axios.get<DailyTrend[]>(
            'http://trends-server.eba-ry3jpd2p.us-west-1.elasticbeanstalk.com/',
            {
                params: { date: selectedDate },
            }
        );

        createGraphics(data);

        if (!isInit) {
            sliderRef.current.onInit();
            setIsInit(true);
        }
    };

    const handleSliderUpdate = (hour: number) => {
        setGraphics(hour);
    };

    const handleCalenderUpdate = async (date: string) => {
        resetGraphics();
        sliderRef.current.reset();
        await fetchData(new Date(moment(date).tz('America/Los_Angeles').format()));
    };

    useEffect(() => {
        fetchData(new Date(moment().tz('America/Los_Angeles').format()));
    }, []);

    return (
        <>
            <Calender onCalenderUpdate={handleCalenderUpdate} />
            <Slider ref={sliderRef} onSliderUpdate={handleSliderUpdate} />
        </>
    );
};

export default TrendManager;
