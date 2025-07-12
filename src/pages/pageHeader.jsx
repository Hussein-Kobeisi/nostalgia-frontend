import '../styles/common.css'
import '../styles/pageHeader.css'

const PageHeader = () => {

    return(
    <div className='pageHeaderMain flex-row justify-between items-center'>
        <button onClick={() => console.log('HomPage')}>Nostalgia</button>
        
        <div className='pageHeaderUserDiv flex-row items-center'>
            <button className='flex-row items-center' onClick={() => console.log('UserPage')}>
                <p>Username</p>
                <img className='userImg'/>
            </button>
        </div>
        
        <div className='pageRegisterButtonsDiv' style={{display: 'none'}}>

        </div>
    </div>)
}

export default PageHeader;