import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';

const ChartType = ({ data }) => {
  const options = {
    series: {
      0: { color: '#6b21a8' }, 
      1: { color: '#a855f7' } 
    },
    vAxis: {
      format: 'currency',
      minValue: 0,
    },
  };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
};

ChartType.propTypes = {
  data: PropTypes.array.isRequired, 
};

export default ChartType;

