import React from 'react'
import PropTypes from 'prop-types'

const DetailsItem = ({ label, text }) => (
    <div>
        <span>{label}: </span>
        <span>
            {!Array.isArray(text) ? text : text.map((item, i) => <span key={i}>{item}</span>)}
        </span>
    </div>
)

DetailsItem.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired
}

export default DetailsItem