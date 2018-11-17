import React from 'react'
import IconCheck from 'react-icons/lib/md/check-circle'
import IconError from 'react-icons/lib/md/error'
import PropTypes from 'prop-types'

const DetailsSecurityItem = ({ label, state }) => (
    <div>
        <span>{label}</span>
        <span>{state ? <IconCheck size={24} color={'#27ae60'} /> : <IconError size={24} color={'#c0392b'} />}</span>
    </div>
)

DetailsSecurityItem.propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired
}

export default DetailsSecurityItem