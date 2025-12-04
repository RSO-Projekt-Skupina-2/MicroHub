import MainHeader from "../components/mainHeader";
import UserIcon from "../assets/User Profile 02.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";



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
        <>
            <MainHeader />
            <Container className="mt-5 align-items-center d-flex flex-column justify-content-center">

                <h1 className="text-center">Profile</h1>
                <Row className="mt-5" style={{ maxWidth: '700px', width: '100%', padding: '20px', backgroundColor: '#E5DCDF' }}>

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
            </Container>
        </>
    ) 
}

export default ProfilePage;