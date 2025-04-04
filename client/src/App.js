import './App.css';
import logo from './logo.svg'; // Ensure the logo.svg file exists in the src folder

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <style src='./App.css'></style>
        <h1>Welcome to SwiftAxis</h1>
        <p>
          This is just a React app page. I am not designing the page rn so yeah.
        </p>
      </header>
      <main>
        <section>
          <h2>About Me</h2>
          <p>
            I am a developer, I was focus mainly on backend. Frontend is not my thing (but i designed some page by myself).
          </p>
          <div>
            <a 
              href="https://linktr.ee/celestiacv" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                marginTop: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                textAlign: 'center'
              }}
            >
              Visit My Linktree!
            </a>
          </div>
        </section>
        {/* <section>
          <h2>Contact</h2>
          <p>Email: your-email@example.com</p>
        </section> */}
      </main>
      <footer>
        <p>&copy; 2025 Nexora (example page). All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
