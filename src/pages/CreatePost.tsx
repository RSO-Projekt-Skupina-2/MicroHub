import { useState } from 'react';
import MainHeader from '../components/mainHeader';
import '../styles/CreatePost.css'
import '../styles/feed.css'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import ChooseTopics from '../components/chooseTopics';

export function CreatePost() {
  const [postContent, setPostContent] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const [resetKey, setResetKey] = useState<number>(0);


  

  return  (
    <div className="page-wrapper">
      <Container fluid className="sticky-top">
        <MainHeader />
      </Container>
      <Container className="d-flex justify-content-center align-items-start py-5">
        <div className="content-box">
          <h1 className="mb-4 header-text">Create Post</h1>

          {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert({ message: "", type: "" })}></button>
          </div>
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <ChooseTopics key={resetKey} onTopicsUpdate={function (topics: string[]): void {
          setTopics(topics);
        }} />
        <textarea
          className="form-control mb-3"
          rows={6}
          placeholder="Write your post here..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              disabled={!postContent.trim() || !postTitle.trim()}
            >
              Submit Post
            </button>
          </div>
        </div>
      </Container>
    </div>
  ) 
}

export default CreatePost;
