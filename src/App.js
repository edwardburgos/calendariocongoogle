import s from './App.module.css'

function App() {

  // To implement
  // - Automatic Zoom Meetings
  // - Automatic scheduling on teacher calendar
  // - Cookies are not enabled in current enviroment in incognito mode

  // Objeto que se le debe enviar
  const eventToRegister = {
    name: 'Special Event',
    description: 'Really special event',
    startDate: '2021-07-20T09:00:00-07:00',
    endDate: '2021-07-20T17:00:00-07:00',
    timeZone: 'America/Los_Angeles',
    emailTeacher: 'lpage@example.com',
    emailStudent: 'sbrin@example.com',
  }

  function randomID() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Declaramos la variable gapi
  var gapi = window.gapi;

  // Client ID and API key from the Developer Console
  var CLIENT_ID = '702751280958-dtas92vf0iflap0t1hvu54geralg15q6.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyCX-oxDDfuxKBWkiAjaTHTy4P1zS-K-wtg';

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  function handleClick() {
    gapi.load('client:auth2', () => {

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.client.load('calendar', 'v3')

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          var event = {
            'summary': eventToRegister.name,
            'description': eventToRegister.description,
            'start': {
              'dateTime': eventToRegister.startDate,
              'timeZone': eventToRegister.timeZone
            },
            'end': {
              'dateTime': eventToRegister.startDate,
              'timeZone': eventToRegister.timeZone
            },
            'attendees': [
              { 'email': eventToRegister.emailTeacher },
              { 'email': eventToRegister.emailStudent }
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
              ]
            },
            conferenceData: {
              createRequest: { requestId: randomID()}
            }
          }

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
            'conferenceDataVersion': 1
          })

          request.execute(event => {
            window.open(event.htmlLink)
          })

        })
    })
  }

  return (
    <div className={s.App}>
      <header className={s.Appheader}>
        <button className={s.button} onClick={handleClick}>Add a special event to your calendar</button>
      </header>

    </div>
  );
}

export default App;
