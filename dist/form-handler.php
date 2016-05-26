<?php

require __DIR__ . '/vendor/autoload.php';
date_default_timezone_set('Europe/Moscow');

$post = $_POST;
$formId = isset($post['form_id']) ? $post['form_id'] : null;

use DigitalHammer\LpForms\Form;
use DigitalHammer\LpForms\Mailer;
use DigitalHammer\LpForms\FormHandler;

/**
 * Settings
 */
$siteName = 'Центр потолочных технологий';
$mailFrom = ['from@mail.com', $siteName];
$mailTo = 'to@mail.com';

/**
 * Field names
 */
$fieldNames = [
    'name'  => 'Ваше имя',
    'phone' => 'Ваш телефон',
    'comment' => 'Комментарий',
];

/**
 * Create mailer for all forms
 */
$mailer = new Mailer($mailFrom, $mailTo);

/**
 * Форма вызова замерщика
 */
$mailer->setSubject($siteName . ': Вызов замерщика');

$causeGagerForm = new Form('cause_gager', $post, $mailer);
$causeGagerForm
    ->addField('name', ['required', 'lengthMax:50'])
    ->addField('phone', ['required', 'lengthMax:50'])
    ->setFieldNames($fieldNames)
    ->setMessageBodyTemplate('./emails/cause_gager', compact('siteName'));

/**
 * Форма записи
 */
$mailer->setSubject($siteName . ': Запись с сайта');
$recordForm = new Form('record', $post, $mailer);
$recordForm
    ->addField('name', ['required', 'lengthMax:50'])
    ->addField('phone', ['required', 'lengthMax:50'])
    ->setFieldNames($fieldNames)
    ->setMessageBodyTemplate('./emails/record', compact('siteName'));

/**
 * Запись на замер в футере
 */
$mailer->setSubject($siteName . ': Запись на замер с сайта');
$recordFooterForm = new Form('record-footer', $post, $mailer);
$recordFooterForm
    ->addField('name', ['required', 'lengthMax:50'])
    ->addField('phone', ['required', 'lengthMax:50'])
    ->addField('comment', ['required', 'lengthMax:500'])
    ->setFieldNames($fieldNames)
    ->setMessageBodyTemplate('./emails/record_footer', compact('siteName'));

/**
 * Задать вопрос в футере
 */
$mailer->setSubject($siteName . ': Вопрос от пользователя с сайта');
$questionForm = new Form('question', $post, $mailer);
$questionForm
    ->addField('name', ['required', 'lengthMax:50'])
    ->addField('phone', ['required', 'lengthMax:50'])
    ->addField('comment', ['required', 'lengthMax:500'])
    ->setFieldNames($fieldNames)
    ->setMessageBodyTemplate('./emails/question', compact('siteName'));

/**
 * Обработчик для всплывающей формы
 */
$formName = isset($post['form_name']) ? $post['form_name'] : 'Всплывающая форма';
$mailer->setSubject($siteName . ': ' . $formName);
$formModal = new Form('form_modal', $post, $mailer);
$formModal
    ->addField('name', ['required', 'lengthMax:50'])
    ->addField('phone', ['required', 'lengthMax:50'])
    ->setFieldNames($fieldNames)
    ->setMessageBodyTemplate('./emails/modal', compact('siteName', 'formName'));

/**
 * Form handlers
 */
$formHandler = new FormHandler();
$formHandler->addForm($causeGagerForm);
$formHandler->addForm($recordForm);
$formHandler->addForm($recordFooterForm);
$formHandler->addForm($questionForm);
$formHandler->addForm($formModal);

// Handle form!
try {

    $formHandler->handle($formId);

} catch (Exception $exception) {

    $response = new \DigitalHammer\LpForms\ResponseJson();

    echo $response->fail($exception->getMessage());
}