const React = require('react')

function Show(props){
    const {Logs} = props
    return(
        <div>
            <h1>Log Page</h1>
            <h6>
                The ship {Logs.title} was docked at {Logs.entry}
            </h6>
            <h6>{Logs.shipIsBroken ? 'The ship was damaged during the voyage': 'The ship was returned in mint condition'}</h6>
        </div>
    )

}

module.exports = Show;