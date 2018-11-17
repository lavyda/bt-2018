import React from 'react'
import PropTypes from 'prop-types'
import './DetailsTitle.css'

const DetailsTitle = ({ label }) => (
    <span className='results-details-title'>{label}</span>
)

DetailsTitle.propTypes = {
    label: PropTypes.string.isRequired
}

export default DetailsTitle