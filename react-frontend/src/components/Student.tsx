import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap';

const Student=({title, description, onClick, onDelete} : {title:any, description:any, onClick:any, onDelete:any})=>{
        
    return(
        <Card className='student'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
                <Button variant='primary' onClick={onClick}> Updated</Button>
                {/* {' '} creating a space */}
                <Button variant='danger' onClick={onDelete}>Delete</Button>
            </Card.Body>
        </Card>
    )
}


export default Student;