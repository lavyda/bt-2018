import moment from 'moment'
const { exec, execSync } = window.require('child_process')
const { homedir, userInfo } = window.require('os')
const { platform } = window.require('process')
const fs = window.require('fs')
const shell = window.require('electron').shell
const getos = window.require('getos')
const resultsPath = homedir() + '/.lynis-gui/reports/'

/** 
 * actions
*/
export const GET_ALL_RESULTS = 'GET_ALL_RESULTS'
export const GET_LATEST_RESULT = 'GET_LATEST_RESULT'
export const IS_LYNIS_AVAILABLE = 'IS_LYNIS_AVAILABLE'
export const ARE_PACKAGES_AVAILABLE = 'ARE_PACKAGES_AVAILABLE'
export const SCAN_START = 'SCAN_START'
export const SCAN_SUCCESS = 'SCAN_SUCCESS'
export const SCAN_ERROR = 'SCAN_ERROR'
export const DELETE_RESULT = 'DELETE_RESULT'
export const SELECT_RESULT = 'SELECT_RESULT'
export const OPEN_BROWSER = 'OPEN_BROWSER'

export function getAllResults() {
    return {
        type: GET_ALL_RESULTS,
        results: getResults()
    }
}

export function getLatestResult() {
    return {
        type: GET_LATEST_RESULT,
        result: latestResult()
    }
}

export function scanSuccess(result) {
    return {
        type: SCAN_SUCCESS,
        result
    }
}

export function scanError() {
    return {
        type: SCAN_ERROR
    }
}

export function scanStart() {
    return {
        type: SCAN_START
    }
}

export function isLynisAvailable() {
    return {
        type: IS_LYNIS_AVAILABLE,
        isAvailable: isAvailable()
    }
}

export function arePackagesAvailable(result) {
    return {
        type: ARE_PACKAGES_AVAILABLE,
        areAvailable: result
    }
}

export function removeResult(id) {
    return {
        type: DELETE_RESULT
    }
}

export function deleteResult(id) {
    return (dispatch, getState) => {
        const toDelete = getState().app.allResults.find(result => result.report_datetime_end === id)
        fs.unlinkSync(resultsPath + toDelete.filename)
        dispatch(getAllResults())
        dispatch(removeResult())
    }
}

export function selectResult(id) {
    return {
        type: SELECT_RESULT,
        id
    }
}

export function openBrowser(id) {
    shell.openExternal(`https://cisofy.com/controls/${id}`)
    return {
        type: OPEN_BROWSER
    }
}

/** 
 * spwan child processes for lynis and converter
*/
export function scan() {
    return (dispatch) => {
        dispatch(scanStart())
        const username = userInfo().username
        const filename = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss') + '.json'
        const lynisCommandLinux = 'echo -n > /tmp/lynis-gui-report.dat && pkexec lynis audit system --report-file /tmp/lynis-gui-report.dat --auditor ' + username
        const lynisCommandDarwin = 'echo -n > /tmp/lynis-gui-report.dat && lynis audit system --report-file /tmp/lynis-gui-report.dat --auditor ' + username
        // use for development
        const converterCommand = './src/resources/assets/scripts/pl/lynis-report-converter.pl --json --input /tmp/lynis-gui-report.dat --output ' + resultsPath + filename
        // use for production
        //const converterCommand = './resources/lynis-report-converter.pl --json --input /tmp/lynis-gui-report.dat --output ' + resultsPath + filename

        // execute command based on platform
        let lynisCommand
        switch (platform) {
            case 'darwin':
                lynisCommand = lynisCommandDarwin
                break
            case 'linux':
                lynisCommand = lynisCommandLinux
                break
            default:
                return
        }
        const lynisProcess = exec(lynisCommand)
        //lynisProcess.stdout.on('data', data => console.log(data))
        lynisProcess.on('exit', (code) => {
            //console.log('LOG: Lynis exited with code', code);
            if (code === 0) {
                const converterProcess = exec(converterCommand)
                converterProcess.on('exit', (code) => {
                    //console.log('LOG: Converter exited with code', code)
                    if (code === 0) {
                        let result = transformResult(JSON.parse(fs.readFileSync(resultsPath + filename)), filename)
                        dispatch(scanSuccess(result))
                    } else {
                        dispatch(scanError())
                    }
                })
            } else {
                dispatch(scanError())
            }
        })
    }
}

/**
 * check if lynis is installed
 * @returns true if lynis is installed else false
 */
function isAvailable() {
    exec('mkdir -p ' + resultsPath)
    try {
        execSync('which lynis')
        return true
    }
    catch (error) {
        return false
    }
}

/**
 * check if required packages for converter are installed based on distribution
 * @returns {state: boolean, missing: ['string']} 
 * state is true if packages are installed else is false 
 * missing contains array of strings of missing packages
 */
export function checkPackages() {
    return (dispatch) => {
        if (platform === 'darwin') {
            dispatch(arePackagesAvailable({ state: true }))
        } else {
            getos((e, os) => {
                const dpkgCommand = 'dpkg -s libjson-perl'
                const rpmCommand = 'rpm -q perl-Module-Load-Conditional && rpm -q perl-JSON'
                if (e) {
                    dispatch(arePackagesAvailable({ state: false }))
                } else {
                    let command
                    let missing
                    // check distribution
                    const dist = os.dist.toUpperCase()
                    if (dist.includes('UBUNTU') || dist.includes('DEBIAN')) {
                        command = dpkgCommand
                        missing = ['libjson-perl']
                    } else if (dist.includes('FEDORA') || dist.includes('RHEL') || dist.includes('CENTOS')) {
                        command = rpmCommand
                        missing = ['perl-JSON, perl-Module-Load-Conditional']
                    } else {
                        return dispatch(arePackagesAvailable({ state: false }))
                    }
                    // check if packages are installed
                    try {
                        execSync(command)
                        dispatch(arePackagesAvailable({ state: true }))
                    }
                    catch (error) {
                        dispatch(arePackagesAvailable({ state: false, missing }))
                    }
                }
            })
        }
    }
}

/**
 * get latest result
 * @returns result object
 */
function latestResult() {
    return getResults()[0]
}

/** 
 * get all results
 * @returns array of result objects
*/
function getResults() {
    // read only json files into array
    let results = []
    fs.readdirSync(resultsPath).forEach(file => {
        const extension = file.split('.')[1]
        if (extension === 'json') {
            results.push(
                transformResult(
                    JSON.parse(
                        fs.readFileSync(resultsPath + file)
                    ), file
                ))
        }
    }

    )
    // sort by date descending
    if (results.length !== 0) {
        results.sort((a, b) => {
            a = new Date(a.report_datetime_end)
            b = new Date(b.report_datetime_end)
            return a > b ? -1 : a < b ? 1 : 0
        })
    }
    return results
}

/**
 * transform result into correct form
 * @param {*} result result object to transform
 * @param {*} filename filename of result
 * @returns object of transformed result
 */
function transformResult(result, filename) {
    // transform warnings into {id: 'id', description: 'desc'}
    if (result['warning[]'].length !== 0) {
        if (result['warning[]'][0].includes('|')) {
            let warnings = []
            result['warning[]'].forEach(warning => {
                const fields = warning.split('|')
                warnings.push({
                    id: fields[0],
                    description: fields[1]
                })
            })
            result['warning[]'] = warnings
        } else {
            result['warning[]'] = [{
                id: result['warning[]'][0],
                description: result['warning[]'][1]
            }]
        }
    }
    // add filename to result object
    result = { ...result, filename }
    return result
}
