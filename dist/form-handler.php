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
    'name' => 'Ваше имя',
    'phone' => 'Ваш телефон',
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
 * Form handlers
 */
$formHandler = new FormHandler();
$formHandler->addForm($causeGagerForm);

// Handle form!
$formHandler->handle($formId);