import { Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import "../styles/createPost.css";
import Login from "../components/loginForm.tsx";
import Header from "../components/loginHeader.tsx";


function LoginPage() {  


  return (
    <div className="page-wrapper">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="content-box" style={{ maxWidth: '450px' }}>
          <Header></Header>
          <Login></Login>
        </div>
      </Container>
    </div>
  );
}
export default LoginPage;
