import React, {useEffect} from "react"
import { createRoot } from 'react-dom/client';
import {Streamlit, ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import {DateRangePicker} from "./RangePicker";
import DatePicker from "./DatePicker";

const DatePickerComponent = (props: ComponentProps) => {
    const id = props.args['id'];
    const label = props.args['label'];
    useEffect(() => {
        Streamlit.setFrameHeight();
    }, []);
    switch (id) {
        case 'date_range_picker':
            return (<>
                {label && <p className={'label'}>{label}</p>}
                <DateRangePicker {...props}/>
                </>
            );
        case 'date_picker':
            return (<>
                {label && <p className={'label'}>{label}</p>}
                <DatePicker {...props}/>
                </>
            );
    }
};

//wrap component
// @ts-ignore
const StreamlitDatePickerComponent = withStreamlitConnection(DatePickerComponent)

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
      <StreamlitDatePickerComponent/>
  </React.StrictMode>
);