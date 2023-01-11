export const getPosts = async () => {
  var data = await fetch(
    'https://my-json-server.typicode.com/savayer/demo/posts'
  );
  let json = await data.json();
  let posts = [];
  json.forEach((item) => {
    const { id, title, link_title, link, body } = item;
    posts.push({
      id,
      title,
      link,
      link_title,
      text: body,
    });
  });
  return posts;
};
