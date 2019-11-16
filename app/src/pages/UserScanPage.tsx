import React, { Component } from 'react'

import ARScene from '../components/ARScene'
import ButtonDock from '../components/ButtonDock'

class UserScanPage extends Component {

    static HIDE_BUTTON_DOCK_DELAY = 300
    static UNFOCUS_ID_DELAY = 200

    hideButtonDockTimeout?: NodeJS.Timeout
    unfocusIdTimeout?: NodeJS.Timeout
    focusedId?: number

    state = {
        buttonDockShown: false
    }

    onScanned = (id: number) => {
        // Button Dock delay
        if (!this.state.buttonDockShown) this.setState({ buttonDockShown: true })
        if (this.hideButtonDockTimeout) clearTimeout(this.hideButtonDockTimeout)
        this.hideButtonDockTimeout = setTimeout(() => this.setState({ buttonDockShown: false }), UserScanPage.HIDE_BUTTON_DOCK_DELAY)

        // Unfocus Id delay
        if (!this.focusedId) this.focusedId = id
        if (this.focusedId === id) {
            if (this.unfocusIdTimeout) clearTimeout(this.unfocusIdTimeout)
            this.unfocusIdTimeout = setTimeout(() => { this.focusedId = undefined }, UserScanPage.UNFOCUS_ID_DELAY)
        }
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