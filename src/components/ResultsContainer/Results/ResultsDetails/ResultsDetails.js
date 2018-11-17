import React from 'react'
import IconDown from 'react-icons/lib/md/arrow-drop-down'
import IconUp from 'react-icons/lib/md/arrow-drop-up'
import DetailsItem from './DetailsItem'
import DetailsTitle from './DetailsTitle'
import DetailsSecurityItem from './DetailsSecurityItem'
import './ResultsDetails.css'

class ResultsDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            opened: true
        }
    }

    toggle = () => (
        this.setState({ opened: !this.state.opened })
    )

    render() {
        const data = this.props.data
        return (
            <div className='results-details'>
                <span className='results-title' onClick={this.toggle}>
                    Details {!this.state.opened ? <IconUp size={40} /> : <IconDown size={40} />}
                </span>
                <div className={this.state.opened ? 'results-details-list' : 'results-list-hidden'}>

                    <div className='results-details-cell'>
                        <DetailsTitle label='System' />
                        <DetailsItem label='Operating System' text={data.os_fullname} />
                        <DetailsItem label='Kernel Version' text={data.os_kernel_version_full} />
                        <DetailsItem label='Lynis Version' text={data.lynis_version} />
                        <DetailsItem label='Package Manager' text={data['package_manager[]']} />
                        <DetailsItem label='Installed Packages' text={data.installed_packages} />
                    </div>

                    <div className='results-details-cell'>
                        <DetailsTitle label='Network' />
                        <DetailsItem label='IPv4 Addresses' text={data['network_ipv4_address[]']} />
                        <DetailsItem label='IPv6 Addresses' text={data['network_ipv6_address[]']} />
                        <DetailsItem label='MAC Addresses' text={data['network_mac_address[]']} />
                        <DetailsItem label='Default Gateway' text={data['default_gateway[]']} />
                    </div>

                    <div className='results-details-cell'>
                        <DetailsTitle label='Security' />
                        <DetailsSecurityItem label='Firewall Installed' state={data.firewall_installed === '1'} />
                        <DetailsSecurityItem label='Firewall Active' state={data.firewall_active === '1'} />
                        <DetailsSecurityItem label='Malware Scanner Installed' state={data.malware_scanner_installed === '1'} />
                        <DetailsSecurityItem label='AppArmor Enabled' state={data.apparmor_enabled === '1'} />
                        <DetailsSecurityItem label='Package Audit Tool Installed' state={data.package_audit_tool_found === '1'} />
                    </div>

                    <div className='results-details-cell open-ports'>
                        <DetailsTitle label='Open Ports' />
                        <div><span>Port</span><span>Process</span></div>
                        {data['network_listen_port[]'].map((port, i) => {
                            const parsed_port = port.port.split(":")[port.port.split(":").length - 1]
                            return <div key={i}><span>{parsed_port}</span><span>{port.owner_process}</span></div>
                        })}
                    </div>

                </div>
            </div >
        )
    }

}

export default ResultsDetails