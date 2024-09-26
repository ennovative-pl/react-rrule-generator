import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'react-datetime';
import 'moment/min/locales';

import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';

const EndOnDate = ({
  id,
  onDate: {
    date,
    options,
  },
  handleChange,
  translations,
  dateTimeFormat,
  withPortal,
}) => {
  const CustomCalendar = options.calendarComponent;

  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'end.tooltip'),
    value: date,
    dateFormat: dateTimeFormat || DATE_TIME_FORMAT,
    readOnly: false,
    withPortal,
  };

  return (
    <div className="col-6 col-sm-3">
      {
        CustomCalendar
          ? <CustomCalendar
              key={`${id}-calendar`}
              {...calendarAttributes}
              onChange={(event) => {
                try {
                  const d = new Date(event);
                  const year = d.getFullYear();
                  const month = String(d.getMonth() + 1).padStart(2, '0');
                  const day = String(d.getDate()).padStart(2, '0');
                  const v = `${year}-${month}-${day}`;
                  const editedEvent = {
                    target: {
                      value: v,
                      name: 'end.onDate.date',
                    },
                  };
                  
                  handleChange(editedEvent);
                } catch (e) {
                  console.error(e);
                }
            }}
          />
          : <DateTime
              {...calendarAttributes}
              inputProps={
              {
                id: `${id}-datetime`,
                name: 'end.onDate.date',
                readOnly: true,
              }
            }
              locale={translateLabel(translations, 'locale')}
              readOnly
              timeFormat={false}
              viewMode="days"
              closeOnSelect
              closeOnTab
              required
              onChange={(inputDate) => {
              const editedEvent = {
                target: {
                  value: moment(inputDate).format(DATE_TIME_FORMAT),
                  name: 'end.onDate.date',
                },
              };

              handleChange(editedEvent);
            }}
          />
      }
    </div>
  );
};

EndOnDate.propTypes = {
  id: PropTypes.string.isRequired,
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
      calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  // eslint-disable-next-line react/require-default-props
  dateTimeFormat: PropTypes.string,
};

export default EndOnDate;
