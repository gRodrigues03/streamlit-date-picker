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
    return (
        <>
            {label && <p className="label">{label}</p>}
            {id === 'date_range_picker' && <DateRangePicker {...props} />}
            {id === 'date_picker' && <DatePicker {...props} />}
        </>
    );
};

//wrap component
// @ts-ignore
const StreamlitDatePickerComponent = withStreamlitConnection(DatePickerComponent)

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
      <StreamlitDatePickerComponent/>
);