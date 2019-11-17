import React, { Component } from 'react'

import ARScene from '../components/ARScene'
import ButtonDock from '../components/ButtonDock'

import User from '../models/User'
import Api from '../api'

class UserScanPage extends Component {

    static HIDE_BUTTON_DOCK_DELAY = 300
    static UNFOCUS_ID_DELAY = 200

    hideButtonDockTimeout?: NodeJS.Timeout
    unfocusIdTimeout?: NodeJS.Timeout
    focusedId?: number

    state: {
        buttonDockShown: boolean
        focusedUser?: User
        users: User[]
    } = {
        buttonDockShown: false,
        users: []
    }

    onScanned = (id: number) => {
        // Button Dock delay
        if (!this.state.buttonDockShown) this.setState({ buttonDockShown: true })
        if (this.hideButtonDockTimeout) clearTimeout(this.hideButtonDockTimeout)
        this.hideButtonDockTimeout = setTimeout(() => this.setState({ buttonDockShown: false }), UserScanPage.HIDE_BUTTON_DOCK_DELAY)

        if (!this.state.users[id]) {
            this.fetchUser(id)
        }

        // Unfocus Id delay
        if (!this.focusedId) {
            this.focusedId = id
            //this.fetchUser(id)
        }
        if (this.focusedId === id) {
            if (this.unfocusIdTimeout) clearTimeout(this.unfocusIdTimeout)
            this.unfocusIdTimeout = setTimeout(() => { this.focusedId = undefined }, UserScanPage.UNFOCUS_ID_DELAY)
        }
    }

    fetchUser = async (id: number) => {
        const user = await Api.getUserInfo(id)
        let users = [ ...this.state.users ]
        users[id] = user
        this.setState({ users })
    }

    render() {
        return (
            <div className="relative">
                <ARScene onScanned={this.onScanned} textRender={(id: number) => this.state.users[id] && this.state.users[id].name} />
                <ButtonDock shown={this.state.buttonDockShown} />
            </div>
        )
    }
}

export default UserScanPage