    <?php

        function connectToDatabase() {
            $host = '127.0.0.1'; // Adresse du serveur MySQL
            $db = 'messages'; // Nom de la base de données
            $user = 'root'; // Nom d'utilisateur MySQL
            $password = ''; // Mot de passe MySQL
        
            try {
                //on tente la connection à la base de données
                $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
                return $pdo;
            } catch (PDOException $e) {
                die('Erreur de connexion à la base de données : ' . $e->getMessage());
            }
        }

function sendBdd($jsonData) {
    $pdo = connectToDatabase();

    // Supposons que votre objet JSON contient des données à insérer dans une table "ma_table"
    $sql = "INSERT INTO messages (date_heure_envoi, question, reponse, date_heure_message) VALUES (?, ?, ?, ?)";

    try {
        //on prépare la requête SQL avec les données de l'objet JSON récupéré
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1, $jsonData->date_heure_envoi);
        $stmt->bindParam(2, $jsonData->question);
        $stmt->bindParam(3, $jsonData->reponse);
        $stmt->bindParam(4, $jsonData->date_heure_message);
        //on execute la requête
        $stmt->execute();

        // Vous pouvez retourner un message de succès ou tout autre résultat souhaité
        return ['message' => 'Données insérées avec succès'];
    } catch (PDOException $e) {
        // Gérer les erreurs d'insertion dans la base de données
        return ['message' => 'Erreur lors de l\'insertion des données : ' . $e->getMessage()];
    }
}
?>