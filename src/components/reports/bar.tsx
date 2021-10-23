import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ChartReportProps, ExtendedChartReportProps } from './ReportProps'
import { checkResultKeys, recordToNative } from '../../utils'
import ReportError from './error'
import Loading from '../Loading'

export default function BarReport(props: ExtendedChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['index', 'key', 'value'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

    const keys: string[] = []

    const data: Record<string, any>[] = records.reduce((data: Record<string, any>[], row: Record<string, any>) => {
        const index = recordToNative(row.get('index'))
        const idx = data.findIndex(item => item.index === index)

        const key = recordToNative(row.get('key'))
        const value = recordToNative(row.get('value'))

        if ( !keys.includes(key) ) {
            keys.push(key)
        }

        if ( idx > -1 ) {
            data[ idx ][ key ] = value
        }
        else {
            data.push({ index, [key]: value  })
        }

        return data
    }, [])
        .map(row => {
            keys.forEach(key => {
                if ( !row.hasOwnProperty(key) ) {
                    row[ key ] = 0
                }
            })

            return row
        })

    const settings = (props.settings) ? props.settings : {};
    const legendWidth = (settings["legendWidth"]) ? settings["legendWidth"] : 128;
    const marginRight = (settings["marginRight"]) ? settings["marginRight"] : 24;
    const marginLeft = (settings["marginLeft"]) ? settings["marginLeft"] : 36;
    const marginTop = (settings["marginTop"]) ? settings["marginTop"] : 24;
    const marginBottom = (settings["marginBottom"]) ? settings["marginBottom"] : 62;
    const legend = (settings["legend"]) ? settings["legend"] : false;
    const labelRotation = (settings["labelRotation"]) ? settings["labelRotation"] : 45;
    const labelSkipSize = (settings["barValues"]) ? 1 : 2000;
    const colorScheme = (settings["colors"]) ? settings["colors"] : 'set2';

    return <ResponsiveBar
        layout={props.layout}
        groupMode={props.stacked ? 'stacked' : 'grouped'}
        data={data}
        keys={keys}
        indexBy="index"
        margin={{ top: marginTop, right: (legend) ? legendWidth + marginRight : marginRight, bottom: marginBottom, left: marginLeft }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: colorScheme }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: labelRotation,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        labelSkipWidth={labelSkipSize}
        labelSkipHeight={labelSkipSize}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={ (legend) ? [
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: legendWidth-28,
                itemHeight: 20,
                itemDirection: 'right-to-left',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ] : []}
        animate={false}
        motionStiffness={90}
        motionDamping={15}

        {...props.config}
    />

}