import { useEffect, useRef } from 'react';
import {
  arrayOf, shape, string, oneOfType, number, bool,
} from 'prop-types';

import uniq from 'lodash/uniq';

import styled from 'styled-components';
import Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';
import { FiAlertTriangle, FiRotateCw } from 'react-icons/fi';

if (typeof window !== 'undefined') {
  Chart.defaults.global.plugins.colorschemes.scheme = 'tableau.Tableau20';
}

const getUnit = (num) => {
  if (typeof num === 'number') {
    return `${num}px`;
  }
  return num;
};

const BarChart = ({
  data,
  labelKey,
  valueKey,
  stackBy,
  groupBy,
  height,
  width,
  loading,
}) => {
  const instance = useRef({});
  // useEffect(() => {
  //   instance.current.ref = undefined;
  //   instance.current.chart = undefined;
  // }, [loading]);

  const getChartData = () => {
    const labels = uniq(data.map(d => d[labelKey]));
    let stacks = [];
    let groups = [];
    if (stackBy) {
      stacks = uniq(data.map(d => d[stackBy]));
    }
    if (groupBy) {
      groups = uniq(data.map(d => d[groupBy]));
    }
    // console.log('>>>', data.map(d => d[valueKey]));
    return {
      labels,
      datasets: (groupBy ? groups : ['Default']).reduce((agg, group) => agg.concat(stacks.length ? stacks : ['Default'].map(stack => ({
        label: (groupBy && stackBy) ? `${group} ${stack}` : valueKey,
        stack: groupBy && `${group}`,
        data: data.map(d => d[valueKey]),
      }))), []),
    };
  };


  const onRef = (ref) => {
    if (ref) {
      const config = {
        type: 'bar',
        data: getChartData(),
        responsive: true,
        maintainAspectRatio: true,
        height,
        options: {
          // outerRadius: 200,
          // cutoutPercentage: 50,
          // legend: {
          //   position: 'bottom',
          //   labels: {
          //     boxWidth: 12,
          //     padding: 8,
          //     usePointStyle: true,
          //   },
          // },
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
        {loading && <><FiRotateCw />&nbsp;&nbsp;Loading ...</>}
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

BarChart.propTypes = {
  data: arrayOf(shape({})),
  labelKey: string,
  valueKey: string,
  stackBy: string,
  groupBy: string,
  height: oneOfType([string, number]),
  width: oneOfType([string, number]),
  loading: bool,
};

BarChart.defaultProps = {
  data: [],
  labelKey: 'label',
  valueKey: 'value',
  stackBy: undefined,
  groupBy: undefined,
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

export default BarChart;
