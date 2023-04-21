const React = require("react");

function Index(props) {
  const { Logs } = props;
  return (
    <div>
        <nav>
            <a href="/logs/new">Add to Log</a>
        </nav>
      <ul>
        {Logs.map((each, id) => {
            return(
                <li key={each.id}>
                    <a href={`/logs/${each.id}`}>{each.title} on {each.entry}</a>
                    <a href={`/logs/${each.id}/edit`}>Edit Log</a>
                <form method="POST" action={`/logs/${each.id}?_method=DELETE`}>
                  <input type="submit" value="DELETE"/>
                </form>
                </li>
            )
        })}
      </ul>
    </div>
  );
}

module.exports = Index;