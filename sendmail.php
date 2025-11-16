<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);


//От кого письмо
$mail->setFrom('user@user.ru', 'User');
//Кому отправить
$mail->addAddress('alex.prutovoy@gmail.com');
//Тема письма
$mail->Subject = "Hello!";


//Тело письма
$body = '<h1>Вам поступила заявка</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}

if (trim(!empty($_POST['number']))) {
    $body .= '<p><strong>Номер:</strong> ' . $_POST['number'] . '</p>';
}

if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>Почта:</strong> ' . $_POST['email'] . '</p>';
}

if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Сообщение:</strong> ' . $_POST['message'] . '</p>';
}

$mail->Body = $body;

//Отправка
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
