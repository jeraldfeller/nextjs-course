import {connectDatabase, insertDocument} from '../../../lib/db-util'

async function handler(req, res){
    if(req.method === 'POST'){
        const {email, name, message} = req.body

        if(!email || !email.includes('@') || !name || !message){
            res.status(422).json({message: 'Invalid input. Please ensure you have entered a valid email, name, and message.'});
            return;
        }

        // Store in the database
        const newMessage = {
            email,
            name,
            message
        }

        let client
        try{
            client = await connectDatabase()
        }catch(error){
            res.status(500).json({message: 'Could not connect to database.'})
            return
        }

        try{
            const result = await insertDocument(client, 'contact', newMessage)
            
        }catch(error){
            res.status(500).json({message: 'Storing message failed!'})
            return
        }


        client.close()
        res.status(201).json({message: 'Successfully stored message!', response: newMessage})
    }
}

export default handler