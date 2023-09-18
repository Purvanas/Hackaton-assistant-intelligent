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

    /*const apiKey = '4a76d20371523a0ef9d9c6e936d1cd77';
    const lat = 48.8566; // Latitude de Paris
    const lon = 2.3522; // Longitude de Paris*/
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&APPID=46eaf6e76b900a9c0619a1219e3514fa&lang=fr&units=metric`;
    
    const getMeteo = async () => {
        try {
          //console.log("url : " + apiUrl);
          const response = await fetch(apiUrl);
      
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Erreur :', error);
          throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer ici
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
      "ta un plat": "Je me nourris exclusivement de données personnelles",
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
      let discutionJson= {
        question : texte,
        reponse : `Le résultat de ${expression} est : ${resultat}`,
        date : dateActuelle,
        heure : heureActuelle
      }
      console.log(discutionJson.reponse)
      return discutionJson;
    } catch (erreur) {
      let discutionJson= {
        question : texte,
        reponse : "Erreur lors de l'évaluation de l'expression de calcul.",
        date : dateActuelle,
        heure : heureActuelle
      }
      console.log(discutionJson.reponse)
      return discutionJson;
    }
  }

  if (texte.includes("météo"||"meteo")) {

    const laMeteo = async () => {
    try {
        const meteoNow = await getMeteo();
        let discutionJson = {
        question: texte,
        reponse: "à Paris le temps est " + meteoNow.weather[0].description + " et il fait " + meteoNow.main.temp + " C°",
        date: dateActuelle,
        heure: heureActuelle
        }
        console.log(discutionJson.reponse);
        return discutionJson.reponse
        } catch (error) {
        console.error('Erreur lors de la récupération de la météo :', error);
        }
    }

    let discutionJson = {
        question: texte,
        reponse: laMeteo(),
        date: dateActuelle,
        heure: heureActuelle
        }
        console.log(discutionJson.reponse)
        return discutionJson;
}

  
    for (const mot in motsCles) {
      if (texte.includes(mot)) {
        let discutionJson= {
            question : texte,
            reponse : motsCles[mot],
            date : dateActuelle,
            heure : heureActuelle
          }
        console.log(discutionJson.reponse)
        return discutionJson;
      }
    }
    
    try{
        let rep = ("le résultat est : " + eval(texte))
        return rep
    } catch (erreur){
        let discutionJson= {
            question : texte,
            reponse : "Je ne comprends pas. Pouvez-vous reformuler votre question ?",
            date : dateActuelle,
            heure : heureActuelle
          }
        console.log(discutionJson.reponse)
        return discutionJson;
    }
  }