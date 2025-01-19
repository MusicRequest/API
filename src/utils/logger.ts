import winston from "winston";

// Créer une instance de logger avec différents niveaux de log
const logger = winston.createLogger({
  level: "info", // Niveau par défaut du logger (vous pouvez le changer en 'debug', 'warn', 'error', etc.)
  transports: [
    // Afficher les logs dans la console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorie les logs pour mieux les visualiser
        winston.format.simple(), // Format simple (message uniquement)
      ),
    }),
    // // Écrire les logs dans un fichier (facultatif)
    // new winston.transports.File({
    //     filename: 'logs/app.log',
    //     level: 'info',  // Écrire tous les logs de niveau 'info' et plus dans le fichier
    //     format: winston.format.combine(
    //         winston.format.timestamp(),  // Ajoute un timestamp aux logs
    //         winston.format.json()        // Format JSON pour les logs écrits dans le fichier
    //     )
    // })
  ],
});

export default logger;
