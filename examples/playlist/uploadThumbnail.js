var http = require('http');
var multiparty = require('multiparty');
var dacast = require('dacast')('YOUR_API_KEY');

http.createServer(function(req, res) {
  /*
   * Upload a splashcreen for a playlist
   */
  if (req.url === '/upload' && req.method === 'POST') {
    // Parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      dacast.playlist.thumbnail.upload({
        id: 'YOUR_PLAYLIST_ID', // Required - Set your own playlist id
        file: {
          originalFilename: files.upload[0]['originalFilename'],
          path: files.upload[0]['path'],
        } //Required 
      }, function success() {
        console.log('success');
      }, function(error) {
        console.log('error',error);
      });
    });
    return;
  };

  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );


}).listen(8080);