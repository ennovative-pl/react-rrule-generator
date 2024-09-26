import moment from 'moment';
import formatDate from './formatDate';

const computeEnd = ({ mode, after, onDate: { date } }) => {
  const end = {};

  if (mode === 'After') {
    end.count = after;
  }

  if (mode === 'On date') {
    end.until = formatDate(moment.utc(date));
  }

  return end;
};

export default computeEnd;
