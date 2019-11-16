import React, { Component } from 'react'

import ARScene from '../components/ARScene'
import ButtonDock from '../components/ButtonDock'

class UserScanPage extends Component {

    static HIDE_BUTTON_DOCK_DELAY = 300;

    hideButtonDockTimeout?: NodeJS.Timeout

    state = {
        buttonDockShown: false
    }

    onScanned = (id: number) => {
        if (!this.state.buttonDockShown) this.setState({ buttonDockShown: true })
        if (this.hideButtonDockTimeout) clearTimeout(this.hideButtonDockTimeout)
        this.hideButtonDockTimeout = setTimeout(() => this.setState({ buttonDockShown: false }), UserScanPage.HIDE_BUTTON_DOCK_DELAY)
    }

    render() {
        return (
            <div className="relative">
                <ARScene onScanned={this.onScanned} />
                <ButtonDock shown={this.state.buttonDockShown} />
            </div>
        )
    }
}

export default UserScanPage