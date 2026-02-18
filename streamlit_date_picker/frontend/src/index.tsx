import React, { StrictMode } from "react"
import {
    FrontendRendererArgs,
} from "@streamlit/component-v2-lib";
import DatePicker from "./DatePicker";
import DateRangePicker from "./RangePicker";
import { createRoot, Root } from "react-dom/client";

// Handle the possibility of multiple instances of the component to keep track
// of the React roots for each component instance.
const reactRoots: WeakMap<FrontendRendererArgs["parentElement"], Root> =
  new WeakMap();

const MyComponentRoot = (args: { data: any; parentElement: any; setStateValue: any; }) => {
    const { data, parentElement, setStateValue } = args;

    // Get the react-root div from the parentElement that we defined in our
    // `st.components.v2.component` call in Python.
    // const rootElement = parentElement.querySelector(".react-root");
    //
    // if (!rootElement) {
    //     throw new Error("Unexpected: React root element not found");
    // }

    // Check to see if we already have a React root for this component instance.
    let reactRoot = reactRoots.get(parentElement);
    if (!reactRoot) {
        // If we don't, create a new root for the React application using the React
        // DOM API.
        // @see https://react.dev/reference/react-dom/client/createRoot
        reactRoot = createRoot(parentElement);
        reactRoots.set(parentElement, reactRoot);
    }



    const props = data
    const id = props['id'];
    const label = props['label'];
    const theme = window.themePref === 'dark'
    const bgColor = theme ? '#242830' : '#F3F4F5'
    const textColor = theme ? '#FFF' : '#000'
    const borderColor = theme ? '#343840' : '#cdcece'
    reactRoot.render(
      <StrictMode>
          {label && <p className="ccv2-label" style={{ color: textColor }}>{label}</p>}

          {id === "date_range_picker" && (
            <DateRangePicker setStateValue={setStateValue} bgColor={bgColor} textColor={textColor} borderColor={borderColor} {...props}/>
          )}
          {id === "date_picker" && (
            <DatePicker setStateValue={setStateValue} bgColor={bgColor} textColor={textColor} borderColor={borderColor} {...props}/>
          )}
      </StrictMode>,
    );

    // Return a function to cleanup the React application in the Streamlit
    // component lifecycle.
    return () => {
        const reactRoot = reactRoots.get(parentElement);

        if (reactRoot) {
            reactRoot.unmount();
            reactRoots.delete(parentElement);
        }
    };
};

export default MyComponentRoot;
