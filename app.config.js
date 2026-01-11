const appFlavours = {
  development: {
    name: "CinePlus Dev",
    bundleId: "com.cineplus.development",
    icon: "./assets/icon-dev.png",
  },
  staging: {
    name: "CinePlus Staging",
    bundleId: "com.cineplus.staging",
    icon: "./assets/icon-staging.png",
  },
  production: {
    name: "CinePlus",
    bundleId: "com.cineplus.production",
    icon: "./assets/icon.png",
  },
};

const appFlavourEnvironment = process.env.APP_ENV || "development";

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
