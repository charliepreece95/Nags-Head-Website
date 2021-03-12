<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "myDB";
        
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // prepare and bind
    $stmt = $conn->prepare("INSERT INTO booktable (CustomerName, CustomerNo, CustomerDetails, BookingDateTime) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $CustomerName, $CustomerNo, $CustomerDetails, $BookingDateTime);


    if(isset($_POST["_name"]) && isset($_POST["_number"]) && isset($_POST["_text"]) && isset($_POST["_date"]) && isset($_POST["_time"])) {
    $CustomerName = $conn->real_escape_string($_POST["_name"]);
    $CustomerNo = $conn->real_escape_string($_POST["_number"]);
    $CustomerDetails = $conn->real_escape_string($_POST["_text"]); 
    $BookingDateTime =  $conn->real_escape_string($_POST["_date"] . " " . $_POST["_time"]);

    echo "success";
    }

    $stmt->execute();
    $stmt->close();            
    $conn->close();

    /* Create database
    $sql = "CREATE DATABASE myDB";
    if ($conn->query($sql) === TRUE) {
        echo "Database created successfully";
    } else {
        echo "Error creating database: " . $conn->error;
    }

        $sql = "CREATE TABLE BookTable (
        CustomerId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        CustomerName VARCHAR(50) NOT NULL,
        CustomerNo VARCHAR(50) NOT NULL, 
        CustomerDetails VARCHAR(200) NOT NULL, 
        BookingDateTime VARCHAR (50) NOT NULL,
        DateOfEntry TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    if($conn->query($sql) === true) {
        echo "Table created successfully";
    } else {
        echo "Error creating table " . $conn->error;
    }
    */

?>