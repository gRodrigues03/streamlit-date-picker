import React, { useEffect, Suspense } from "react"
import { createRoot } from 'react-dom/client';
import {Streamlit, ComponentProps, withStreamlitConnection} from "streamlit-component-lib";


const LazyDatePicker = React.lazy(() => import("./DatePicker"));
const LazyDateRangePicker = React.lazy(() => import("./RangePicker"));

const DatePickerComponent = (props: ComponentProps) => {
    const id = props.args['id'];
    const label = props.args['label'];

    useEffect(() => {
        Streamlit.setFrameHeight();
    }, []);
    const bgColor = props.args.theme === 'dark' ? '#242830' : '#F3F4F5'
    const textColor = props.args.theme === 'dark' ? '#FFF' : '#000'
    const borderColor = props.args.theme === 'dark' ? '#343840' : '#cdcece'
    return (
        <>
            {label && <p className="label" style={{ color: textColor }}>{label}</p>}

            <Suspense fallback={<div style={{ height: 64 }}>Carregando...</div>}>
                {id === "date_range_picker" && (
                    <LazyDateRangePicker {...props} bgColor={bgColor} textColor={textColor} borderColor={borderColor} />
                )}
                {id === "date_picker" && (
                    <LazyDatePicker {...props} bgColor={bgColor} textColor={textColor} borderColor={borderColor} />
                )}
            </Suspense>
        </>
    );
};

const StreamlitDatePickerComponent = withStreamlitConnection(DatePickerComponent)

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
      <StreamlitDatePickerComponent/>
);