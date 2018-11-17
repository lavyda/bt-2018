import React from 'react'
import IconChart from 'react-icons/lib/md/insert-chart'
import IconDelete from 'react-icons/lib/md/delete'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import './HistoryItem.css'

const HistoryItem = ({ actionRemove, actionSelect, date, index, suggestions, warnings }) => (
    <div className='history-item'>
        <span>{moment(date).fromNow()}</span>
        <span><span>Hardening Index: </span>{index}</span>
        <span><span>Warnings: </span>{warnings}</span>
        <span><span>Suggestions: </span>{suggestions}</span>
        <span className='tools'>
            <span>
                <IconChart size={25} color={'#2980b9'} />
                <Link to='/'>
                    <button className='button-details' onClick={() => actionSelect(date)}>Details</button>
                </Link>
            </span>
            <span>
                <IconDelete size={25} color={'#c0392b'} />
                <button className='button-delete' onClick={() => actionRemove(date)}>Delete</button>
            </span>
        </span>
    </div>
)

HistoryItem.propTypes = {
    actionRemove: PropTypes.func.isRequired,
    actionSelect: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
    suggestions: PropTypes.number.isRequired,
    warnings: PropTypes.number.isRequired
}

export default HistoryItem