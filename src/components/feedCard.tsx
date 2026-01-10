import { useState, useEffect } from "react";
import "../styles/feed.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../auth";
import { deletePost, getComments, createComment, deleteComment, Comment, getLikeStatus, likePost, unlikePost } from "../api";

interface FeedCardProps {
  title: string;
  text: string;
  topics?: string[];
  postId: number;
  user: string | number;
  authorId?: number;
  onDelete?: () => void;
}

function FeedCard({ title, text, topics = [], postId, user, authorId, onDelete }: FeedCardProps) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [commentSubmitting, setCommentSubmitting] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const { user: currentUser } = useAuth();
  const username = String(user ?? "User");
  const isOwner = currentUser && authorId && Number(currentUser.id) === Number(authorId);

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const status = await getLikeStatus(postId);
        setLikeCount(status.count);
        setLiked(currentUser ? status.liked : false);
      } catch (error) {
        console.error("Failed to fetch like data:", error);
        setError("Failed to fetch like data");
      }
    };

    fetchLikeData();
  }, [postId, currentUser]);

  useEffect(() => {
    const fetchComments = async () => {
      setCommentsLoading(true);
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setError("Failed to fetch comments");
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setDeleting(true);
      await deletePost(postId);
      onDelete?.();
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError("Failed to delete post");
      setDeleting(false);
    }
  };

  const handleAddComment = async () => {
    const trimmed = commentText.trim();
    if (!trimmed) {
      return;
    }

    if (!currentUser) {
      setError("You must be logged in to comment");
      return;
    }

    try {
      setCommentSubmitting(true);
      const newComment = await createComment({ postId, text: trimmed });
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    } catch (err: any) {
      const message = err?.response?.data?.error || err?.message || "Failed to add comment";
      console.error("Failed to add comment:", err);
      setError(message);
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      if (!confirm("Delete this comment?")) {
        return;
      }
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      setError("Failed to delete comment");
    }
  };

  const toggleComments = () => setShowComments((prev) => !prev);

  const handleLike = async () => {
    if (!currentUser) {
      setError("You must be logged in to like");
      return;
    }

    try {
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
      if (newLiked) {
        await likePost(postId);
      } else {
        await unlikePost(postId);
      }
    } catch (error) {
      console.error("Failed to update like:", error);
      setLiked(liked);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
      setError("Failed to update like");
    }
  };

  return (
    <div className="post-card">
      <Row className="post-card-header">
        <Col>
          <header className="header-text">{title}</header>
        </Col>
        <Col className="justify-content-end d-flex align-items-center">
          <img src={`https://api.dicebear.com/9.x/identicon/svg?seed=${username}`} alt="User Icon" className="img" width="50" />
          <header style={{margin: 10}}> {username}</header>
        </Col>
      </Row>
      <Row>
        <Col className="text-start">
          <p className="post-card-topic-text">
            Topics: {topics.length > 0 ? topics.join(", ") : "no topics"}
          </p>
        </Col>
      </Row>
      <Row className="post-card-text">
        <p>{text}</p>
      </Row>
      <div className="comments-section mt-2 p-2 rounded border" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fw-bold">Comments ({comments.length})</span>
          <div className="d-flex align-items-center gap-2">
            {commentsLoading && <small className="text-muted">Loading...</small>}
            <Button
              variant="light"
              size="sm"
              onClick={toggleComments}
              className="d-flex align-items-center"
            >
              {showComments ? "Hide" : "Show"} <span className="ms-1">{showComments ? "▲" : "▼"}</span>
            </Button>
          </div>
        </div>
        {showComments && (
          <>
            <div className="comments-list mt-2">
              {comments.length === 0 ? (
                <small className="text-muted">No comments yet.</small>
              ) : (
                comments.map((comment) => {
                  const canDelete = currentUser && Number(currentUser.id) === Number(comment.userId);
                  return (
                    <div key={comment.id} className="d-flex justify-content-between align-items-start mb-2 p-2 rounded" style={{ backgroundColor: "#ffffff" }}>
                      <div>
                        <div className="fw-semibold">{comment.authorName || comment.userId}</div>
                        <div>{comment.text}</div>
                      </div>
                      {canDelete && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          title="Delete comment"
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <Form className="mt-2">
              <div className="d-flex gap-2 align-items-start">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={currentUser ? "Add a comment" : "Log in to comment"}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={!currentUser || commentSubmitting}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddComment}
                  disabled={commentSubmitting || !commentText.trim() || !currentUser}
                  className="d-flex align-items-center"
                >
                  {commentSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
      <Row className="post-card-footer">
        <Col className="d-flex justify-content-start align-items-center">
          <Button
            variant={liked ? "danger" : "outline-danger"}
            className="like-button mx-2 "
            onClick={handleLike}
          >
            {liked ? "❤️" : "♡"}
          </Button>
          <span>{likeCount} Likes</span>{" "}
        </Col>
        {isOwner && (
          <Col className="d-flex justify-content-end align-items-center">
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="mx-2"
            >
              {deleting ? "✕ Deleting..." : "✕ Delete"}
            </Button>
          </Col>
        )}
      </Row>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default FeedCard;
