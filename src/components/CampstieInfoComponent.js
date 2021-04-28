import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardImg, CardText, CardBody, Modal,
ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

    function RenderCampsite( {campsite} ) {
        return (<div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
            </Card>
        </div>);
    }

    class CommentForm extends Component {
        constructor (props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.name, values.comment);
    }
    
        render(){
            return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                
                                <div className="form-group">
                                    
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating"
                                            defaultValue="1"
                                            className="form-control">
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                        </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                        <Control.text model=".name" id="name" name="name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            validators={{
                                                required, 
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }} 
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            className="form-control"
                                            rows={6}
                                            />
                                </div>
                        
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            </div> 
            
            );
        }
    }
        
    

    function RenderComments( {comments, addComment, campsiteId} ) {
         if (comments) {
            return (
                    <div className="col-md-5 ml-1">
                        <h4>Comments</h4>
                            {comments.map(c => {return <div key={c.id}>
                            {c.text}
                            <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                            </div>} )}
                            <CommentForm campsiteId={campsiteId} addComment={addComment} />
                    </div>)
         }
         return (<div />)
     }

    function CampsiteInfo(props) {

        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }

        if (props.campsite) {
            return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id}
                    />
                </div>
            </div>)

        } 

        return (<div/>);
    } 


export default CampsiteInfo;