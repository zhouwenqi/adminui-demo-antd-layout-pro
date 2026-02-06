import * as echarts from 'echarts/core'
import type {
  ComposeOption,
} from 'echarts/core'

import { LineChart, PieChart, GaugeChart, BarChart } from 'echarts/charts'
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,  
  GaugeSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TimelineComponent,   
  TitleComponent, 
} from 'echarts/components'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,  
  DatasetComponentOption,  
  TimelineComponentOption
} from 'echarts/components'

type AppChartOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | TimelineComponentOption
>
import { CanvasRenderer } from 'echarts/renderers'
import {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react'

import type { AppChartProps } from "./typings"
import { useConfigState } from '@adminui-dev/antd-layout'
import { useIntl } from 'react-intl';

echarts.use([
  LineChart,
  PieChart,
  GaugeChart,
  BarChart,
  GridComponent,  
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  CanvasRenderer,
  LegendComponent,
  TimelineComponent
])

const AppChart = (props: AppChartProps, ref: React.Ref<any>) => {  
  const { layoutConfig } = useConfigState()
  const intl = useIntl()
  const theme = layoutConfig.theme === "system" ? "auto" : layoutConfig.theme

  const echartsRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.EChartsType | null>(null)

  const handleResize = () => {
    try {
      chartRef.current?.resize()
    } catch {}
  }

  useEffect(() => {
    const dom = echartsRef.current!
    if (chartRef.current) {
      echarts.dispose(dom)
    }
    chartRef.current = echarts.init(dom, theme, {locale:intl.locale})
    chartRef.current.on('finished', () => {
      props.finished?.()
    })

    props.ready?.()

    if (props.option) {
      chartRef.current.setOption({
        ...props.option,
        backgroundColor: '',
      })
    }

    window.addEventListener('resize', handleResize)
    chartRef.current.resize()

    return () => {
      window.removeEventListener('resize', handleResize)
      echarts.dispose(dom)
      chartRef.current = null
    }
  }, [theme])

  useImperativeHandle(ref, () => ({
    setOption: (option: AppChartOption) => {
      if (!chartRef.current && echartsRef.current) {
        chartRef.current = echarts.init(echartsRef.current)
      }
      chartRef.current?.setOption({ ...option, backgroundColor: '' })
    },
  }))

  return <div ref={echartsRef} style={props.style}></div>
}
export type { AppChartOption }
export default forwardRef(AppChart)