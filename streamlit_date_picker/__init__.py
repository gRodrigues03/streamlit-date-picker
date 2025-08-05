from datetime import datetime, timedelta
from typing import Literal

import streamlit.components.v1 as components
import streamlit as st
import os

_picker_type = Literal['time', 'date', 'week', 'month', 'quarter', 'year']
_picker_strftime = {
    'time': '%H:%M',
    'date': '%d/%m/%Y',
    'week': None,
    'month': '%m/%Y',
    'quarter': None,
    'year': '%Y'
}

_RELEASE = False

if not _RELEASE:
    component_func = components.declare_component(
        "date_picker",
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    component_func = components.declare_component("dater_picker", path=build_dir)


def convert_timedelta_to_total_seconds(delta: timedelta):
    return delta.total_seconds()


def date_range_picker(picker_type='time', start: datetime = datetime.now(), end: datetime = datetime.now(),
                      available_dates=None, key=None, label=None, theme=None):
    if theme is None:
        theme = 'dark'
    if available_dates is not None:
        available_dates = [available_date.timestamp() for available_date in available_dates]
    return component_func(id='date_range_picker', key=key, picker_type=picker_type,
                          start=str(start.timestamp()), end=str(end.timestamp()),
                          available_dates=available_dates,
                          label=label, theme=theme)


def date_picker(picker_type: _picker_type = 'date', value: datetime = datetime.now(), available_dates=None, key=None, label=None, theme=None):
    if theme is None:
        theme = 'dark'
    if available_dates is not None:
        available_dates = [available_date.timestamp() for available_date in available_dates]
    st.write(picker_type)
    return component_func(id='date_picker', key=key, picker_type=picker_type, value=str(value.timestamp()),
                          available_dates=available_dates, label=label, theme=theme, default=value.strftime(_picker_strftime[picker_type]))
