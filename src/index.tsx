import React, {StrictMode} from "react"; // 1. Mantido o 'React' para salvar o escopo do runtime
import {createRoot} from "react-dom/client";
import "@gpc/gpc-window-types";

const reactRoots = new WeakMap();
const modules = {
  date_picker: () => import("./DatePicker"),
  date_range_picker: () => import("./RangePicker"),
} as const;

const MyComponentRoot = (args: { data: any; parentElement: any; setStateValue: any; }) => {
  const {data, parentElement, setStateValue} = args;

  let reactRoot = reactRoots.get(parentElement);
  if (!reactRoot) {
    reactRoot = createRoot(parentElement);
    reactRoots.set(parentElement, reactRoot);
  }

  const props = data;
  // 2. Mapeamento explícito de tipo. Isso diz ao linter: "id vai ser usado para indexar modules"
  const id: 'date_picker' | 'date_range_picker' = props['id'];
  const label = props['label'];
  const theme = window.clientInfo.themePref === 'dark';
  const bgColor = theme ? '#242830' : '#F3F4F5';
  const textColor = theme ? '#FFF' : '#000';
  const borderColor = theme ? '#343840' : '#cdcece';


  (async () => {
    const {default: Component} = await modules[id]();

    reactRoot.render(
      <StrictMode>
        {label && (
          <p className="ccv2-label" style={{color: textColor}}>
            {label}
          </p>
        )}

        <Component
          setStateValue={setStateValue}
          bgColor={bgColor}
          textColor={textColor}
          borderColor={borderColor}
          {...props}
        />
      </StrictMode>
    );
  })();

  return () => {
    const reactRoot = reactRoots.get(parentElement);
    if (reactRoot) {
      reactRoot.unmount();
      reactRoots.delete(parentElement);
    }
  };
};

export default MyComponentRoot;
