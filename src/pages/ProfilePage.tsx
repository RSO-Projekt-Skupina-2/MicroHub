import MainHeader from "../components/mainHeader";
import UserIcon from "../assets/User Profile 02.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "../styles/feed.css";



function ProfilePage() {
    
    const [username, setUsername] = useState('Cannot find username');
    const [email, setEmail] = useState('Cannot find email');
   
    const [amtLikes, setamtLikes] = useState('Cannot load your likes')
    const [amtPosts, setamtPosts] = useState('Cannot load your posts')
    

    const getLikesMessage = (likes: string): string => {
        const likesNumber = Number(likes);
        if (!isNaN(likesNumber)) {
            if (likesNumber === 0) {
                return "You have not yet liked any posts on Chatter."
            }
          return `You have ${likesNumber} likes on Chatter!`;
        }
        return 'Cannot load your likes';
      };

      const getPostsMessage = (posts: string): string => {
        const postsNumber = Number(posts);
        if (!isNaN(postsNumber)) {
            if (postsNumber === 0) {
                return "You have not yet written any posts on Chatter."
            }
          return `You have created ${postsNumber} posts on Chatter!`;
        }
        return 'Cannot load your posts';
      };
      
    return (
        <div className="page-wrapper">
            <Container fluid className="sticky-top">
                <MainHeader />
            </Container>
            <Container className="d-flex justify-content-center align-items-start py-5">
                <div className="content-box">
                    <h1 className="text-center header-text mb-4">Profile</h1>
                    <Row>
                        <Col md={4} className="text-center" style={{ paddingTop: '10px'}}>
                            <img
                                src={UserIcon}
                                alt="User Icon"
                                className="img-fluid"
                                width="50%"
                            />
                        </Col>

                        <Col md={8} className="text-start" style={{ paddingLeft: '40px', paddingTop: '10px' }}>
                            <h4>Username</h4>
                            <p>{username}</p>
                            <h4>Email</h4>
                            <p>{email}</p>
                            <h4>Your likes</h4>
                            <p>{getLikesMessage(amtLikes)}</p>
                            <h4>Your posts</h4>
                            <p>{getPostsMessage(amtPosts)}</p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    ) 
}

export default ProfilePage;