import React, { useMemo, useState, useCallback, useRef } from "react"
import { DatePicker as DATE_PICKER, ConfigProvider } from 'antd';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import MaskedInput from "react-text-mask";

import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/localeData';
import { FormatString, getFormatString, getMaskByFormat } from "./utils";

import locale from 'antd/locale/pt_BR';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/Sao_Paulo');

function DatePicker(props: any) {
    const [value, setValue] = useState<dayjs.Dayjs>(dayjs(props.args["value"] * 1000));
    const inputRef = useRef<any>(null);

    const pickerType = useMemo(() => (
        props.args["picker_type"]
    ), [props.args["picker_type"]]);

    const formatString = useMemo(() => (
        getFormatString(props.args["picker_type"]) || FormatString.date
    ), [props.args["picker_type"]]);

    const availableDates = useMemo(() => (
        props.args["available_dates"]
            ? props.args["available_dates"].map((d: number) => dayjs(d * 1000))
            : []
    ), [props.args["available_dates"]]);

    const onChange = useCallback((date: any, dateString: any) => {
        setValue(date);
        props.setStateValue("fuck", dateString);
    }, []);
    const disabledDate = useCallback((current: dayjs.Dayjs) => {
        if (availableDates.length === 0) {
            return false;
        }
        return !availableDates.some((date: dayjs.Dayjs) => date.isSame(current, 'day'))
    }, [availableDates]);
    const InputComponent = React.forwardRef((propsInput, ref) => {
        return (
            <MaskedInput
                {...propsInput}
                mask={getMaskByFormat(formatString)}
                placeholder={formatString}
                render={(textMaskRef, props) => (
                    <input
                        {...props}
                        ref={(node) => {
                            if (node) {
                                textMaskRef(node);

                                // Save actual input to external ref
                                inputRef.current = node;

                                // Forward ref
                                if (typeof ref === 'function') {
                                    ref(node);
                                } else if (ref && 'current' in ref) {
                                    ref.current = node;
                                }
                            }
                        }}
                    />
                )}
            />
        );
    });
    return (
        <div>
            <ConfigProvider locale={locale}
            theme={{
            token: {
                colorTextBase: props.textColor,
                borderRadius: 8,
                colorBgBase: props.bgColor,
                colorBorder: props.borderColor
            }
        }}>
            {pickerType === "time" ? (
                <DATE_PICKER
                    allowClear={false}
                    showTime
                    format={formatString}
                    picker={pickerType}
                    onChange={onChange}
                    placement="bottomLeft"
                    value={value}
                    disabledDate={disabledDate}
                    components={{
                        input: InputComponent,
                    }}
                />
            ) : (
                <DATE_PICKER
                    multiple={props.args.multi}
                    width={280}
                    height={37.5}
                    allowClear={props.args.multi}
                    inputReadOnly={window.isMobile}
                    format={formatString}
                    picker={pickerType}
                    onChange={onChange}
                    placement="bottomLeft"
                    value={value}
                    disabledDate={disabledDate}
                    components={{
                        input: InputComponent,
                    }}
                />
            )}
            </ConfigProvider>
        </div>
    );
}

export default DatePicker;