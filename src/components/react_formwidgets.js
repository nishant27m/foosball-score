import React, { Component } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';
import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from "react-widgets-moment";
Moment.locale('en');
momentLocalizer();

export const renderInput = ({ input, label, type, placeholder, meta: {touched, error, invalid} }) => (
      <div className={`form-group ${touched && invalid ? 'has-danger' : ''}  `}>
          <input {...input} placeholder={placeholder} className="form-control"/>
          <div className="text-help">
            {touched ? error : ''}
          </div>
      </div>
    );


export const renderDropdownList = ({ input, data, valueField, textField, meta: {touched, error, invalid}  }) => (
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''} `}>
    <DropdownList {...input} data={data} valueField={valueField} textField={textField} onChange={input.onChange} />
    <div className="text-help">
      {touched ? error : ''}
    </div>
  </div>
);

export const renderMultiselect = ({ input, data, valueField, textField, meta: {touched, error, invalid} }) => (
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''} `}>
    <Multiselect {...input} onBlur={() => input.onBlur()} value={input.value || []}
      data={data} valueField={valueField} textField={textField} />
    <div className="text-help">
      {touched && error}
    </div>
  </div>
);

export const renderMultiselectDropdown = ({ input, dataSource, dataSourceConfig, meta: {touched, error, invalid} }) => (
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''} `}>
    <select {...input} className="form-control dropdown-primary" multiple>
        {dataSource.map(data => <option key={data[dataSourceConfig.label]}
           value={data[dataSourceConfig.label]}>{data[dataSourceConfig.text]}</option>)}
    </select>
    <div className="text-help">
      {touched && error}
    </div>
  </div>
);

export const renderSelectList = ({ input, data, meta: {touched, error, invalid} }) =>
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''} `}>
    <SelectList {...input} onBlur={() => input.onBlur()} data={data} />
    <div className="text-help">
      {touched && error}
    </div>
  </div>

export const renderDateTimePicker = ({ input: { onChange, value, showTime }, meta: {touched, error, invalid} }) =>
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''} `}>
    <DateTimePicker onChange={onChange} format="DD MMM YYYY"
    time={showTime} value={!value ? null : new Date(value)}/>
    <div className="text-help">
      {touched && error}
    </div>
  </div>
