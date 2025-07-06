import { ResponsiveLine } from '@nivo/line';

export default function Grafico ({ data }) {
  //console.log(data);
  return (
    <ResponsiveLine
      data={data}
      theme={{
        text: {
          fontSize: 11,
          fill: '#ffffff',
          outlineWidth: 0,
          outlineColor: '#ffffff'
        },
        axis: {
          domain: {
            line: {
              stroke: '#ffffff',
              strokeWidth: 1
            }
          },
          legend: {
            text: {
              fontSize: 12,
              fill: '#ffffff',
              outlineWidth: 0,
              outlineColor: 'transparent'
            }
          },
          ticks: {
            line: {
              stroke: '#ffffff',
              strokeWidth: 2
            },
            text: {
              fontSize: 11,
              fill: '#ffffff',
              outlineWidth: 0,
              outlineColor: 'transparent'
            }
          }
        },
        grid: {
          line: {
            stroke: '#dddddd',
            strokeWidth: 1
          }
        },
        legends: {
          title: {
            text: {
              fontSize: 11,
              fill: '#ffffff',
              outlineWidth: 0,
              outlineColor: 'transparent'
            }
          },
          text: {
            fontSize: 11,
            fill: '#ffffff',
            outlineWidth: 0,
            outlineColor: 'transparent'
          },
          ticks: {
            line: {},
            text: {
              fontSize: 10,
              fill: '#ffffff',
              outlineWidth: 0,
              outlineColor: 'transparent'
            }
          }
        },
        annotations: {
          text: {
            fontSize: 13,
            fill: '#ffffff',
            outlineWidth: 2,
            outlineColor: '#000',
            outlineOpacity: 1
          },
          link: {
            stroke: '#000000',
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1
          },
          outline: {
            stroke: '#000000',
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1
          },
          symbol: {
            fill: '#000000',
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1
          }
        },
        tooltip: {
          container: {
            background: '#ffffffbb',
            fontSize: 12
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {}
        }
      }}
      margin={{
        top: 50,
        right: 10,
        bottom: 50,
        left: 50
      }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        max: 7
      }}
      yFormat=' >-.2f'
      curve='monotoneX'
      axisTop={null}
      axisBottom={{
        tickValues: 7,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'DIA',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2s',
        legend: 'NÍVEL',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      enableGridX={true}
      colors={{ scheme: 'dark2' }}
      borderColor={{ from: 'color' }}
      lineWidth={3}
      pointSize={8}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={3}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      gridXValues={7}
      gridYValues={7}
      legends={[
        {
          anchor: 'top-left',
          direction: 'row',
          justify: false,
          translateX: 50,
          translateY: -50,
          itemsSpacing: 2,
          itemDirection: 'left-to-right',
          itemWidth: 200,
          itemHeight: 50,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
}
