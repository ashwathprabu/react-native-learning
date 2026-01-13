const appFlavours = {
    development: {
        name: "CinePlus Dev",
        bundleId: "com.cineplus.development",
        icon: "./assets/development.png",
    },
    staging: {
        name: "CinePlus Staging",
        bundleId: "com.cineplus.staging",
        icon: "./assets/staging.png",
    },
    preprod: {
        name: "CinePlus Preprod",
        bundleId: "com.cineplus.preprod",
        icon: "./assets/preprod.png",
    },
    production: {
        name: "CinePlus",
        bundleId: "com.cineplus.app",
        icon: "./assets/production.png",
    },
};

const appFlavourEnvironment = process.env.APP_ENV || "development";

console.log(`[Config] Env: ${appFlavourEnvironment}, Package: ${appFlavours[appFlavourEnvironment].bundleId}`);

export default {
    expo: {
        name: appFlavours[appFlavourEnvironment].name,
        icon: appFlavours[appFlavourEnvironment].icon,
        ios: {
            bundleIdentifier: appFlavours[appFlavourEnvironment].bundleId,
        },
        android: {
            package: appFlavours[appFlavourEnvironment].bundleId,
        },
    },
};
