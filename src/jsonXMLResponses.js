const users = {};
// For Get Requests
const sendJSON = (request, response, status, content) => {
  const messageToSend = JSON.stringify(content);
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(messageToSend);
  response.end();
};
// For Head Requests
const sendJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Not found requests
const notFound = (request, response) => {
  // create json object
  const JSONObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  // send response of type json with content of string
  return sendJSON(request, response, 404, JSONObj);
};
const notFoundMeta = (request, response) => sendJSONMeta(request, response, 404);

// Get user requests
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  return sendJSON(request, response, 200, responseJSON);
};
const getUsersMeta = (request, response) => sendJSONMeta(request, response, 200);

// Add user requests
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };
  // If either form field is empty
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return sendJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;
  // if user already exists
  if (users[body.name]) {
    responseCode = 204;
  } else {
  // If user does not exist
    users[body.name] = {};
    users[body.name].name = body.name;
  }
  // Set age
  users[body.name].age = body.age;
  // send correct response based on status code
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return sendJSON(request, response, responseCode, responseJSON);
  }

  responseJSON.message = 'Updated Successfully';
  return sendJSONMeta(request, response, responseCode);
};

module.exports = {
  notFound,
  notFoundMeta,
  getUsers,
  getUsersMeta,
  addUser,
};
