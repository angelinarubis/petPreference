<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Self-Deception Task</title>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jsPsych/plugins/jspsych-image-keyboard-response.js"></script>
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body  style="background-color:grey;">  
    <?php include 'include/consent.php'?>
  </body>
  <footer>
    <!-- relative path -->
    <script src="main.js"></script>  
    <!-- absolute path -->
    <!-- <script src="/Users/angelinarubis/.bitnami/stackman/machines/xampp/volumes/root/htdocs/loop_img/main.js"></script> -->
    <script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
    <script src="js/consent-load.js"></script>  
  </footer>
</html>
