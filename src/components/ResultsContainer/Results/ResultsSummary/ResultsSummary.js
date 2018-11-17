import React from 'react'
import Icon from 'react-icons/lib/md/warning'
import IconHelp from 'react-icons/lib/md/help'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { PieChart } from 'react-easy-chart'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import './ResultsSummary.css'

const ResultsSummary = ({ date, index, suggestions, warnings }) => {
    let color
    if (index < 25) {
        color = '#c0392b'
    } else if (index > 25 && index < 50) {
        color = '#d35400'
    } else if (index > 50 && index < 75) {
        color = '#f39c12'
    } else {
        color = '#27ae60'
    }

    return (
        <div className='results-summary'>
            <div className='results-summary-chart'>
                <span>{index}</span>
                <PieChart
                    size={160}
                    innerHoleSize={125}
                    data={[
                        { key: 'i', value: index, color: color },
                        { key: 'r', value: 100 - index, color: '#bdc3c7' }
                    ]}
                />
            </div>
            <div className='results-summary-text'>
                <span>Summary{warnings > 0 && <Icon />}</span>
                <span><span>Performed: </span>{moment(date).fromNow()}</span>
                <span>
                    <span>Hardening Index: </span>{index}
                    <Tooltip placement='right' trigger={['hover']} overlay={'Learn more about Hardening Index.'}>
                        <Link to='/about'><IconHelp size={25} color={'#3498db'}/></Link>
                    </Tooltip>
                </span>
                <span><span>Warnings: </span>{warnings}</span>
                <span><span>Suggestions: </span>{suggestions}</span>
            </div>
        </div >
    )
}

ResultsSummary.propTypes = {
    date: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
    suggestions: PropTypes.number.isRequired,
    warnings: PropTypes.number.isRequired
}

export default ResultsSummary