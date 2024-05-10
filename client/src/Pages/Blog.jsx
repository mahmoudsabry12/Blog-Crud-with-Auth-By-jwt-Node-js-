// import React, { useState, useEffect } from 'react';
// import moment from 'moment'; // For date formatting

// function Blog() {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     // Fetch articles from server or any other data source
//     // and update the state
//     // Example:
//     fetch('/api/articles')
//       .then(response => response.json())
//       .then(data => setArticles(data))
//       .catch(error => console.error('Error fetching articles:', error));
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="mb-4">Blog Articles</h1>
//       <a href="/articles/new" className="btn btn-success">New Article</a>

//       {articles.map(article => (
//         <div key={article.id} className="card mt-4">
//           <div className="card-body">
//             <h4 className="card-title">{article.title}</h4>
//             <div className="card-subtitle text-muted mb-2">
//               {moment(article.createdAt).format('LL')}
//             </div>
//             <div className="card-text mb-2">{article.description}</div>
//             <a href={`articles/${article.slug}`} className="btn btn-primary">Read More</a>
//             <a href={`articles/edit/${article.id}`} className="btn btn-info">Edit</a>
//             <form action={`/articles/${article.id}?_method=DELETE`} method="POST" className="d-inline">
//               <button type="submit" className="btn btn-danger">Delete</button>
//             </form>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Blog;