import { ChangeEvent, useRef } from 'react';

interface Props {
    onCalenderUpdate: (date: string) => void;
}

const today = new Date().toLocaleDateString('en-CA');

const Calender = ({ onCalenderUpdate }: Props) => {
    const calenderRef = useRef<HTMLInputElement>(null);

    const handleCalenderUpdate = (e: ChangeEvent) => {
        e.preventDefault();
        onCalenderUpdate(calenderRef.current?.value!);
    };

    return (
        <div className="calender">
            <input
                ref={calenderRef}
                type="date"
                onChange={handleCalenderUpdate}
                defaultValue={today}
                max={today}
            ></input>
        </div>
    );
};

export default Calender;
