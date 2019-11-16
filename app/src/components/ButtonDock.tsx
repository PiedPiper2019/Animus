import React from 'react'

interface ButtonDockProps {
    shown: boolean
}

const ButtonDock = (props: ButtonDockProps) => (
    <div className={`button-dock flex ${props.shown ? 'shown' : ''}`}>
        {/* put buttons here */}
    </div>
)

export default ButtonDock