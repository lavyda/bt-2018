import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import HistoryItem from './HistoryItem'
import HistorySummary from './HistorySummary'
import NoScan from '../../NoScan'
import './History.css'

const History = ({ actionRemove, actionSelect, results }) => (
    !results.length
        ?
        <NoScan />
        :
        <div className='history'>
            <HistorySummary actionSelect={actionSelect} data={
                results.map(result => (
                    {
                        date: moment(result.report_datetime_end).format('DD. MMMM [at] HH:mm'),
                        hi: Number(result.hardening_index),
                        id: result.report_datetime_end
                    }
                )
                )
            } />
            {results.map((result, i) => <HistoryItem
                date={result.report_datetime_end}
                index={result.hardening_index}
                key={i}
                actionRemove={actionRemove}
                actionSelect={actionSelect}
                suggestions={result['suggestion[]'].length}
                warnings={result['warning[]'].length}
            />)}
        </div>
)

History.propTypes = {
    actionRemove: PropTypes.func.isRequired,
    actionSelect: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default History