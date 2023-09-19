<?php
include('bdd.php');

// Récupérer les données JSON de la requête
$jsonData = json_decode(file_get_contents("php://input"));

// Vérifier si les données JSON ont été correctement décodées
if ($jsonData === null) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'Données JSON invalides']);
    exit;
}

// Appeler la fonction sendBdd en passant les données JSON en tant que paramètres
$resultat = sendBdd($jsonData); // Supposons que sendBdd prend un argument JSON

// Éventuellement, retourner le résultat en tant que réponse JSON
header('Content-Type: application/json');
echo json_encode($resultat);
?>
