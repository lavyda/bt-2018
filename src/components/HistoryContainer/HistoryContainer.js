import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import History from './History'
import { getAllResults, selectResult, deleteResult } from '../../actions'

class HistoryContainer extends React.Component {
    componentDidMount() {
        this.props.getAllResults()
    }

    render() {
        return <History
            actionRemove={this.props.deleteResult}
            actionSelect={this.props.selectResult}
            results={this.props.results}
        />
    }
}

const mapStateToProps = state => ({ results: state.app.allResults })

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getAllResults, selectResult, deleteResult }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)