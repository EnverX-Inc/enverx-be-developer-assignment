function isValidUUID(uuid) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
function isValidPost(post) {
    return post.blogName && post.blogContent && post.category;
}

function isValidPostUpdate(post) {
    return post.blogName || post.blogContent || post.category;

}

module.exports ={
    isValidUUID,
    isValidPost,
    isValidPostUpdate
}