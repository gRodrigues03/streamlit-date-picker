import React, {useEffect} from "react"
import { createRoot } from 'react-dom/client';
import {Streamlit, ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import DateRangePicker from "./RangePicker";
import DatePicker from "./DatePicker";

const DatePickerComponent = (props: ComponentProps) => {
    const id = props.args['id'];
    const label = props.args['label'];

    useEffect(() => {
        Streamlit.setFrameHeight();
    }, []);
    // const color = props.args.theme === 'dark' ? '#242830' : '#F3F4F5'
    const bgColor = props.args.theme === 'dark' ? '#242830' : '#F3F4F5'
    const textColor = props.args.theme === 'dark' ? '#FFF' : '#000'
    const borderColor = props.args.theme === 'dark' ? '#343840' : '#cdcece'
    return (
        <>
            {label && <p className="label" style={{ color: textColor }}>{label}</p>}
            {id === 'date_range_picker' && <DateRangePicker {...props} bgColor={bgColor} textColor={textColor} borderColor={borderColor} />}
            {id === 'date_picker' && <DatePicker {...props} bgColor={bgColor} textColor={textColor} borderColor={borderColor} />}
        </>
    );
};

const StreamlitDatePickerComponent = withStreamlitConnection(DatePickerComponent)

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
      <StreamlitDatePickerComponent/>
);