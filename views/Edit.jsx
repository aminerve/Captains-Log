const React = require('react')

function Edit(props){
    const { Logs } = props
    return(
        <form method='POST' action={`/logs/${Logs.id}?_method=PUT`}>
            Title: <input type='text' name='title' defaultValue={Logs.name}/>
            <br/>
            Entry: <input type='textarea' name='entry'defaultValue={Logs.entry}/>
            <br/>
            Is The Ship Broken?:{Logs.shipIsBroken ? (
          <input type="checkbox" name="shipIsBroken" defaultChecked />
        ) : (
          <input type="checkbox" name="shipIsBroken" />
        )}
            <br/>
            <input type='submit' value='Submit Changes'/>
        </form>
    )
}

module.exports = Edit;