const uswds = require("@uswds/compile");

// Set the USWDS version
uswds.settings.version = 3;

// Path settings for distribution
uswds.paths.dist.css = "./assets/css";    // Compiled CSS files
uswds.paths.dist.theme = "./sass";        // USWDS theme files (if customizing the design system)

// Export Gulp tasks
exports.init = uswds.init;                // Task to initialize USWDS files
exports.compile = uswds.compile;          // Task to compile USWDS components
