import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage">
      <h1 className="text-4xl font-bold mb-4">Welcome to QuizApp</h1>
      <p className="mb-6 text-lg">Sharpen your brain with fun and interactive quizzes!</p>
      
      <div className="features grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="feature-card p-4 shadow rounded bg-white">
          <h2 className="text-xl font-semibold">Topic Quizzes</h2>
          <p>Choose quizzes by categories like Science, Geography, and more.</p>
        </div>
        <div className="feature-card p-4 shadow rounded bg-white">
          <h2 className="text-xl font-semibold">Timed Challenges</h2>
          <p>Beat the clock and test how fast you can think!</p>
        </div>
        <div className="feature-card p-4 shadow rounded bg-white">
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <p>Computate with others and climb the leaderboard.</p>
        </div>
      </div>

      <Link to="/quiz" className="btn mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Start Quiz
      </Link>
    </div>
  );
}

export default Homepage;