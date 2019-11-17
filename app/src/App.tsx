import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import UserScanPage from './pages/UserScanPage'

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/">
          <UserScanPage />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default App