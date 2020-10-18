const fs = require('fs');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());

app.post('/body',(req, res) => {
  console.log('res',req.body.htmlBody);
   createHtml(req.body.htmlBody[0]);
   createCss(req.body.htmlBody[1],req.body.htmlBody[2]);
});

function createHtml(bodyContent){

  var head =
  `<!DOCTYPE >
  <html>
    <head>
      <meta charset="UTF-8">
      <!--Importar googleapis-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Istok+Web&display=swap" rel="stylesheet">

      <!--Importar materialize css-->
      <link rel="stylesheet" href="../resources/styles-materialize.css">

      <link type="text/css" rel="stylesheet" href="./styles.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

      <!--Navegador Sabe que está optimizado para celular-->
      <title>Centro de Ayuda Jazmín</title>
      <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon">

      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      <!-- Fuente Inria+Sans Títulos -->
      <link href="https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,500;1,700;1,900&display=swap" rel="stylesheet">

    </head>`;

 var bodyTop =
 `<body>
   <section class="section-content">
     <div class="content-container">

 `;

 var bodyBottom =
 `
 </div>
    </section>
      </body>
 `;

  var script =
  `<script>
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });

      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'left'
        });
      });

      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
      });
    </script>
  </html>
  `;

  var htmlContent = head + bodyTop + bodyContent + bodyBottom + script;

  fs.writeFile('./file-folder/index.html', htmlContent, (err) => {
    if (err) throw err;
    console.log('The file (index.html) has been saved!');
  });
}

function createCss(images,phoneContent){

  var desktop =
  `
  /* default */

  html{
    scroll-behavior: smooth;
    transition: 0.5s;
  }

  body{
    margin: 0%;
    padding: 0%;
    overflow-x: hidden;
    cursor: smooth
  }

  header{
    margin: 0%;
    padding: 0%;
  }

  /* Content-Section */

  .section-content{
    /* background: #f5f5f5; */
    height: auto;
  }

  .content-container{
    width: 100%;
  }

  /* elements */

  .title{
    text-align: center;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 35px !important;
    color: #010827;
    font-weight: 600;
    width: 100%;
    margin-top: 8%;
  }

  .header{
    font-family: 'Roboto', sans-serif;
    font-size: 25px !important;
    font-weight: 600;
    width: 100%;
    margin-top: 5%;
    text-align: center;
  }

  .paragraph{
    width: 50%;
    margin-left: 25%;
    font-family: 'Roboto', sans-serif;
    font-size: 20px !important;
    color: #010827;
    font-weight: 400;
    margin-top: 4%;
  }

  /* Images */

  .image-container{
    width: 50%;
    margin-left: 25%;
  }

  `;

  var phoneStart =
  `
  @media (max-width: 900px) {

    /* Contenido */

    .title{
      text-align: center;
      color: white;
      font-family: 'Roboto', sans-serif;
      font-size: 20px !important;
      color: #010827;
      font-weight: 600;
      width: 100%;
      margin-left: 0%;
      margin-top: 8%;
    }

    .header{
      font-family: 'Roboto', sans-serif;
      font-size: 20px !important;
      font-weight: 600;
      width: 80%;
      margin-left: 10%;
      margin-top: 5%;
      text-align: center;
    }

    .paragraph{
      width: 80%;
      margin-left: 10%;
      font-family: 'Roboto', sans-serif;
      font-size: 16px !important;
      color: #010827;
      font-weight: 400;
      margin-top: 4%;
    }

  `;

  var phoneEnd = '}';

  var styles = desktop + images + phoneStart + phoneContent + phoneEnd;

  fs.writeFile('./file-folder/styles.css', styles, (err) => {
    if (err) throw err;
    console.log('The file (styles.css) has been saved!');
  });
}

app.listen(4500, function () {
    console.log('app listening at port %s', 4500);
});
