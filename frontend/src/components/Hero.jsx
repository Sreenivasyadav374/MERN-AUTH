import { Button, Card, Container } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'

function Hero() {
  return (
    <div className="py-5">
        <Container className="d-flex justify-content-center">
            <Card className="p-5 d-flex flex-column align-items-center 
            bg-light w-75 hero-card">
                <h1 className="text-center mb-4">
                    MERN Authentication
                </h1>
                <p className="text-center mb-4">
                    BoilerPlate for the Mern Authentication.
                </p>
                <div className="d-flex">
                     <LinkContainer to='/login'>
                    <Button className="me-3" variant="primary">
                        Sign In
                    </Button>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                    <Button variant="secondary" href="/register">
                        Register
                    </Button>
                    </LinkContainer>
                </div>
            </Card>
        </Container>
    </div>
  )
}

export default Hero