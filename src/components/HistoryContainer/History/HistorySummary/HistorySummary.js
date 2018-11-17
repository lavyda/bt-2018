import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import './HistorySummary.css'

const HistorySummary = withRouter(({ actionSelect, data, history }) => (
    <div className='history-summary'>
        <span className='history-summary-title'>Previous Scans</span>
        {data.length > 1 &&
            <div className='history-summary-chart'>
                <BarChart
                    width={700}
                    height={250}
                    margin={{ top: 50, right: 5, bottom: 50, left: 5 }}
                    barSize={50}
                    data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='date' tick={false} label='Hardening Index progression in time' />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar
                        dataKey='hi'
                        name='Hardening Index'
                        fill='#2980b9'
                        label={{ fill: '#ffffff', fontSize: 20 }}
                        onClick={(data) => {
                            actionSelect(data.id)
                            history.push('/')
                        }} />
                </BarChart>
            </div>
        }
    </div>
))

HistorySummary.propTypes = {
    actionSelect: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default HistorySummary