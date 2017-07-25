<?php 
require('webfile/password/mysqlps.php');
$db = new mysqli($host,$user,$dbpassword,$database);

$name=$_POST["name"];
$password=$_POST["password"];

$query = "SELECT id FROM user WHERE name = '$name' and password='$password'"; 
$result=$db->query($query); 
$numrows=$result->num_rows;
if(!$numrows)
{  
echo 重试;
header("refresh:2;url=index.html");
}
else{ 
echo 登录成功;
echo "$name";
header("refresh:2;url=index01.html");  
} 
$result->free();
$db->close();
?>