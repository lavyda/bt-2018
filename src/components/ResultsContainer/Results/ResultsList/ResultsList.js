import React from 'react'
import IconDown from 'react-icons/lib/md/arrow-drop-down'
import IconSuggestion from 'react-icons/lib/md/info'
import IconUp from 'react-icons/lib/md/arrow-drop-up'
import IconWarning from 'react-icons/lib/md/warning'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import './ResultsList.css'

class ResultsList extends React.Component {
    constructor() {
        super()
        this.state = {
            opened: false
        }
    }

    toggle = () => (
        this.setState({ opened: !this.state.opened })
    )

    render() {
        const { data, type, openBrowser } = this.props
        let icon
        let title
        switch (type) {
            case 'suggestions':
                icon = <IconSuggestion size={24} color={'#3498db'} />
                title = 'Suggestions'
                break;
            case 'warnings':
                icon = <IconWarning size={24} color={'#e74c3c'} />
                title = 'Warnings'
                break;
            default:
                title = 'Title'
        }
        return (
            <div className={'results-' + type}>
                <span className='results-title' onClick={this.toggle}>
                    {title} {!this.state.opened ? <IconUp size={40} /> : <IconDown size={40} />}
                </span>
                <div className={this.state.opened ? 'results-list' : 'results-list-hidden'}>
                    {data.map((item, i) => (
                        <span key={i}>
                            <Tooltip
                                placement='right'
                                trigger={['hover']}
                                overlay={<span>Click to learn more about this test.</span>}
                                onClick={() => openBrowser(item.id)}>
                                {icon}
                            </Tooltip>
                            <span>{item.description}</span>
                        </span>)
                    )}
                </div>
            </div>
        )
    }
}

export default ResultsList