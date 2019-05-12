import { useEffect, useRef } from 'react';
import {
  arrayOf, shape, string, oneOfType, number, bool,
} from 'prop-types';
import styled from 'styled-components';
import Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';
import { FiAlertTriangle } from 'react-icons/fi';

if (typeof window !== 'undefined') {
  Chart.defaults.global.plugins.colorschemes.scheme = 'tableau.Tableau20';
}


const getUnit = (num) => {
  if (typeof num === 'number') {
    return `${num}px`;
  }
  return num;
};

const PieChart = ({
  data,
  labelKey,
  valueKey,
  height,
  width,
  loading,
}) => {
  const instance = useRef({});

  // useEffect(() => {
  //   instance.current.ref = undefined;
  //   instance.current.chart = undefined;
  // }, [loading]);

  const getChartData = () => ({
    labels: data.map(d => d[labelKey]),
    datasets: [{
      label: 'Default',
      data: data.map(d => d[valueKey]),
    }],
  });

  const onRef = (ref) => {
    if (ref) {
      const config = {
        type: 'doughnut',
        data: getChartData(),
        responsive: true,
        maintainAspectRatio: false,
        options: {
          outerRadius: 200,
          cutoutPercentage: 50,
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 8,
              usePointStyle: true,
            },
          },
        },
      };
      instance.current.ref = ref;
      instance.current.chart = new Chart(ref, config);
      // setTimeout(() => {
      //   instance.current.chart.resize();
      // }, 1000);
    }
  };

  useEffect(() => {
    if (instance.current.chart && instance.current.ref && !loading) {
      instance.current.chart.data = getChartData();
      instance.current.chart.update();
    }
  }, [data, labelKey, valueKey]);

  if (loading || !data || !data.length) {
    return (
      <CenterTextContainer
        width={width}
        height={height}
      >
        {loading && <><FiAlertTriangle />&nbsp;&nbsp;Loading ...</>}
        {!loading && (!data || !data.length) && (
          <><FiAlertTriangle />&nbsp;&nbsp;No Data Available</>
        )}
      </CenterTextContainer>
    );
  }

  return (
    <Container
      height={height}
      width={width}
    >
      <Canvas
        ref={onRef}
      />
    </Container>
  );
};

PieChart.propTypes = {
  data: arrayOf(shape({})),
  labelKey: string,
  valueKey: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
  loading: bool,
};

PieChart.defaultProps = {
  data: [],
  labelKey: 'label',
  valueKey: 'value',
  height: '100%',
  width: '100%',
  loading: false,
};


const Container = styled(({ height, width, ...rest }) => <div {...rest} />)`
  height: ${p => getUnit(p.height)};
  width: ${p => getUnit(p.width)};
  position: relative;
`;

const Canvas = styled.canvas`
  height: 100%;
  width: 100%;
`;

const CenterTextContainer = styled.div`
  display: flex;
  height: ${p => getUnit(p.height)};
  width: ${p => getUnit(p.width)};
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 1.2em;
`;

export default PieChart;
