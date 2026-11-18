<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

echo json_encode([
    'status' => 'ok',
    'app' => 'IPEC Santo Domingo · Soporte TI y Diseño de Software',
    'php_version' => PHP_VERSION,
    'timestamp' => date('c'),
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
