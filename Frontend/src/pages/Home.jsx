import React from 'react';
import '../css/home.css';

function Home() {
  return (
    <div>
      <header>
        <h1>Welcome to the Home Page</h1>
        <nav>
          <a href="/">Logout</a>
        </nav>
      </header>
      <main>
        <p>This is a simple home page after login/signup.</p>
      </main>
    </div>
  );
}

export default Home;
