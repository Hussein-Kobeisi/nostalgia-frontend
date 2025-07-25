import '../styles/popup.css'
import { useState } from 'react'

export const Popup = ({msg = 'Success!', addClass='', visible, setVisible}) => {

    setTimeout(() => setVisible(false), 1000);

    return(
        <div className={'popupDiv novaFont ' + (visible ? '' : 'fade-out ') + addClass}>
            {msg}
        </div>
    )
}