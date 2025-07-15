import {
  Streamlit,
} from "streamlit-component-lib"
import React, {ComponentProps, useMemo, useState, useCallback } from "react"
import { DatePicker as DATE_PICKER, ConfigProvider } from 'antd';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/localeData';
import {FormatString, getFormatString, getPickerType, PickerType} from "./utils";


import locale from 'antd/locale/pt_BR';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/Sao_Paulo');

function useCssVar(varName: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim();
}

function DatePicker(props: ComponentProps<any>) {
    const [value, setValue] = useState<dayjs.Dayjs>(dayjs(props.args["value"] * 1000));

    const pickerType = useMemo(() => (
        getPickerType(props.args["picker_type"]) || PickerType.date
    ), [props.args["picker_type"]]);

    const formatString = useMemo(() => (
        getFormatString(props.args["picker_type"]) || FormatString.date
    ), [props.args["picker_type"]]);

    const availableDates = useMemo(() => (
        props.args["available_dates"]
            ? props.args["available_dates"].map((d: number) => dayjs(d * 1000))
            : []
    ), [props.args["available_dates"]]);


    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const checkOpen = useCallback(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const picker = document.querySelector('.ant-picker');
            const dropdown = document.querySelector('.ant-picker-dropdown');

            if (
                !picker?.classList.contains('ant-picker-focused') ||
                dropdown?.classList.contains('ant-slide-up-leave')
            ) {
                Streamlit.setFrameHeight();
                console.log('nada');
            } else {
                Streamlit.setFrameHeight(420);
                console.log(420);
            }
        }, 20);
    }, []);

    const onChange = useCallback((date: any, dateString: any) => {
        setValue(date);
        Streamlit.setComponentValue(dateString);
        checkOpen();
    }, [checkOpen]);

    const onOpenChange = useCallback(() => {
        checkOpen();
    }, [checkOpen]);

    const disabledDate = useCallback((current: dayjs.Dayjs) => {
        if (availableDates.length === 0) {
            return false;
        }
        return !availableDates.some((date: dayjs.Dayjs) => date.isSame(current, 'day'))
    }, [availableDates]);

    return (
        <div>
            <ConfigProvider locale={locale}
            theme={{
            token: {
                colorPrimary: useCssVar('--primary-color'),
                colorTextBase: useCssVar('--text-color'),
                borderRadius: 8,

                colorBgBase: useCssVar('--secondary-background-color'),
            },
        }}>
            {pickerType === "time" ? (
                <DATE_PICKER
                    showTime
                    format={formatString}
                    onChange={onChange}
                    placement="bottomLeft"
                    onOpenChange={onOpenChange}
                    value={value}
                    disabledDate={disabledDate}
                />
            ) : (
                <DATE_PICKER
                    picker={pickerType}
                    format={formatString}
                    onChange={onChange}
                    placement="bottomLeft"
                    onOpenChange={onOpenChange}
                    value={value}
                    disabledDate={disabledDate}
                />
            )}
            </ConfigProvider>
        </div>
    );
}

export default DatePicker;