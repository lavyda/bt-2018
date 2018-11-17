import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HeaderScan from './HeaderScan'
import { isLynisAvailable, checkPackages, scan } from '../../../actions'

class HeaderScanContainer extends React.Component {
    componentDidMount() {
        this.props.isLynisAvailable()
        this.props.checkPackages()
    }

    render() {
        return <HeaderScan
            inProgress={this.props.inProgress}
            lynisAvailable={this.props.lynisAvailable}
            packagesAvailable={this.props.packagesAvailable}
            actionScan={this.props.scan}
        />
    }
}

const mapStateToProps = state => (
    {
        lynisAvailable: state.app.lynisAvailable,
        packagesAvailable: state.app.packagesAvailable,
        inProgress: state.app.inProgress
    }
)

const mapDispatchToProps = dispatch =>
    bindActionCreators({ isLynisAvailable, checkPackages, scan }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HeaderScanContainer)