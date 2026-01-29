/**
 * Ordena posts según el criterio seleccionado
 * @param {Array} posts - Array de posts
 * @param {string} sortBy - Criterio de ordenamiento ('recent', 'likes', 'comments')
 * @param {Object} commentsCount - Objeto con el conteo de comentarios por post {postId: count}
 * @returns {Array} Posts ordenados
 */
export const sortPosts = (posts, sortBy, commentsCount = {}) => {
  if (!posts || posts.length === 0) return [];

  const sortedPosts = [...posts];

  switch (sortBy) {
    case 'likes':
      return sortedPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    
    case 'comments':
      return sortedPosts.sort((a, b) => {
        const aComments = commentsCount[a.id] || 0;
        const bComments = commentsCount[b.id] || 0;
        return bComments - aComments;
      });
    
    case 'recent':
    default:
      return sortedPosts.sort((a, b) => {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return dateB - dateA;
      });
  }
};
