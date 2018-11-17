import React from 'react'
import PropTypes from 'prop-types'
import NoScan from '../../NoScan'
import ResultsDetails from './ResultsDetails'
import ResultsList from './ResultsList'
import ResultsSummary from './ResultsSummary'
import './Results.css'

const Results = ({ results, openBrowser }) => (
    !results
        ?
        <NoScan />
        :
        <div className='results'>
            <ResultsSummary
                date={results.report_datetime_end}
                index={results.hardening_index}
                suggestions={results['suggestion[]'].length}
                warnings={results['warning[]'].length} />
            <ResultsDetails data={results} />
            <ResultsList data={results['warning[]']} type='warnings' openBrowser={openBrowser}/>
            <ResultsList data={results['suggestion[]']} type='suggestions' openBrowser={openBrowser}/>
        </div>
)

Results.propTypes = {
    results: PropTypes.object
}

export default Results