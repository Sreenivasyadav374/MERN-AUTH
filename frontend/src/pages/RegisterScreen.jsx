import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Form,Button,Row,Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch,useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";


const RegisterScreen = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const navigate=useNavigate();
const dispatch=useDispatch();

const [register,{isLoading}]=useRegisterMutation();

const {userInfo}=useSelector((state)=>state.auth);
useEffect(() => {
    if(userInfo){
        navigate('/')
    }
}, [navigate,userInfo]);

const submitHandler=async(e)=>{
    e.preventDefault();
    if(password!==confirmPassword){
        toast.error("Passwords donot match");
    }
    try{
        const res=await register({name,email,password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/')
    }
    catch(err){
        toast.error(err?.data?.message||err.error);
    }
}
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control 
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control 
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control 
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control 
                type=" Confirm password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            {isLoading&&<Loader/>}
            <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
            <Row className="py-3">
                <Col>
                    Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen