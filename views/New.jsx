const React = require('react')

function New(){
    return(
        <div>
            <form action='/logs' method='POST'>
            Title: <input type='text' name='title'/>
            <br/>
            Entry: <input type='textarea' name='entry'/>
            <br/>
            Is The Ship Broken?: <input type='checkbox' name='shipIsBroken'/>
            <br/>
            <input type='submit' value='Log Trip'/>
            </form>
        </div>
    )
}

module.exports = New;