import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results'
import { getLatestResult, openBrowser } from '../../actions'

class ResultsContainer extends React.Component {
    componentDidMount() {
        !this.props.selectedResult && this.props.getLatestResult()
    }

    render() {
        return <Results results={this.props.selectedResult} openBrowser={this.props.openBrowser}/>
    }
}

const mapStateToProps = state => ({
    selectedResult: state.app.selectedResult
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getLatestResult, openBrowser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)