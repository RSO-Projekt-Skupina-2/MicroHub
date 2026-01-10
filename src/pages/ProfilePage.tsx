import MainHeader from "../components/mainHeader";
import UserIcon from "../assets/User Profile 02.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../styles/feed.css";
import { useAuth } from "../auth";
import { fetchMyProfile } from "../api";


function ProfilePage() {
    const { user, loading } = useAuth();
    const [username, setUsername] = useState('Cannot find username');
    const [email, setEmail] = useState('Cannot find email');
    const [amtLikes, setamtLikes] = useState<string>('0');
    const [amtPosts, setamtPosts] = useState<string>('0');
    const [amtComments, setamtComments] = useState<string>('0');
    const [error, setError] = useState<string | null>(null);
    const [countsLoading, setCountsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            setError("You must be logged in to view your profile");
            setCountsLoading(false);
            return;
        }

        const loadProfile = async () => {
            setCountsLoading(true);
            try {
                const profile = await fetchMyProfile();
                setUsername(profile.username);
                setEmail(profile.email);
                setamtPosts(String(profile.postsCount));
                setamtLikes(String(profile.likesGivenCount));
                setamtComments(String(profile.commentsCount));
            } catch (err) {
                console.error("Failed to load profile", err);
                setError("Failed to load profile data");
            } finally {
                setCountsLoading(false);
            }
        };

        loadProfile();
    }, [user, loading]);

    const getLikesMessage = (likes: string): string => {
        const likesNumber = Number(likes);
        if (!isNaN(likesNumber)) {
            if (likesNumber === 0) {
                return "You have not yet liked any posts.";
            }
          return `You have liked ${likesNumber} posts.`;
        }
        return 'Cannot load your likes';
      };

      const getPostsMessage = (posts: string): string => {
        const postsNumber = Number(posts);
        if (!isNaN(postsNumber)) {
            if (postsNumber === 0) {
                return "You have not yet written any posts.";
            }
          return `You have created ${postsNumber} posts.`;
        }
        return 'Cannot load your posts';
      };

      const getCommentsMessage = (comments: string): string => {
        const commentsNumber = Number(comments);
        if (!isNaN(commentsNumber)) {
            if (commentsNumber === 0) {
                return "You have not yet written any comments.";
            }
          return `You have written ${commentsNumber} comments.`;
        }
        return 'Cannot load your comments';
      };
      
    return (
        <div className="page-wrapper">
            <Container fluid className="sticky-top">
                <MainHeader />
            </Container>
            <Container className="d-flex justify-content-center align-items-start py-5">
                <div className="content-box">
                    <h1 className="text-center header-text mb-4">Profile</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                            <h4>Your likes given</h4>
                            <p>{countsLoading ? "Loading..." : getLikesMessage(amtLikes)}</p>
                            <h4>Your posts</h4>
                            <p>{countsLoading ? "Loading..." : getPostsMessage(amtPosts)}</p>
                            <h4>Your comments</h4>
                            <p>{countsLoading ? "Loading..." : getCommentsMessage(amtComments)}</p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    ) 
}

export default ProfilePage;