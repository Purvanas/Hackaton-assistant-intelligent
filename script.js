
// On empeche le formulaire de recherger la page pour ne pas reset le dialogue
const formSubmit = document.getElementById("formSubmit")
formSubmit.addEventListener("submit", function(event){
  event.preventDefault();
})


// Fonction pour obtenir une réponse en fonction des mots-clés

function resetChatBox() {
  document.getElementById('chat-container').innerHTML = "";
}

function chatbot(texte) {
    // met le texte en minuscules pour faciliter
    //console.log("plop");
    texte = texte.toLowerCase();

    const userTb = document.getElementById("user-input")
    userTb.value ="";

    const dateActuelle = new Date();
    const heureActuelle = dateActuelle.toLocaleTimeString();

    const dateDeNaissance = new Date('2023-09-18T10:26:00');// Date de naissance du bot et lancement du projet

    // Calcul de l'âge du bot en heures et jours
    const differenceEnMillisecondes = dateActuelle - dateDeNaissance;
    const ageEnHeures = Math.floor(differenceEnMillisecondes / (1000 * 60 * 60)); // Convertir en heures
    const ageEnJours = Math.floor(ageEnHeures / 24); // Convertir en jours

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&APPID=46eaf6e76b900a9c0619a1219e3514fa&lang=fr&units=metric`;
    
    const getMeteo = async () => {
        try {
          ////console.log("url : " + apiUrl);
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
    
    const chatBox = document.getElementById("chat-container")


    // fonction qui renvoi une div qui va acceuillir la question de l'utilisateur 
    const chatBoxUser = (question) =>{
      return(
      `<div class="message user-message">
      <img src="img/user.png" alt="Image utilisateur" class="user-avatar">
      <div class="message-content">
          <p>Vous : ${question}</p>
      </div>
      <div class="message-info">
          <time id="user-message-time"> ${heureActuelle} </time>
      </div>
    </div>`)
    }

    // fonction qui renvoi une div qui va acceuillir la réponse du bot
    const chatBoxBot = (reponse) =>{
      return(
      `<div class="message assistant-message">
        <img src="img/bot.png" alt="Image assistant" class="assistant-avatar">
        <div class="message-content">
            <p>Assistant : ${reponse} </p>
        </div>
        <div class="message-info">
            <time id="assistant-message-time"> ${heureActuelle} </time>
        </div>
      </div>`)
    }

    //insertion de la question de l'utilisateur dans la fenêtre de chat
    chatBox.insertAdjacentHTML("beforeend", chatBoxUser(texte)) 
  
    //plein de mots clés à chercher avec les réponses qui vont avec dans un dictionnaire
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
        date_heure_envoi : dateActuelle.toString(),
        date_heure_message : heureActuelle.toString()
      }
      //console.log(discutionJson.reponse)
      chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
      return discutionJson;
    } catch (erreur) {
      let discutionJson= {
        question : texte,
        reponse : "Erreur lors de l'évaluation de l'expression de calcul.",
        date_heure_envoi : dateActuelle.toString(),
        date_heure_message : heureActuelle.toString()
      }
      //console.log(discutionJson.reponse)
      chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
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
        date_heure_envoi: dateActuelle.toString(),
        date_heure_message: heureActuelle.toString()
        }
        //console.log(discutionJson.reponse);
        //insertion de la réponse du bot dans la fenêtre de chat
        chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
        return discutionJson
        } catch (error) {
        console.error('Erreur lors de la récupération de la météo :', error);
        }
    }

    let discutionJson = {
        question: texte,
        reponse: laMeteo(),
        date_heure_envoi: dateActuelle.toString(),
        date_heure_message: heureActuelle.toString()
        }
        //console.log(discutionJson.reponse)
        //insertion de la réponse du bot dans la fenêtre de chat
        chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
        return discutionJson;
}

  
    for (const mot in motsCles) {
      if (texte.includes(mot)) {
        let discutionJson= {
            question : texte,
            reponse : motsCles[mot],
            date_heure_envoi : dateActuelle.toString(),
            date_heure_message : heureActuelle.toString()
          }
        //console.log(discutionJson.reponse)
        //insertion de la réponse du bot dans la fenêtre de chat
        chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
        return discutionJson;
      }
    }
    
    try{
      //si aucun mot clés n'est trouvé on test  eval() pour essayer de voir si c'est un calcule
        let rep = ("le résultat est : " + eval(texte))
        let discutionJson= {
          question : texte,
          reponse : rep,
          date_heure_envoi : dateActuelle.toString(),
          date_heure_message : heureActuelle.toString()
        }
        chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
        return discutionJson
    } catch (erreur){
        let discutionJson= {
            question : texte,
            reponse : "Je ne comprends pas. Pouvez-vous reformuler votre question ?",
            date_heure_envoi : dateActuelle.toString(),
            date_heure_message : heureActuelle.toString()
          }
        //console.log(discutionJson.reponse)
        //insertion de la réponse du bot dans la fenêtre de chat
        chatBox.insertAdjacentHTML("beforeend", chatBoxBot(discutionJson.reponse))
        return discutionJson;
    }
  }



async function discussion(question) {
    try {
      const resultat = await chatbot(question);
      //console.log("resultat : " + JSON.stringify(resultat));
  
      const response = await fetch('appelerBdd.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultat)
      });
  
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
  
      const data = await response.json();
      // Traiter la réponse de la fonction sendBdd ici
      console.log(data);
      // Faire d'autres actions dans votre fonction chatbot
    } catch (error) {
      // Gérer les erreurs de requête fetch ici
      console.error(error);
    }
}


