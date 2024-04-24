import classes from './contact-form.module.css'
import {useRef, useState, useEffect} from 'react'
import Notification from '../../ui/notification'

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!')
    }
}

function ContactForm() {

    const emailInput = useRef()
    const nameInput = useRef()
    const messageInput = useRef()

    const [requestStatus, setRequestStatus] = useState() // success, error, pending
    const [requestError, setRequestError] = useState()

    useEffect(() => {
        if(requestStatus === 'success' || requestStatus === 'error'){
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setRequestError(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [requestStatus])

    const sendMessageHandler = async (event) => {
        event.preventDefault()

        setRequestStatus('pending')
        try{
            await sendContactData({
                email: emailInput.current.value,
                name: nameInput.current.value,
                message: messageInput.current.value
            })
        }catch(error){
            setRequestError(error.message)
            setRequestStatus('error')
        }
        

        emailInput.current.value = ''
        nameInput.current.value = ''
        messageInput.current.value = ''

        setRequestStatus('success')
        
    }

    let notification
    if(requestStatus === 'pending'){
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        }
    }

    if(requestStatus === 'success'){
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    }       
    if(requestStatus === 'error'){
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }
    


  return (
    <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInput} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' required ref={nameInput} />
                </div>
            </div>
            <div className={classes.control}>
                    <label htmlFor='email'>Your Message</label>
                    <textarea id='message' rows='5' ref={messageInput} />
            </div>
            <div className={classes.actions}>
                <button>Send Message</button>
            </div>
        </form>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    </section>
  )
}

export default ContactForm
