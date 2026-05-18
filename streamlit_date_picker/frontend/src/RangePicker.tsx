import React, { ComponentProps, useMemo, useState, useCallback } from "react"
import { DatePicker, ConfigProvider } from 'antd';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/localeData';
import { FormatString, getFormatString } from "./utils";

import locale from 'antd/locale/pt_BR';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/Sao_Paulo');

const { RangePicker } = DatePicker;

function DateRangePicker(props: ComponentProps<any>) {
    const [start, setStart] = useState<dayjs.Dayjs>(dayjs(props["start"] * 1000));
    const [end, setEnd] = useState<dayjs.Dayjs>(dayjs(props["end"] * 1000));

    const pickerType = useMemo(() => (
        props["picker_type"]
    ), [props["picker_type"]]);

    const formatString = useMemo(() => (
        getFormatString(props["picker_type"]) || FormatString.date
    ), [props["picker_type"]]);

    const availableDates = useMemo(() => (
        props["available_dates"]
            ? props["available_dates"].map((d: number) => dayjs(d * 1000))
            : []
    ), [props["available_dates"]]);

    const onChange = useCallback((date: any, dateString: any) => {
        setStart(date[0]);
        setEnd(date[1]);
        props.setStateValue('fuck', dateString);
    }, []);

    const disabledDate = useCallback((current: dayjs.Dayjs) => {
        if (availableDates.length === 0) {
            return false;
        }
        return !availableDates.some((date: dayjs.Dayjs) => date.isSame(current, 'day'))
    }, [availableDates]);

    return (
            <ConfigProvider locale={locale}
                            theme={{
                                token: {
                                    colorTextBase: props.textColor,
                                    colorBgBase: props.bgColor,
                                    colorBorder: props.borderColor
                                }
                            }}>
                {pickerType === "time" ? (
                    <RangePicker
                        allowClear={false}
                        showTime
                        format={formatString}
                        onChange={onChange}
                        inputReadOnly={window.clientInfo.isMobile}
                        placement="bottomLeft"
                        value={[start, end]}
                        disabledDate={disabledDate}
                    />
                ) : (
                    <RangePicker
                        allowClear={false}
                        picker={pickerType}
                        format={formatString}
                        inputReadOnly={window.clientInfo.isMobile}
                        onChange={onChange}
                        placement="bottomLeft"
                        value={[start, end]}
                        disabledDate={disabledDate}
                    />
                )}
            </ConfigProvider>
    );
}

export default DateRangePicker;