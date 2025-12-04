import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/feed.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreatePostIcon from "../assets/Pencil 01.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState,  } from "react";
import MainHeader from "../components/mainHeader";
import SearchComponent from "../components/searchComponent";
import FeedCard from "../components/feedCard";
import { getPosts, Post } from "../api";


const FeedPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("Welcome to the feed!");
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const searchTopic = async (topic: string) => {
    if (topic.length === 0) {
      setTitle("All posts");
      return;
    }
    try {
      
      setTitle("Topic: " + topic);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  async function loadPosts() {
    try {
      var posts = await getPosts()
      setPosts(posts)
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return(
    <div className="feed-page size_and_colors w-100">
      <Container fluid className="sticky-top">
        <MainHeader />
      </Container>
      <Container fluid className="mt-3 post-container">
        <Row>
          <Col xs={2} className="sidebar"></Col>
          <Col xs={8} className="p-4">
            <Container>
              <SearchComponent onSearch={searchTopic} />
              <h2 className="header-text">{title}</h2>
              {posts.map((post) => (
              <FeedCard
                key={post.id}
                title={post.title}
                text={post.text}
                topics={post.topics}
                postId={post.id}
                user={post.author}
              />
            ))}
            </Container>
          </Col>
          <Col xs={2} className="sidebar"></Col>
        </Row>
      </Container>
      <div className="floating-icon">
        <Button
          className="btn-custom"
          onClick={() => navigate("/newPost")}
          data-testid="create-post-btn"
        >
          <img src={CreatePostIcon} alt="Create Post" />
        </Button>
      </div>
    </div>
  ) 
};

export default FeedPage;
