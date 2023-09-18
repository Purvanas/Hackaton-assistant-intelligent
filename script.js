// Fonction pour obtenir une réponse en fonction des mots-clés
function chatbot(texte) {
    // met le texte en minuscules pour faciliter
    texte = texte.toLowerCase();

    //console.log("humain : ", texte);

    const dateActuelle = new Date();
    const heureActuelle = dateActuelle.toLocaleTimeString();

    const dateDeNaissance = new Date('2023-09-18T10:26:00');// Date de naissance du bot et lancement du projet

    // Calcul de l'âge du bot en heures et jours
    const differenceEnMillisecondes = dateActuelle - dateDeNaissance;
    const ageEnHeures = Math.floor(differenceEnMillisecondes / (1000 * 60 * 60)); // Convertir en heures
    const ageEnJours = Math.floor(ageEnHeures / 24); // Convertir en jours

    // Définir l'URL de l'API Weatherstack avec la clé d'accès et la ville (Paris) que vous souhaitez interroger
    const apiUrl = 'http://api.weatherstack.com/current?access_key=b68eba772797ad8c6546bd192bab2e2b&query=Paris&language=fr';
    //Fonction pour demander la météo a une API
    const getMeteo = async() =>{
        await fetch(apiUrl)
        .then(response => {
            // Vérifier si la réponse est OK (code 200)
            if (!response.ok) {
            throw new Error('Erreur de requête à l\'API Weatherstack');
            }
            // Convertir la réponse JSON en JavaScript
            return response.json();
        })
        .then(data => {
            // Utilisez les données de l'API ici
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
        try {
        // Évaluer l'expression de calcul et renvoyer le résultat 
        } catch (erreur) {     
        }
    
    }
  
    const motsCles = {
      "bonjour": "Bonjour ! Comment puis-je vous aider ?",
      "salut": "Bonjour ! Comment puis-je vous aider ?",
      "wesh": "Bonjour ! Comment puis-je vous aider ?",
      "merci": "De rien ! Si vous avez d'autres questions, n'hésitez pas à demander.",

      "aide": "Bien sûr, je peux vous aider. Que voulez-vous savoir ?",

      "informations": "Quelles informations recherchez-vous ?",
      "information": "Quelles informations recherchez-vous ?",
      "info": "Quelles informations recherchez-vous ?",
      "infos": "Quelles informations recherchez-vous ?",
      
      "heure": `L'heure actuelle est : ${heureActuelle}`,
      "heur": `L'heure actuelle est : ${heureActuelle}`,
      "date": `on est le : ${dateActuelle}`,

      "ton nom": "On m'appelle bot",
      "t'appelles": "On m'appelle bot",
      "t'appeles": "On m'appelle bot",
      "t'appele": "On m'appelle bot",
      "t'appel": "On m'appelle bot",
      "t'apele": "On m'appelle bot",
      "t'apel": "On m'appelle bot",


      "t'as un plat": "Je me nourris exclusivement de données personnelles",
      "ton plat": "Je me nourris exclusivement de données personnelles",
      "ton plât": "Je me nourris exclusivement de données personnelles",
      "ton plas": "Je me nourris exclusivement de données personnelles",
      "ton pla": "Je me nourris exclusivement de données personnelles",

      "âge": `Je suis né le 18/09/2023, ce qui signifie que j'ai environ ${ageEnHeures} heures ou ${ageEnJours} jours d'âge. Je suis encore très jeune !`,
      "age": `Je suis né le 18/09/2023, ce qui signifie que j'ai environ ${ageEnHeures} heures ou ${ageEnJours} jours d'âge. Je suis encore très jeune !`,
    };

// Vérifier si le texte contient le mot-clé "calcule"
  if (texte.includes("calcule")) {
    // Extraire l'expression de calcul de la chaîne (par exemple, "calcule 5 + 3")
    const expression = texte.replace("calcule", "").trim();

    try {
      // Évaluer l'expression de calcul et renvoyer le résultat
      const resultat = eval(expression);
      return `Le résultat de ${expression} est : ${resultat}`;
    } catch (erreur) {
      return "Erreur lors de l'évaluation de l'expression de calcul.";
    }
  }

  if (texte.includes("météo"||"meteo")) {

    // Effectuer une requête GET à l'API Weatherstack (api de météo)
    return getMeteo()

  }

  
    for (const mot in motsCles) {
      if (texte.includes(mot)) {
        return motsCles[mot];
      }
    }
    
    try{
        let rep = ("le résultat est : " + eval(texte))
        //console.log(rep)
        return rep
    } catch (erreur){return "Je ne comprends pas. Pouvez-vous reformuler votre question ?";}
  }
  
  
  //teste de la fonction
  //const print = "Bonjour, j'ai besoin d'aide.";
  //const reponse = chatbot(print);
  //console.log("bot : ", reponse);
  